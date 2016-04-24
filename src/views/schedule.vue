<style lang="less">
@import '../assets/less/common/func.less';
.schedule-warp{
    position: absolute;
    top: 86px;
    width: 100%;
    table {
        .flexbox();
        align-items: center;
        justify-content: center;
        td {
            flex:1.0;
        }
        th, td{
            height: 80px;
            // line-height: 50px;
        }
    }
}
</style>
<template>
    <nv-head header-name="我的课表"
            left-btn-type="back"
            right-btn-type="submit">
    </nv-head>
    <div class="schedule-warp">
        <table>
            <tr>
                <th></th>
                <td v-for="week in weeks">{{week}}</td>
            </tr>
            <tr v-for="lesson in lessons">
                <th>{{lesson}}</th>
                <td :rowspan="2" v-for="weekDay in weekDays">
                    <p v-for="lessonData in lessonDatas" v-if="lessonData | showlesson weekDay lesson"> {{lessonData.subject_name}} </p>
                </td>
            </tr>
        </table>
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
                weeks: ['周一','周二','周三','周四','周五'],
                lessons: ['1','2','3','4','5','6','7','8','9','10','11'],
                lessonDatas: [],
                weekDays: ['1','2','3','4','5']
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
            self.userdata.user_id = window.localStorage.getItem('user_id');
            self.userdata.token = window.localStorage.getItem('token');
            self.userdata.term_code = 20142
            // self.userdata = {
            //     user_id: '3',
            //     token: '1234qwer',
            //     term_code: 20141
            // }
            $.ajax({
                url: utils.urlpre+"Timetable/updateTimetable",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    $.ajax({
                        url: utils.urlpre+"Timetable/getTimetable",
                        type: "POST",
                        crossDomain: true,
                        data: self.userdata,
                        dataType: "json",
                        success: function (data) {
                            self.lessonDatas = data.data;
                            // console.log(self.lessonDatas);
                        },
                        error: function (xhr, status) {
                            console.log('网络错误');
                        }
                    })
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