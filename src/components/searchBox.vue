<template>
<div class="search-box">
    <div class="search-input-box">
        <span></span>
        <input type="text">
    </div>
    <a class="search-btn">搜索</a>
</div>
    
</template>
<script>
    require('../assets/less/iconfont/iconfont.css')
    export default {
        props: ['searchKey'],
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
@import '../assets/less/common/func.less';
.search-box{
    width: 100%;
    height: 82px;
    line-height: 82px;
    margin-bottom: 26px;
    .flexbox();
}
.search-input-box{
    .flexbox();
    flex:1;
    background-color: @card-white5;
    span{
        display: block;
        width: 82px;
        height: 82px;
        line-height: 82px;
        margin-left: 20px;
        color: @font-gray2;
        vertical-align: middle;
    }
    input{
        flex:1;
        line-height: 82px;
        background-color: @card-white5;
        border: none;
        vertical-align: middle;
        color: @font-gray2;
        font-size: 26px; /*px*/
    }
}
.search-btn{
    display: block;
    width: 100px;
    margin-left: 12px;
    color: @card-white5;
    background-color: @red1;
    border-radius: 6px;
}
</style>