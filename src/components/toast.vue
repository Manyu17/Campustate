<template>
	<div class="toast-box">
		<div class="toast-mask"></div>
		<div class="toast">
		    <p class="icon iconfont" :class="toastInfo.icon"></p>
		    <p class="text">{{toastInfo.text}}</p>
		</div>
	</div>
</template>
<script>
    require('../assets/less/iconfont/iconfont.css');

    export default {
        replace:true,
        props: ['toastInfo'],
        methods:{
        	
        }
    }
</script>

<style lang="less" scope>
@import '../assets/less/common/func.less';
.toast-mask{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.toast{
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%,-50%);
	background-color: rgba(0,0,0,0.6);
	color: @card-white5;
	border-radius: 10px;
	padding: 20px;
}
.icon{
	font-size: 48px;/*px*/
	height: 72px;
	line-height: 72px;
	text-align: center;
}
.text{
	height: 64px;
	line-height: 64px;
	font-size: 28px;/*px*/
	padding: 0 32px;

}
</style>