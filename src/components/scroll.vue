<style lang="less">
@import '../assets/less/common/func.less';

</style>
<template>
    <nv-head header-name="我的课表"
            left-btn-type="back"
            right-btn-type="submit">
    </nv-head>
    <div class="schedule-warp">
        <table cellspacing="10">
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
            
        },
        components:{
            "nvHead":require('../components/header.vue'),
        }
    }
</script>