<template>
    <div class="footer flexbox">
        <a v-for="item in footeritems" v-link="item.link">
            <span class="icon iconfont {{item.class}}" ></span>
            <p>{{item.text}}</p>
        </a>
    </div>
</template>
<script>
    require('../assets/less/iconfont/iconfont.css')
    export default {
        props: ['footeritems'],
        data (){
            return {
                
            }
        },
        ready(){
        },
        attached(){
        },
        methods:{
            
        },
        events:{
            
        },
        components:{
            
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/componentBase.less';
@import '../assets/less/common/basic.less';	
.footer{
	bottom: 0;
	height: 6.125*16px;
	background-color: @color13;
    box-shadow: 1px 1px 20px 8px rgba(162, 162, 162, 0.263);
	a{
		display: block;
		-moz-box-flex:1.0; /* Firefox */
		-webkit-box-flex:1.0; /* Safari and Chrome */
		box-flex:1.0;
	}
	span{
		&:before{
			font-size: 18px; /*px*/
		    display: inline-block;
		    width: 3.125*16px;
		    height: 3.125*16px;
		    line-height: 2.75*16px;
		    background-color: #acacac;
		    border-radius: 50%;
		    margin: 0.625*16px 0;
		}
	}
	p{
		font-size: 18px; /*px*/
	}
}
</style>