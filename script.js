function formatDoc(command, value = null) {
    if (value) {
        document.execCommand(command, false, value);
    } else {
        document.execCommand(command, false, null);
    }
}


function insertTag(tag_name, class_name) {
	const tag = document.createElement(tag_name);
	const selection = window.getSelection();
	tag.innerText = selection.toString();
	if (class_name) {
		tag.className = class_name;
	}
	if (selection.rangeCount) {
		const range = selection.getRangeAt(0);
		range.deleteContents();
		range.insertNode(tag);
		range.selectNodeContents(tag); // Optional: Select the inserted span
		selection.removeAllRanges();
		selection.addRange(range);
	}
}


// execCommand API for more commands