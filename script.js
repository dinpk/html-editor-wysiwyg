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
	if (selection.rangeCount) {
		let range = selection.getRangeAt(0);
		range.deleteContents();
		range.insertNode(tag);
		range.selectNodeContents(tag);
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

function insertMedia(media_type) {
	
	setEditorFocus();
	
	let url = prompt("Enter full file name");
	let width = prompt("Enter width in pixels");
	let height = prompt("Enter height in pixels");
	
	if (!url || !width || !height) return;
	
	let selection = window.getSelection();
	
	if (selection.rangeCount) {
		let html = "<video width='" + width + "' height='" + height +  "' controls><source src='" + url + "' type='" + media_type + "'></video>";
		let range = selection.getRangeAt(0);
		let fragment = document.createRange().createContextualFragment(html);
		range.deleteContents();
		range.insertNode(fragment);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);		
	}

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

function insertTable() {
	
	setEditorFocus();
	
	let rows = prompt("Enter number of rows");
	let columns = prompt("Enter number of columns");
	
	if (!rows || !columns) return;
	
	let selection = window.getSelection();
	if (selection.rangeCount) {
		
		let html = "<table border='1' cellspacing='0' cellpadding='3' style='min-width:50%'>";
		for (let i = 0; i < rows; i++) {
			html = html + "<tr>";
			for (let k = 0; k < columns; k++) {
				html = html + "<td>&nbsp;</td>";
			}
			html = html + "<tr>";
		}
		
		html = html + "</table>";

		let range = selection.getRangeAt(0);
		let fragment = document.createRange().createContextualFragment(html);
		range.deleteContents();
		range.insertNode(fragment);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);		
	}
	
}

function changeDirection(dir) {
	
	setEditorFocus();
	
	let selection = window.getSelection();
	if (selection.rangeCount) selection.anchorNode.parentNode.setAttribute("dir",dir);
}


function setEditorFocus() {
	document.getElementById("editor").focus();
}
