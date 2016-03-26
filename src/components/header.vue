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
        props: ['headerName','rightBtnType','leftBtnType'],
        data (){
            return {
                showMenu:false,
                btnItems:[
                	{
                		icon:'',
                		text:'发布喧喧',
                		link:'addNewXuanxuan'
                	},
                	{
                		icon:'',
                		text:'发布活动',
                		link:'addNewActivity'
                	}
                ]
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
@import '../assets/less/common/componentBase.less';
@import '../assets/less/common/basic.less';
.header{
	top: 0;
	background-color: @color12;
	color: @color1;
	h1{
		font-size: 18px;
	}
	span{
		position: absolute;
		font-size: 24px;
		display: inline-block;
		width: 5.5rem;
		height: 5.5rem;
		line-height: 5.5rem;
		text-align: center;
		top: 0;
		right: 0;
	}
	a{
		position: absolute;
		display: inline-block;
		width: 5.5rem;
		height: 5.5rem;
		line-height: 5.5rem;
		text-align: center;
		font-size: 18px;
		top: 0;
		color: @color1;
	}
	.right-btn{
		right: 0;
	}
	.left-btn{
		left: 0;
	}
}
</style>