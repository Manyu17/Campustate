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
                        text-align: center;
                        line-height: 68px;
                        &:before{
                            font-size: 32px;
                            color: #fff;   
                        }
                    }
                    i{
                        position: absolute;
                        right: 40px;
                        &:before{
                            font-size: 23px;
                            color: @font-gray3;
                        }
                    }
                    .tip {
                        position: absolute;
                        right: 60px;
                        display: inline-block;
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
                <div class="message-item" @click="clickHandler(item.item)">
                    <span class="item-icon icon iconfont" :class="item.itemIcon" v-bind:style="{ backgroundColor: item.color}"></span>
                    {{ item.item }}
                    <i class="icon iconfont icon-arrow"></i>
                    <span class="tip" v-if=" item.newMessage !== 0 ">{{ item.newMessage }}</span>
                </div>
            </li>
            <li v-for="dialog in dialogs" class="message-item-wrap">
                <div class="message-item" @click="letter()">
                    <img :src="dialog.user.header" class="dialog-header">
                    {{ dialog.user.nickname }}
                    <i class="icon iconfont icon-arrow"></i>
                    <span class="tip" v-if=" dialog.number !== 0 ">{{ dialog.number }}</span>
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
                    itemIcon: 'icon-pinglun',
                    color: '#fead7a',
                    newMessage: 0
                },{
                    item: '点赞',
                    itemIcon: 'icon-zan',
                    color: '#02b5e3',
                    newMessage: 0
                },{
                    item: '报名消息',
                    itemIcon: 'icon-xx',
                    color: '#92d56a',
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
            clickHandler: function(item) {
                switch(item){
                    case '评论':
                        this.$route.router.go({name:'comment'})
                        break
                    case '点赞':
                        this.$route.router.go({name:'zan'})
                        break
                    case '报名消息':
                        this.$route.router.go({name:'applyMessage'})
                        break
                }
            },
            letter: function (){
                this.$route.router.go({name:'letter'})
            }
        },
        events:{
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath)
            }
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