<template>
    <div class="footer" :class="{'main-footer':ifMainFooter}">
        <a v-for="item in footeritems" v-link="item.link" :class="{'bgc-red':item.text=='立即报名','zaned':item.text=='点赞'&&zaned,'current-page':item.current}" @click="clickHandler(item.text)">
            <span v-if="ifMainFooter" class="active-bg"></span>
            <span class="icon iconfont {{item.class}}" ></span>
            <p>{{item.text}}</p>
        </a>
    </div>
</template>
<script>
    require('../assets/less/iconfont/iconfont.css')
    export default {
        props: ['footeritems','ifMainFooter','zaned'],
        data (){
            return {
                
            }
        },
        ready(){
        },
        attached(){
        },
        methods:{
            clickHandler:function(text) {
                switch(text){
                    case '评论':
                        this.$dispatch('showCommentBox')
                        break
                    case '点赞':
                        if(this.zaned){
                            this.$dispatch('cancelZan')
                        }else{
                            this.$dispatch('addZan')
                        }
                        this.zaned = !this.zaned
                        break
                }
            }
        },
        events:{
            
        },
        components:{
            
        }
    }
</script>

<style lang="less">
@import '../assets/less/common/func.less';
@import '../assets/less/common/basic.less';
.main-footer{
    .current-page{
        .active-bg{
            display: block;
        }
        span.icon:before{
            color: @blue1;
            font-size: 52px;
            transform: translateY(-12px);
        }
    }
}	
.footer{
    .flexbox();
	bottom: 0;
	height: 6.125*16px;
	background-color: @card-white5;
    box-shadow: 1px 1px 20px 8px rgba(162, 162, 162, 0.263);
	a{
		display: block;
        position: relative;
		flex:1.0;
	}
    .active-bg{
        display: none;
        position: absolute;
        top: -32px;
        left: 54px;
        width: 108px;
        height: 32px;
        overflow: hidden;
        &:before{
            content: '';
            display: block;
            width: 108px;
            height: 108px;
            border-radius: 50%;
            background-color: @card-white5;
            box-shadow: 1px 1px 20px 8px rgba(162, 162, 162, 0.263);
        }
        
    }
	span{
		&:before{
            color: @font-gray1;
			font-size: 40px; 
		    display: inline-block;
		    line-height: 2.75*16px;
		    margin: 0.625*16px 0;
            background-color: transparent;
		}
	}
	p{
        color: @font-gray1;
		font-size: 20px; /*px*/
	}
    .bgc-red{
        background-color: @red1;
        p,span:before{
            color: @card-white5;
        } 
    }
    .zaned{
        .icon:before{
            color: @red1;
        }
        p{
            color: @red1;
        }
    }
}
</style>