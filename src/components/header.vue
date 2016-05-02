<template>
    <div class="header">
        <h1>{{headerName}}</h1>
        <a v-if="rightBtnType" class="icon iconfont right-btn" :class="{'icon-ui2-icon-add':rightBtnType=='showAddMenu','icon-14':rightBtnType=='submit'}" @click="rightBtnCallback"></a>
        <a v-if="leftBtnType" class="icon iconfont left-btn" :class="{'icon-newlisticon06':leftBtnType=='back'}" @click="leftBtnCallback"></a>
    </div>
    <nv-menu :show-menu.sync="showMenu" :btn-items="btnItems"></nv-menu>
</template>

<script>
	require('../assets/less/iconfont/iconfont.css')
    export default {
        replace:true,
        props: ['headerName','rightBtnType','leftBtnType','btnItems'],
        data (){
            return {
                showMenu:false
            }
        },
        methods: {
            rightBtnCallback(){
            	switch(this.rightBtnType){
            	    case 'showAddMenu':
            	        this.showMenu=!this.showMenu
            	        break
            	    case 'submit':
                        this.$dispatch('headerRightBtnClick')
                        break  
                    case 'setting':
                        this.$dispatch('headerRightBtnClick')
                        break
            	}
            	
            },
            leftBtnCallback(){
                this.$dispatch('headerLeftBtnClick')
            }
            
        },
        components:{
            'nvMenu':require('./menu.vue')
        }
    }
</script>
<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/basic.less';
.header{
	top: 0;
	background-color: @blue1;
	color: @color1;
	h1{
		font-size: 28px; /*px*/
	}
	a{
		position: absolute;
		display: inline-block;
		width: 88px;
		height: 88px;
		line-height: 88px;
		text-align: center;
		font-size: 32px; /*px*/
		top: 0;
		color: @color1;
	}
	.right-btn{
		right: 0;
        z-index: 9;
	}
	.left-btn{
		left: 0;
        z-index: 9;
	}
}
</style>