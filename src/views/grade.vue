<style lang="less">
@import '../assets/less/common/func.less';
.grade-wrap{
    position: absolute;
    top: 86px;
    left: 0px;
    right: 0px;
    .grade-header {
        width: 100%;
        height: 200px;
        background-color: @blue1;
        color: @card-white5;
        text-align: center;
        position: relative;
        h1 {
            position: relative;
            font-size: 48px;
            top: 40px;
            margin-bottom: 70px;
        }
        p {
            font-size: 22px;
        }
        span {
            display: block;
            position: absolute;
            bottom: -19px;
            left: 50%;
            margin-left: -20px; 
            width: 0;
            height: 0;
            border-top: 20px solid @blue1;
            border-right: 20px solid rgba(0,0,0,0);
            border-left: 20px solid rgba(0,0,0,0);
            border-bottom: 0; 
        }
    }
    .grade-total {
        height: 300px;
        width: 100%;
        background-color: @card-white5;
        text-align: center;
        font-size: 22px;
        padding-top: 56px;
        .term {
            margin-bottom: 35px;
        }
        .grade-chart {
            width: 220px;
            height: 60px;
            background-color: @red1;
            color: @card-white5;
            line-height: 40px;
            margin: 0 auto;
            border-radius: 10px;
            font-size: 18px;
            i{
                font-size: 42px;
            }
        }
        .grade-data {
            display: flex;
            vertical-align: center;
            align-items: center;
            justify-content: center;
            margin-top: 45px;
            .subject, .value, .average {
                flex: 1.0;
                span {
                    display: block;
                }
                .data {
                    font-size: 48px;
                    margin-top: 20px;
                }
            }
        }
    }
    .grade-detail {
        .grade-subject {
            height: 102px;
            margin: 20px;
            padding-top: 30px;
            background-color: @card-white5;
            border-radius: 10px;
            box-shadow: 2px 2px 2px @font-gray3;
            position: relative;
            .property {
                position: absolute;
                width: 80px;
                height: 50px;
                top: -10px;
                left: 10px;
                background-color: @red1;
                color: @card-white5;
                font-size: 24px;
                text-align: center;
                line-height: 50px;
                span {
                    display: block;
                    position: absolute;
                    top: 0;
                    right: -17px;
                    width: 0;
                    height: 0;
                    border-top: 10px solid rgba(0,0,0,0);
                    border-right: 10px solid rgba(0,0,0,0);
                    border-left: 8px solid @red2;
                    border-bottom: 0;
                }
            }
            .choose {
                background-color: @blue1;
                span {
                    border-left: 8px solid @blue3;
                }
            }
            .name {
                margin-left: 100px;
                font-size: 28px;
            }
            .type {
                margin-left: 100px;
                margin-top: 15px;
                font-size: 20px;
                color: @font-gray3;
                span {
                    margin-right: 28px;
                }
            }
            .grade {
                position: absolute;
                top: 36px;
                right: 30px;
                font-size: 18px;
                .grade-num {
                    font-size: 36px;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>
<template>
    <nv-head left-btn-type="back" right-btn-type="submit">
    </nv-head>
    <div class="grade-wrap">
        <div class="grade-header">
            <h1>学霸</h1>
            <p>你就是传说中的学霸？接受膜拜吧！</p>
            <span></span>
        </div>
        <div class="grade-total">
            <p class="term">2015-2016学年 第一学期 专业学位</p>
            <div class="grade-chart">
            <i class="icon iconfont icon-graphic"></i>
            成绩可视化</div>
            <div class="grade-data">
                <div class="subject">
                    <span>已修课程</span>
                    <span class="data">{{count}}</span>
                </div>
                <div class="value">
                    <span>已修学分</span>
                    <span class="data">{{value}}</span>
                </div>
                <div class="average">
                    <span>平均分</span>
                    <span class="data">{{average}}</span>
                </div>
            </div>
        </div>
        <div class="grade-detail">
            <div class="grade-subject" v-for="grade in grades">
                <span class="property" :class="{'choose': grade.subject_property==='选修'}">
                    {{grade.subject_property}}
                    <span></span>
                </span>
                <p class="name">{{grade.subject_name}}</p>
                <p class="type">
                    <span>{{grade.subject_type}}</span>
                    <span>{{grade.subject_value}}学分</span>
                </p>
                <p class="grade"><span class="grade-num">{{grade.subject_grade}}</span><span>分</span></p>
            </div>
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
                grades: [],
                value: 0,
                average: 0,
                count: 0

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
                url: utils.urlpre+"Grade/getGrade",
                type: "POST",
                crossDomain: true,
                data: self.userdata,
                dataType: "json",
                success: function (data) {
                    var allGrade = 0;
                    self.count = data.data.major.terms_arr[0].subjects_count;
                    self.grades = data.data.major.terms_arr[0].subjects;
                    for (var i = 0; i < self.grades.length; i++) {
                        self.value = parseFloat(self.grades[i].subject_value) + self.value;
                        allGrade = parseFloat(self.grades[i].subject_grade) + allGrade;
                    }
                    self.average = allGrade/self.count;
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