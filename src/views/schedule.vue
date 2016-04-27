<style lang="less">
@import '../assets/less/common/func.less';
.schedule-warp{
    position: absolute;
    top: 106px;
    left: 20px;
    right: 20px;
    margin-bottom: 20px;
    background-color: @card-white5;
    border-radius: 10px;
    box-shadow: 5px 5px 5px @font-gray3;
    padding: 10px;
    table {
        width: 100%;
        .flexbox();
        align-items: center;
        justify-content: center;
        border-collapse: separate;
        border-spacing: 10px;
        th, td{
            overflow: hidden;
            text-overflow: ellipsis;
            height: 80px;
            width: 18%;
        }
        th {
            width: 10%;
            text-align: center;
        }
        .has-lesson {
            border-left: 5px solid @schedule1;
            background-color: #f4f3f3;
        }
        .sch-2 {
            border-left: 5px solid @schedule2;
        }
    }
    .week-info-wrap{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60px;
        overflow: hidden;
        .week-info {
            background-color: @blue1;
            margin: 0 auto;
            height: 160px;
            width: 225px;
            border-radius: 50%;
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
                <th>{{lesson.startOfLesson}}</th>
                <td v-for="weekDay in lesson.weekDays" :rowspan="weekDay.dayOfLessons.subject_name? weekDay.dayOfLessons.end_lesson - weekDay.dayOfLessons.start_lesson + 1 : 1" :class="{ 'has-lesson': weekDay.dayOfLessons.subject_name }">
                    <p> 
                        {{weekDay.dayOfLessons.subject_name}}
                    </p>
                    <p>
                        {{weekDay.dayOfLessons.position}}
                    </p>
                </td>
            </tr>
        </table>
        <div class="week-info-wrap"><div class="week-info"></div></div>
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
                lessonDatas: [],
                lessons: []
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
            for (var i = 0; i < 11; i++) {
                var start = i+1;
                var les = {
                    startOfLesson: start + '',
                    weekDays: [
                        {
                            day: '1',
                            dayOfLessons: {}
                        },{
                            day: '2',
                            dayOfLessons: {}
                        },{
                            day: '3',
                            dayOfLessons: {}
                        },{
                            day: '4',
                            dayOfLessons: {}
                        },{
                            day: '5',
                            dayOfLessons: {}
                        }
                    ]
                }
                self.lessons.push(les);
            };
            self.userdata.user_id = window.localStorage.getItem('user_id');
            self.userdata.token = window.localStorage.getItem('token');
            self.userdata.term_code = 20142
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
                            for (var i = 0; i < self.lessonDatas.length; i++) {
                                var start = parseInt(self.lessonDatas[i].start_lesson) - 1;
                                var day = parseInt(self.lessonDatas[i].week_day) - 1;
                                self.lessons[start].weekDays[day].dayOfLessons = self.lessonDatas[i];
                            };
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