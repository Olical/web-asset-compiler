(function() {
	var style = document.createElement('style'),
		rules = document.createTextNode(unescape('${CSS}'));
	
	style.type = 'text/css';
	
	if(style.styleSheet) {
		style.styleSheet.cssText = rules.nodeValue;
	}
	else {
		style.appendChild(rules);
	}
	
	document.getElementsByTagName('head')[0].appendChild(style);
}());