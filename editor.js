document.execCommand('defaultParagraphSeparator', true, 'p');

function setTag(tag_name, class_name) {
	selection = (document.all) ? document.selection.createRange().text : document.getSelection();
	selected_text = selection.toString();
	var element = document.createElement(tag_name);
	element.innerText = selected_text;
	if (class_name != "") {element.className = class_name;}
	var range = selection.getRangeAt(0);
	range.deleteContents();
	range.insertNode(element);
	copyDivToTextarea();
}
function setListTag(list_type) {
	var selection = (document.all) ? document.selection.createRange().text : document.getSelection();
	var selected_text = selection.toString();
	var element_ol = document.createElement(list_type);
	var element_li = document.createElement("li");
	element_li.innerText = selected_text;
	element_ol.appendChild(element_li);
	var range = selection.getRangeAt(0);
	range.deleteContents();
	range.insertNode(element_ol);
	copyDivToTextarea();
}
function removeFormatting() {
	var selection = (document.all) ? document.selection.createRange().text : document.getSelection();
	var selected_text = selection.toString();
	if (selected_text == "") {alert("Please make selection of the desired text.");}
	selected_text = selected_text.replace(/<\/?[^>]+(>|$)/g, "");
	var text_node = document.createTextNode(selected_text);
	var range = selection.getRangeAt(0);
	range.deleteContents();
	range.insertNode(text_node);
	copyDivToTextarea();
}
function addLineBreaks() {
	var element = document.getElementById('html_content');
	element.value = element.value.replace(/(<\/?.*?>)/g, '$1\n');	
}
function copyDivToTextarea() {
	var editor_content = document.getElementById('editor_div').innerHTML;
	editor_content = editor_content.replace(/<[^\/>][^>]*><\/[^>]+>/g,"");
	document.getElementById("html_content").value = editor_content;

}
function copyTextareaToDiv() {
	var html_content = document.getElementById("html_content").value;
	html_content = html_content.replace(/<[^\/>][^>]*><\/[^>]+>/g,"");
	document.getElementById('editor_div').innerHTML = html_content;
}
function showHTML() {
	document.getElementById("html_content").classList.toggle('hide');
	copyDivToTextarea();
}

// buttons
document.write("<input type='button' value='<HTML>' onclick='showHTML();'> ");
document.write("&nbsp; ");
document.write("<input type='button' value='Remove Formatting' onclick='removeFormatting();'> ");
document.write("<input type='button' value='Line Breaks' onclick='addLineBreaks();'> ");
document.write("&nbsp; ");
document.write("<input type='button' value='<H1>' onclick=\"setTag('h1', '');\"> ");
document.write("<input type='button' value='<H2>' onclick=\"setTag('h2', '');\"> ");
document.write("<input type='button' value='<H3>' onclick=\"setTag('h3', '');\"> "); 
document.write("<input type='button' value='<H4>' onclick=\"setTag('h4', '');\"> ");
document.write("&nbsp; ");
document.write("<input type='button' value='<B>' onclick=\"setTag('span', 'bold');\"> ");
document.write("<input type='button' value='<I>' onclick=\"setTag('span', 'italic');\"> "); 
document.write("<input type='button' value='<U>' onclick=\"setTag('span', 'underline');\"> "); 
document.write("&nbsp; ");
document.write("<input type='button' value='o' title='Bullet List' onclick=\"setListTag('ul');\"> "); 
document.write("<input type='button' value='1' title='Number List' onclick=\"setListTag('ol');\"> "); 
document.write("&nbsp; ");
document.write("<input type='button' value='Quote' title='Quote' onclick=\"setTag('blockquote', '');\"> ");
document.write("<input type='button' value='Para' title='Paragraph' onclick=\"setTag('p', '');\"> ");
document.write("<input type='button' value='J' title='Justify' onclick=\"setTag('div', 'justify');\"> ");
document.write("<input type='button' value='L' title='Left' onclick=\"setTag('div', 'left');\"> ");
document.write("<input type='button' value='C' title='Center' onclick=\"setTag('div', 'center');\"> ");
document.write("<input type='button' value='R' title='Right' onclick=\"setTag('div', 'right');\"> ");
document.write("&nbsp; ");
document.write("<input type='button' value='RTL Block' onclick=\"setTag('p', 'rtl');\"> ");
document.write("<input type='button' value='RTL Inline' onclick=\"setTag('span', 'rtl');\"> ");
document.write("&nbsp; ");
document.write("<input type='button' value='LTR Block' onclick=\"setTag('P', 'ltr');\"> ");
document.write("<input type='button' value='LTR Inline' onclick=\"setTag('SPAN', 'ltr');\"> ");
// editor div
document.write("<div id='editor_div' contenteditable='true' onkeyup='copyDivToTextarea()'><p>&nbsp;</p></div>");
document.write("<div id='selection_note'><b>Note:</b> Selection is required before applying any HTML. Triple-click to select the whole paragraph.</div>");
