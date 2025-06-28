window.onload = function() {
	setEditorFocus();
}

function formatDoc(command, value = null) {
	setEditorFocus();
    if (value) {
        document.execCommand(command, false, value);
    } else {
        document.execCommand(command, false, null);
    }
}

function insertTag(tag_name, class_name) {
	setEditorFocus();
	if (tag_name.length == 0) return;
	let tag = document.createElement(tag_name);
	let selection = window.getSelection();
	if (selection.toString().length == 0) return;
	tag.innerText = selection.toString();
	if (class_name) {
		tag.className = class_name;
	}
	insertHTMLCode(selection,tag.outerHTML);
}

function insertImage() {
	setEditorFocus();
	let url = prompt("Enter image URL");
	let width = prompt("Enter width in px, %, auto");
	let height = prompt("Enter height in px, %, auto");
	if (!url || Number.isNaN(width) || Number.isNaN(height)) return;
	let html = "<img src='" + url + "' style='width:" + width + ";height:" + height + ";'>";
	insertHTMLCode(window.getSelection(), html);
}

function insertHTML() {
	setEditorFocus();
	let html = prompt("Paste HTML");
	if (!html) return;
	insertHTMLCode(window.getSelection(), html)
}

function insertMedia(media_type) {
	setEditorFocus();
	let url = prompt("Enter full file name");
	let width = prompt("Enter width in pixels");
	let height = prompt("Enter height in pixels");
	if (!url || Number.isNaN(width) || Number.isNaN(height)) return;
	let html = "<video width='" + width + "' height='" + height +  "' controls><source src='" + url + "' type='" + media_type + "'></video>";
	insertHTMLCode(window.getSelection(), html)
}

function insertLink(link_type) {
	setEditorFocus();
	let url = prompt("Enter Link");
	if (!url) return;
	let tag = document.createElement("a");
	let selection = window.getSelection();
	let selected_text = selection.toString();
	let html = "";
	if (selected_text.length > 0) {
		html = "<a href='" + link_type + url + "'>" + selected_text + "</a>";
	} else {
		html = "<a href='" + link_type + url + "'>" + url + "</a>";
	}
	insertHTMLCode(selection, html);
}

function insertHeadingIndex() {
	let heading_index = "";
	let anchor_number = 1;
	let all_elements = document.querySelectorAll("*");
	for (let i = 0; i < all_elements.length; i++) {
		element_name = all_elements[i].localName;
		if (element_name == "h1" || element_name == "h2" || element_name == "h3" || element_name == "h4" || element_name == "h5" || element_name == "h6") {
			heading_index += "<li class='level-" + element_name + "'><a href='#anchor-" + anchor_number + "'>" + all_elements[i].innerHTML + "</a></li>\n";
			all_elements[i].innerHTML = "<a name='anchor-" + anchor_number + "'></a>" + all_elements[i].innerHTML;
			anchor_number++;
		}
	}
	heading_index = "<ul id='heading-index'>\n" + heading_index + "</ul>\n";
	insertHTMLCode(window.getSelection(), heading_index);
}


// insert table
let saved_range;
function saveSelectionRange() {
	let selection = window.getSelection();
	if (selection.rangeCount) saved_range = selection.getRangeAt(0);
}

function insertTable() {
	setEditorFocus();
	let rows = document.getElementById('editor-table-rows').value;
	let columns = document.getElementById('editor-table-columns').value;
	let padding = document.getElementById('editor-table-padding').value;
	let spacing = document.getElementById('editor-table-spacing').value;
	let border = document.getElementById('editor-table-border').value;
	let width = document.getElementById('editor-table-width').value;
	let width_type = document.getElementById('editor-table-width-type').value;

	let html = "<table border='" + border + "' cellspacing='" + spacing + "' cellpadding='" + padding + "' style='width:" + width + width_type + "'>";
	for (let i = 0; i < rows; i++) {
		html = html + "<tr>";
		for (let k = 0; k < columns; k++) {
			html = html + "<td>&nbsp;</td>";
		}
		html = html + "<tr>";
	}
	html = html + "</table>";
	
	let selection = window.getSelection();
	let fragment = document.createRange().createContextualFragment(html);
	saved_range.deleteContents();
	saved_range.insertNode(fragment);
	saved_range.collapse(false);
    selection.removeAllRanges()
	selection.addRange(saved_range);
	
	let target_element = saved_range.startContainer;
	target_element.scrollIntoView({behavior:'instant', block:'nearest'});
	
	document.getElementById('editor-table-form').reset();	
}


function changeDirection(dir) {
	setEditorFocus();
	let selection = window.getSelection();
	if (selection.rangeCount) selection.anchorNode.parentNode.setAttribute("dir",dir);
}


function setEditorFocus() {
	document.getElementById("editor").focus();
}

function insertHTMLCode(selection, html) {
	if (selection.rangeCount) {
		let range = selection.getRangeAt(0);
		let fragment = document.createRange().createContextualFragment(html);
		range.deleteContents();
		range.insertNode(fragment);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}
