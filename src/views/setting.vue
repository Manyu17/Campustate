<style lang="less">
@import '../assets/less/common/func.less';
.setting-container{
        position: absolute;
        left: 0;
        right: 0;
        top: 86px;
        overflow-x: hidden;
        background-color: @card-white5;
        .setting-items{
            li{
                font-size: 24px; /*px*/
                color: @font-gray1;
                width: 100%;
                background-color: @card-white5;
                line-height: 98px;
                div{
                    display: flex;
                    align-items: center;
                    position: relative;
                    padding: 0 40px;
                    border-bottom: 1px solid @font-gray3; /*no*/
                    border-top: 1px solid @font-gray3; /*no*/
                    .item-icon {
                        display: inline-block;
                        width: 68px;
                        height: 68px;
                        background-color: @blue1;
                        border-radius: 50%;
                        margin-right: 20px;
                    }
                    i{
                        position: absolute;
                        right: 40px;
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
                border-top: none;
            }
            .submenu{
                width: 100%;
                li{
                    box-sizing: border-box;
                    border-bottom: 1px solid @font-gray3; /*no*/
                    margin-left: 80px;
                    background-color: @card-white5;
                    color: @font-gray2;
                    height: 80px;
                }
                li:nth-last-child(1){
                    border-bottom: none;
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
            <li v-for="item in items" class="setting-item-wrap">
                <div class="setting-item" @click="clickHandler($index)">
                    <span class="item-icon"></span>
                    {{ item.item }}
                    <i v-if="item.subitems" class="icon iconfont icon-newlisticon06 cancel-btn" :class="{'iconopen': item.subitemsShow}"></i>
                </div>
                <ul class="submenu" v-show="item.subitemsShow && item.subitems">
                    <li v-for="subitem in item.subitems">
                        {{ subitem }}
                    </li>
                </ul>
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
                backPath:'',
                items: [{
                    item: '账户绑定',
                    itemIcon: '',
                    subitems: ['宿舍绑定', '图书馆绑定', '教务绑定', '手机绑定', '邮箱绑定'],
                    subitemIcon: '',
                    subitemsShow: false
                },{
                    item: '系统设置',
                    itemIcon: '',
                    subitems: ['是否开启新消息设置', '校园卡余额提醒', '电费余额提醒', '成绩更新提醒'],
                    subitemIcon: '',
                    subitemsShow: false
                },{
                    item: '关于我们',
                    itemIcon: '',
                    subitems: ['系统介绍', '团队介绍', '版本更新'],
                    subitemIcon: '',
                    subitemsShow: false
                },{
                    item: '用户反馈',
                    itemIcon: '',
                    subitemsShow: false
                }]
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path;
            }
        },
        methods:{
            clickHandler: function(index) {
                var self = this;
                self.items[index].subitemsShow = !self.items[index].subitemsShow;
            }
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