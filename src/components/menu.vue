<template>
   <div v-if="showMenu" transition="fade" class="add-btns" id="add-btns-box" @click="hideMenu">
       <ul class="btn-list">
           <li v-for="item in btnItems"><a class="first" :class="item.icon" v-link="item.link"  v-text="item.text"></a></li>
       </ul>
   </div> 
</template>
<script>
    require('../assets/less/iconfont/iconfont.css');

    export default {
        replace:true,
        props: ['btnItems','showMenu'],
        methods:{
        	hideMenu(){
        		if (this.showMenu==true) {
        			this.showMenu=!this.showMenu
        		}
        	}
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/transition.less';
.add-btns{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 999;
	ul{
		position: absolute;
		top: 5.5*16px;
		right: 1.25*16px;
		width: 190px;
		// height: 140px;
		background-color: @blue2;
		
	}
	li{
		height: 70px;
		line-height: 70px;
		font-size: 22px; /*px*/
		text-align: center;
	}
	.first{
		border-bottom: 1px solid @blue1;
	}
	li:nth-last-child(1) a{
		border-bottom:none;
	}
	a{
		display: inline-block;
		color: @card-white5;
		vertical-align: middle;
		&:before{
			content: "";
			display: inline-block;
			width: 30px;
			height: 30px;
			background-color: @color1;
			border-radius: 50%;
			vertical-align: middle;
			margin-right: 20px;
		}
	}
}
</style>