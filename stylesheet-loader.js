(function(doc) {
	var style = doc.createElement('style'),
		rules = doc.createTextNode('${CSS}'.replace(/\\"/g, '"'));
	
	style.type = 'text/css';
	
	if(style.styleSheet) {
		style.styleSheet.cssText = rules.nodeValue;
	}
	else {
		style.appendChild(rules);
	}
	
	doc.getElementsByTagName('head')[0].appendChild(style);
}(document));