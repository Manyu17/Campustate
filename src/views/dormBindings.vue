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
    }
}
</style>
<template>
    <nv-head header-name="宿舍绑定"
            left-btn-type="back"
            right-btn-type="submit">
    </nv-head>
    <div class="affairs-warp">
        <banner :user-info="info"></banner>
        <input-list :input-lists="lists" :tip='tip'></input-list>
    </div>

    <div v-show="showList" class="resdata-wrap">
        <div class="resdata" :style="{ top: wrapHeight + 'px'}"></div>
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
                userDatas: [],
                userdata: {},
                info: {
                    name: "短毛羊绒球",
                    avatar: "http://7xpks6.com1.z0.glb.clouddn.com/FjBCDRqa-yvLYDNYElaa9ENaWc4X"
                },
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
                    console.log(data);
                },
                error: function (xhr, status) {
                    console.log('网络错误');
                }
            })
            $.ajax({
                url: utils.urlpre+"Electric/getFloor",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr, status) {
                    console.log('网络错误');
                }
            })
        }
    }
</script>