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
var urlpre = "http://121.42.170.227/index.php/Home/"
var imgUrlPre = "http://7xpks6.com1.z0.glb.clouddn.com/"
$(document).on('touchstart',function (event) {
	if (event.target.id == "add-btns") {
		$("#add-btns-box").fadeIn()
	}
	else if($("#add-btns-box:visible").length != 0){
		$("#add-btns-box").fadeOut()
	}
})
function getUseridAndToken () {
    var localData = {}
    if (window.localStorage.getItem('user_id')&&window.localStorage.getItem('token')) {
    	localData.user_id = window.localStorage.getItem('user_id')
    	localData.token = window.localStorage.getItem('token')
    }
    return localData
}

