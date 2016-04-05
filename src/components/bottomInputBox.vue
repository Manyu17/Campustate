<template>
    <div class="bottom-input-box">
        <input type="text" v-model="commentContent" autofocus @keyup="keyupHandler" placeholder="评论">
        <a @click="clickHandle" :class={'active':btnActive,'inactive':!btnActive}>确定</a>
    </div>
</template>
<script>
    export default {
        props: ['commentContent'],
        data (){
            return {
                btnActive:false
            }
        },
        ready(){
        },
        attached(){
        },
        methods:{
            clickHandle:function() {
                if(this.btnActive){
                    this.$dispatch('commitComment')
                    this.btnActive = false
                }
            },
            keyupHandler:function() {
                if (this.commentContent) {
                    if(!this.btnActive){
                        this.btnActive = !this.btnActive
                    }
                }else{
                    this.btnActive = false
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
.bottom-input-box{
    position: absolute;
    left: 0;
    right: 0;
	bottom: 0;
	background-color: @card-white5;
    .flexbox();
    box-shadow: 1px 1px 20px 8px rgba(162, 162, 162, 0.263);/*no*/
	a{
		display: block;
		width: 100px;
        margin: 12px 12px 12px 0;
        line-height: 74px;
        border-radius: 8px;
        font-size: 28px;/*px*/
        color: @card-white5;
        background-color: @red1;
	}
    .active{
        color: @card-white5;
        background-color: @red1;
    }
    .inactive{
        color: @font-gray2;
        border: 1px solid @font-gray2;/*no*/
        background-color: transparent;
    }
    input{
        display: block;
        flex:1;
        margin: 12px;
        line-height: 74px;
        font-size: 28px;/*px*/
        color: @font-gray1;
        border: 1px solid @font-gray2;/*no*/
        border-radius: 8px;
        padding: 0 12px;
    }
}
</style>