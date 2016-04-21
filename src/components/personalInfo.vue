<template>
<div class="personal-info show" id="personal-info">
    <div class="base-info">
        <h4>基本资料</h4>
        <p class="gender" ><span class="t-gender">性别：</span><span class="c-gender">{{infoData.gender}}</span></p>
        <p class="college" ><span class="t-college">学院：</span><span class="c-college">{{infoData.department}}</span></p>
        <p class="grade" ><span class="t-grade">年级：</span><span class="c-grade">{{infoData.grade}}</span></p>
        <p class="region"><span class="t-region">地区：</span><span class="c-region">{{infoData.place}}</span></p>
    </div>
    
    <div class="btns" id="me-btns">
        <a class="icon iconfont button" id="me-edit-btn" @click="switchToEditMode"></a>
    </div>
</div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        props:['infoData','editMode'],
        data (){
            return {
                
            }
        },
        ready(){
        },
        attached(){
        },
        route:{
            data (transition){
            },
            deactivate (transition){
                transition.next();
            }  
        },
        methods:{
            switchToEditMode:function() {
                this.editMode = true
                
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
.personal-info{
    padding: 50px 50px;
    background-color: @card-white5;
    border-radius: 10px;
    h4{
        color: @font-gray1;
        font-size: 32px;/*px*/
        font-weight: bold;
        line-height: 2;
    }
    p{
        color: @font-gray2;
        font-size: 24px;/*px*/
        line-height: 1.8;
    }
    input{
        font-size: 24px;/*px*/
        border-radius: 2px;
        border: 1px solid @font-gray3;/*no*/
    }
    .inactive{
        color: @background-gray4;
    }
    span[class^="c-"],p[class^="c-"]{
        outline: none;
    }
    .state-info,.edit-name-info{
        margin-top: 24px;
        margin-bottom: 36px;
    }
    .btns{
        position: relative;
        height: 64px;
    }
    .button{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-color: @blue1;
        border:none;
        position: absolute;
        right: 18px;
        text-align: center;
        color: @card-white5;
    }
}

</style>