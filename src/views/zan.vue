<style lang="less">
@import '../assets/less/common/func.less';
.zan-wrap{
    position: absolute;
    top: 86px;
    width: 100%;
    .zan {
        
    }
}
</style>
<template>
    <nv-head header-name="点赞"
            left-btn-type="back">
    </nv-head>
    <div class="zan-wrap">
        <div v-for="zan in zans" class="zan">
            {{zan.user.nickname}}
        </div>
    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    require('../assets/less/iconfont/iconfont.css')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:'',
                userdata: {},
                zans: []
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
            'headerLeftBtnClick':function() {
                this.$route.router.go(this.backPath);
            }
        },
        ready () {
            var self = this;
            self.userdata.user_id = window.localStorage.getItem('user_id');
            self.userdata.token = window.localStorage.getItem('token');

            $.ajax({
                url: utils.urlpre+"Zan/unreadZan",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    self.zans = data.data;
                },
                error: function (xhr, status) {
                    console.log('网络错误');
                }
            })
        },
        components:{
            "nvHead":require('../components/header.vue'),
        }
    }
</script>