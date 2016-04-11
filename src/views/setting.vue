<style lang="less">
@import '../assets/less/common/func.less';
.setting-container{
        position: absolute;
        left: 0;
        right: 0;
        top: 86px;
        overflow-y: auto;
        background-color: @card-white5;
        .setting-items{
            li{
                font-size: 24px;
                width: 100%;
                background-color: @card-white5;
                height: 100px;
                line-height: 100px;
                border-top: 1px solid @font-gray3; /*no*/
                div{
                    padding: 0 40px;
                    i{
                        float: right;
                        transition: all 0.3s;
                        -moz-transition: all 0.3s;
                        -webkit-transition: all 0.3s;
                        -o-transition: all 0.3s;
                        
                        transform: rotate(0deg);
                        -ms-transform: rotate(0deg);
                        -webkit-transform: rotate(0deg);
                        -o-transform: rotate(0deg);
                        -moz-transform: rotate(0deg);
                    }
                    i.iconopen{
                        transform: rotate(180deg);
                        -ms-transform: rotate(180deg);
                        -webkit-transform: rotate(180deg);
                        -o-transform: rotate(180deg);
                    }
                }
            }
            li:nth-last-child(1){
                border-bottom: 1px solid @color5; /*no*/
            }
            .submenu{
                display: none;
                width: 100%;
                li{
                    box-sizing: border-box;
                    padding-left: 80px;
                    background-color: @color2;
                    height: 100px;
                    .setting-btn-wrap{
                        width: 40px;
                        height: 32px;
                        border-radius: 16px;
                        position: relative;
                        float: right;
                        top: 50%;
                        margin-top: -16px;
                        margin-right: 10px;
                    }
                    .setting-btn{
                        width: 0px;
                        height: 28px;
                        border-radius: 14px;
                        position: absolute;
                        background: white;
                        box-shadow: 0px 2px 4px rgba(0,0,0,0.4);
                    }
                    .setting-btn-wrap-open{
                        background: rgba(0,184,0,0.8);
                    }
                    .setting-btn-open{
                        top: 2px;
                        right: 1px;
                    }
                    .setting-btn-wrap-close{
                        background: rgba(255,255,255,0.4);
                        border:2px solid rgba(0,0,0,0.15);
                        border-left: transparent;
                    }
                    .setting-btn-close{
                        left: 0px;
                        top: 0px;
                        border:2px solid rgba(0,0,0,0.1);
                    }
                }
            }
        }
    }

</style>
<template>
    <nv-head header-name="设置"
            left-btn-type="back">
    </nv-head>
    <div class="setting-container">
        <ul id="setting-items" class="setting-items">
            <li>
                <div class="setting-item">账户绑定<i href="" class="icon iconfont icon-newlisticon06 cancel-btn"></i></div>
                <ul class="submenu">
                    <li><a href="">信息门户绑定</a></li>
                    <li><a href="">宿舍绑定</a></li>
                    <li><a href="">图书馆绑定</a></li>
                </ul>
            </li>
            <li><div class="setting-item">系统设置<i href="" class="icon iconfont icon-newlisticon06 cancel-btn"></i></div>
                <ul class="submenu">
                    <li>是否开启新消息推送
                        <div class="setting-btn-wrap setting-btn-wrap-open">
                            <div class="setting-btn setting-btn-open"></div>
                        </div>
                    </li>
                    <li>校园卡余额提醒
                        <div class="setting-btn-wrap setting-btn-wrap-open">
                            <div class="setting-btn setting-btn-open"></div>
                        </div>
                    </li>
                    <li>宿舍电费余额提醒
                        <div class="setting-btn-wrap setting-btn-wrap-open">
                            <div class="setting-btn setting-btn-open"></div>
                        </div>
                    </li>
                    <li>成绩更新提醒
                        <div class="setting-btn-wrap setting-btn-wrap-open">
                            <div class="setting-btn setting-btn-open"></div>
                        </div>
                    </li>
                </ul>
            </li>
            <li><div class="setting-item">关于我们<i href="" class="icon iconfont icon-newlisticon06 cancel-btn"></i></div>
                <ul class="submenu">
                    <li><a href="">团队介绍</a></li>
                    <li><a href="">版本介绍</a></li>
                    <li><a href="">版本更新</a></li>
                </ul>
            </li>
            <li>
                <div class="setting-item">用户反馈</div>
            </li>
        </ul>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:''
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path;
            }
        },
        methods:{
        },
        events:{
            'headerRightBtnClick': function () {
                this.userDatas = [];
                var input = document.querySelectorAll('input');
                for (var i = 0; i < input.length; i++) {
                    this.userDatas.push(input[i].value);
                };
                console.log(this.userDatas);
            }
        },
        ready () {
        },
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>