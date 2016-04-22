<style lang="less">
@import '../assets/less/common/func.less';
.schedule-warp{
    position: absolute;
    top: 86px;
    width: 100%;
}
</style>
<template>
    <nv-head header-name="我的课表"
            left-btn-type="back"
            right-btn-type="submit">
    </nv-head>
    <div class="schedule-warp">

    </div>
</template>
<script>
    require('../assets/less/common/reset.less')
    import utils from  '../libs/utils'
    export default {
        data (){
            return {
                backPath:'',
                userdata: {}
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
            }
        },
        ready (){
            var self = this;
            // self.userdata.user_id = window.localStorage.getItem('user_id');
            // self.userdata.token = window.localStorage.getItem('token');
            // self.userdata.term_code = 20152
            self.userdata = {
                user_id: '3',
                token: '1234qwer',
                term_code: 20141
            }
            $.ajax({
                url: utils.urlpre+"Timetable/getTimetable",
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
        },
        components:{
            "nvHead":require('../components/header.vue'),
        }
    }
</script>