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
@import '../assets/less/common/componentBase.less';
.bottom-input-box{
    position: absolute;
    left: 0;
    right: 0;
	bottom: 0;
	background-color: @color13;
    box-shadow: 1px 1px 20px 8px rgba(162, 162, 162, 0.263);
	a{
		display: block;
		width: 100/16rem;
        margin: 8/16rem 8/16rem 8/16rem 0;
        line-height: 5rem;
	}
    input{
        display: block;
        -moz-box-flex:1.0; /* Firefox */
        -webkit-box-flex:1.0; /* Safari and Chrome */
        box-flex:1.0;
        margin: 8/16rem;
        line-height: 5rem;
    }
}
</style>