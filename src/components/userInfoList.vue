<template>
<ul class="person-info-list">
    <li class="person-info-item">
        <img src="" alt="" class="head-pic">
        <p class="username">软院青协</p>
        <p class="college">认证学生机构</p>
        <a href="" class="follow-state"></a>
    </li>
</ul>
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
.person-info-list{
    width: 600px;
    margin: 0 auto;
    background-color: @card-white5;
}
.person-info-item{
    width: 560px;   
    height: 104px;
    padding: 24px 20px;
    position: relative;
    img{
        width: 100px;
        height: 100px;
        float: left;
        margin-right: 32px;
    }
    p{
        color: @font-gray1;
        height: 52px;
        line-height: 52px;
    }
    .username{
        font-size: 30px; /*px*/
    }
    .college{
        font-size: 24px; /*px*/
    }
    .follow-state{
        position: absolute;
        display: inline-block;
        width: 62px;
        height: 62px;
        line-height: 62px;
        top: 3*16px;
        right: 24px;
    }
}
</style>