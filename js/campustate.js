// var metaEl = doc.createElement('meta');
// var scale = isRetina ? 0.5:1;
// metaEl.setAttribute('name', 'viewport');
// metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
// if (docEl.firstElementChild) {
//     document.documentElement.firstElementChild.appendChild(metaEl);
// } else {
//     var wrap = doc.createElement('div');
//     wrap.appendChild(metaEl);
//     documen.write(wrap.innerHTML);
// }

$(document).click(function (event) {
	if (event.target.id == "add-btns") {
		$("#add-btns-box").fadeIn();
	}
	else if($("#add-btns-box:visible").length != 0){
		$("#add-btns-box").fadeOut();
	}
});


