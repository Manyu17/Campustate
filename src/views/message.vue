<style lang="less">
@import '../assets/less/common/func.less';
.message-container{
        position: absolute;
        left: 0;
        right: 0;
        top: 86px;
        overflow-x: hidden;
        background-color: @card-white5;
        .message-items{
            li{
                font-size: 24px; /*px*/
                color: @font-gray1;
                width: 100%;
                background-color: @card-white5;
                line-height: 98px;
                height: 98px;
                div{
                    padding: 0 40px;
                    border-bottom: 1px solid @font-gray3; /*no*/
                    border-top: 1px solid @font-gray3; /*no*/
                    i{
                        float: right;
                    }
                    span {
                        float: right;
                        display: block;
                        background-color: @red1;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        margin-right: 20px;
                        text-align: center;
                        line-height: 35px;
                        color: @card-white5;
                        margin-top: 30px;
                    }
                    .dialog-header {
                        width: 68px;
                        height: 68px;
                        border-radius: 50%;
                        margin-right: 20px;
                    }
                }
            }
            li:nth-last-child(1){
                border-top: none;
            }
        }
    }

</style>
<template>
    <nv-head header-name="消息"
            left-btn-type="back">
    </nv-head>
    <div class="message-container">
        <ul id="message-items" class="message-items">
            <li v-for="item in items" class="message-item-wrap">
                <div class="message-item" @click="clickHandler($index)">
                    {{ item.item }}
                    <i class="icon iconfont icon-newlisticon06 cancel-btn"></i>
                    <span v-if=" item.newMessage !== 0 ">{{ item.newMessage }}</span>
                </div>
            </li>
            <li v-for="dialog in dialogs" class="message-item-wrap">
                <div class="message-item" @click="clickHandler($index)">
                    <img :src="dialog.user.header" class="dialog-header">
                    {{ dialog.user.nickname }}
                    <i class="icon iconfont icon-newlisticon06 cancel-btn"></i>
                    <span v-if=" dialog.number !== 0 ">{{ dialog.number }}</span>
                </div>
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
                userdata: {},
                items: [{
                    item: '评论',
                    itemIcon: '',
                    newMessage: 0
                },{
                    item: '点赞',
                    itemIcon: '',
                    newMessage: 0
                },{
                    item: '报名消息',
                    itemIcon: '',
                    newMessage: 0
                }],
                dialogs: []
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
            }
        },
        events:{
        },
        ready () {
            var self = this;
            self.userdata.user_id = window.localStorage.getItem('user_id');
            self.userdata.token = window.localStorage.getItem('token');

            $.ajax({
                url: utils.urlpre+"Message/dialogList",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    self.items[0].newMessage = data.data.unread_comment;
                    self.items[1].newMessage = data.data.unread_zan;
                    self.items[2].newMessage = data.data.unread_apply;
                    self.dialogs = data.data.dialog;
                },
                error: function (xhr, status) {
                    console.log('网络错误');
                }
            })
        },
        components:{
            "nvHead":require('../components/header.vue')
        }
    }
</script>