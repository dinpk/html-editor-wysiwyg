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


function insertHTML() {
	setEditorFocus();
	let html = prompt("Paste HTML");
	if (!html) return;
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
			heading_index = heading_index + "<li class='level-" + element_name + "'><a href='#anchor-" + anchor_number + "'>" + all_elements[i].innerHTML + "</a></li>\n";
			all_elements[i].innerHTML = "<a name='anchor-" + anchor_number + "'></a>" + all_elements[i].innerHTML;
			anchor_number++;
		}
	}
	heading_index = "<ul class='heading-index'>\n" + heading_index + "</ul>\n";
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
	let rows = document.getElementById("dialog-table-rows").value;
	let columns = document.getElementById("dialog-table-columns").value;
	let padding = document.getElementById("dialog-table-padding").value;
	let spacing = document.getElementById("dialog-table-spacing").value;
	let border = document.getElementById("dialog-table-border").value;
	let width = document.getElementById("dialog-table-width").value;
	let width_type = document.getElementById("dialog-table-width-type").value;

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
	target_element.scrollIntoView({behavior:"instant", block:"nearest"});
	
	document.getElementById("dialog-table-form").reset();	
}


function insertImage() {
	setEditorFocus();
	let url = document.getElementById("dialog-image-url").value;
	let width = document.getElementById("dialog-image-url-width").value;
	let height = document.getElementById("dialog-image-url-height").value;
	let size_type = document.getElementById("dialog-image-size-type").value;
	let halign = document.getElementById("dialog-image-url-halign").value;
	let valign = document.getElementById("dialog-image-url-valign").value;
	let spacing = document.getElementById("dialog-image-spacing").value;
	
	if (!url || Number.isNaN(width) || Number.isNaN(height)) return;
	let html = "<img src='" + url + "' style='vertical-align:" + valign + ";margin:" + spacing + "px;width:" + width + size_type + ";height:" + height + size_type + "'>";
	if (halign != "center") {
		html = "<span style='float:" + halign + "'>" + html + "</span>";
	}
	let selection = window.getSelection();
	let fragment = document.createRange().createContextualFragment(html);
	saved_range.deleteContents();
	saved_range.insertNode(fragment);
	saved_range.collapse(false);
    selection.removeAllRanges()
	selection.addRange(saved_range);
	
	let target_element = saved_range.startContainer;
	target_element.scrollIntoView({behavior:"instant", block:"nearest"});
	
	document.getElementById("dialog-image-url-form").reset();	
}


function insertMedia() {
	setEditorFocus();
	let url = document.getElementById("dialog-media-url").value;
	let width = document.getElementById("dialog-media-url-width").value;
	let height = document.getElementById("dialog-media-url-height").value;
	let media_type = document.getElementById("dialog-media-type").value;
	let size_type = document.getElementById("dialog-media-size-type").value;
	
	if (!url || Number.isNaN(width) || Number.isNaN(height)) return;
	let html = "<video width='" + width + size_type + "' height='" + height + size_type + "' controls><source src='" + url + "' type='" + media_type + "'></video>";	

	let selection = window.getSelection();
	let fragment = document.createRange().createContextualFragment(html);
	saved_range.deleteContents();
	saved_range.insertNode(fragment);
	saved_range.collapse(false);
    selection.removeAllRanges()
	selection.addRange(saved_range);
	
	let target_element = saved_range.startContainer;
	target_element.scrollIntoView({behavior:"instant", block:"nearest"});
	
	document.getElementById("dialog-media-url-form").reset();	
}


function changeDirection(dir) {
	setEditorFocus();
	let selection = window.getSelection();
	if (selection.rangeCount) selection.anchorNode.parentNode.setAttribute("dir",dir);
}


function removeBlockFormatting() {
	setEditorFocus();
	let selection = window.getSelection();
	if (selection.rangeCount) {
		console.log(selection.anchorNode.tagName);
		if (selection.anchorNode.parentNode.tagName != "DIV") {
			selection.anchorNode.parentNode.outerHTML = selection.anchorNode.parentNode.innerText;
		}
	}
}

function setEditorFocus() {
	document.getElementById("basic-editor").focus();
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


// after all page elements loaded

window.onload = function() {
	
	// sanitize pasted html
	let basic_editor = document.getElementById("basic-editor");
	basic_editor.addEventListener("paste", function(event) {
		event.preventDefault(); // prevent default paste
		let clipboard_data = event.clipboardData || window.clipboardData;
		let pasted_html = clipboard_data.getData("text/html");
		let pasted_text = clipboard_data.getData("text/plain");

		let content_to_insert;
		if (pasted_html) {
			content_to_insert = DOMPurify.sanitize(pasted_html, { // sanitize html before paste
				USE_PROFILES: { html: true },
				FORBID_TAGS: ["script", "iframe", "style", "link", "object", "embed"],
				FORBID_ATTR: ["on*"], 
				ALLOW_DATA_ATTR: false,
			});
		} else { // paste text if no html
			content_to_insert = pasted_text;
		}

		document.execCommand("insertHTML", false, content_to_insert);
	});

	// load related html code
	fetch("related_html_code.html")
		.then(function(response) {
			return response.text();
		})
		.then(function(data) {
			document.getElementById("related_html_code").innerHTML = data;
		});


	setEditorFocus();

}

