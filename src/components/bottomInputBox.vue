<template>
    <div class="bottom-input-box flexbox">
        <input type="text" v-model="commentContent" autofocus>
        <a @click="clickHandle">确定</a>
    </div>
</template>
<script>
    export default {
        props: ['commentContent'],
        data (){
            return {
                
            }
        },
        ready(){
        },
        attached(){
        },
        methods:{
            clickHandle:function() {
                this.$dispatch('commitComment')
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
	background-color: @color13;
    box-shadow: 1px 1px 20px 8px rgba(162, 162, 162, 0.263);/*no*/
	a{
		display: block;
		width: 100px;
        margin: 8px 8px 8px 0;
        line-height: 5*16px;
	}
    input{
        display: block;
        -moz-box-flex:1.0; /* Firefox */
        -webkit-box-flex:1.0; /* Safari and Chrome */
        box-flex:1.0;
        margin: 8px;
        line-height: 5*16px;
    }
}
</style>