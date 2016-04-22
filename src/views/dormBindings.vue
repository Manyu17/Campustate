<style lang="less">
@import '../assets/less/common/func.less';
.affairs-warp{
    position: absolute;
    top: 86px;
    width: 100%;
}
.resdata-wrap {
    position: absolute;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .resdata {
        position: absolute;
        z-index: 10000;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: @card-white5;
        overflow-y: scroll;
        li {
            height: 86px;
            line-height: 86px;
            font-size: 22px;
            color: @font-gray1;
            margin: 0 35px;
            padding-left: 40px;
            border-bottom: 1px solid @font-gray3; /*no*/
        }
    }
}
</style>
<template>
    <nv-head header-name="宿舍绑定"
            left-btn-type="back"
            right-btn-type="submit">
    </nv-head>
    <div class="affairs-warp">
        <banner></banner>
        <input-list :input-lists="lists" :tip='tip'></input-list>
    </div>

    <div v-show="showList" class="resdata-wrap">
        <div class="resdata" :style="{ top: wrapHeight + 'px'}">
            <ul>
                <li v-for="list in listInfo" v-on:click="setValue(list)">
                    {{ list.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:'',
                showList: false,
                wrapHeight: 0,
                tip: '海韵学生公寓一期-海韵4-0201',
                userDatas: {},
                userdata: {},
                listInfo: [],
                campusList: [],
                campus: '',
                floor: '',
                room: '',
                lists: [
                    {
                        type: "text",
                        placeholder: "园区",
                        readonly: true
                    },
                    {
                        type: "text",
                        placeholder: "楼号",
                        readonly: true
                    },
                    {
                        type: "text",
                        placeholder: "宿舍号"
                    }
                ]
            }
        },
        route:{
            data (transition){
                this.backPath = transition.from.path
            }
        },
        methods:{
            setValue: function (list) {
                if(this.listInfo === this.campusList){
                    document.querySelectorAll('input')[0].value = list.name;
                    this.campus = list.id;
                }else {
                    document.querySelectorAll('input')[1].value = list.name;
                    this.floor = list.id;
                }
                this.showList = false;
            }
        },
        events:{
            'headerRightBtnClick': function () {
                var self = this;
                self.room = document.querySelectorAll('input')[2].value;
                self.userDatas =  {
                    user_id: self.userdata.user_id,
                    token: self.userdata.token,
                    campus_id: self.campus,
                    floor_id: self.floor,
                    room_num: self.room 
                }
                $.ajax({
                    url: utils.urlpre+"Electric/bindRoom",
                    type: "POST",
                    crossDomain: true,
                    data: self.userDatas,
                    dataType: "json",
                    success: function (data) {
                        self.$route.router.go('/bindingsSuccess');
                        console.log(data);
                    },
                    error: function (xhr, status) {
                        console.log('网络错误');
                    }
                })
            },
            'isShowList': function (placeholder) {
                var self = this;
                if(placeholder === '园区') {
                    self.listInfo = self.campusList;
                    self.showList = true;
                } else if (self.campus !== '' && placeholder === '楼号') {
                    var floorData = {
                        user_id: self.userdata.user_id,
                        token: self.userdata.token,
                        campus_id: self.campus
                    }
                    $.ajax({
                        url: utils.urlpre+"Electric/getFloor",
                        type: "POST",
                        crossDomain: true,
                        data: floorData,
                        dataType: "json",
                        success: function (data) {
                            self.listInfo = data.data;
                        },
                        error: function (xhr, status) {
                            console.log('网络错误');
                        }
                    })
                    self.showList = true;
                }
            }
        },
        components:{
            "nvHead":require('../components/header.vue'),
            "banner":require('../components/avatarBanner.vue'),
            "inputList":require('../components/bindingsInput.vue')
        },
        ready () {
            var self = this;
            self.wrapHeight = window.innerHeight/2;
            self.userdata.user_id = window.localStorage.getItem('user_id');
            self.userdata.token = window.localStorage.getItem('token');
            $.ajax({
                url: utils.urlpre+"Electric/getCampus",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    self.campusList = data.data;
                },
                error: function (xhr, status) {
                    console.log('网络错误');
                }
            })
        }
    }
</script>