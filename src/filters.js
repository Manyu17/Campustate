"use strict"

import utils from  './libs/utils'


/**格式化时间
 *  @param {string} time 需要格式化的时间
 *  @param {bool} friendly 是否是fromNow
 */
exports.getLastTimeStr = (time, friendly) => {
    time = parseInt(time)
    if (friendly) {
        return utils.MillisecondToDate(new Date() - new Date(time));
    } else {
        return utils.fmtDate(new Date(time),'yyyy/MM/dd');
    }
}

/** 获取文字标签
 *  @param {string} tab Tab分类
 *  @param {bool} good 是否是精华帖
 *  @param {bool} top 是否是置顶帖
 */
exports.getTabStr = (tab, good, top) => {
    let str = "";
    if (top) {
        str = "置顶";
    } else if (good) {
        str = "精华";
    } else {
        switch (tab) {
            case "share":
                str = "分享";
                break;
            case "ask":
                str = "问答";
                break;
            case "job":
                str = "招聘";
                break;
            default:
                str = "暂无";
                break;
        }
    }
    return str;
}

/** 获取标签样式
 *  @param {string} tab Tab分类
 *  @param {bool} good 是否是精华帖
 *  @param {bool} top 是否是置顶帖
 */
exports.getTabClassName = (tab, good, top) => {
    let className = '';

    if (top) {
        className = "top";
    } else if (good) {
        className = "good";
    } else {
        switch (tab) {
            case "share":
                className = "share";
                break;
            case "ask":
                className = "ask";
                break;
            case "job":
                className = "job";
                break;
            default:
                className = "default";
                break;
        }
    }
    return className;
}

/** 获取title文字
 *  @param {string} tab Tab分类
 */
exports.getTitleStr = tab => {
    let str = "";
    switch (tab) {
        case "share":
            str = "分享";
            break;
        case "ask":
            str = "问答";
            break;
        case "job":
            str = "招聘";
            break;
        case "good":
            str = "精华";
            break;
        default:
            str = "全部";
            break;
    }
    return str;
}
/** 获取活动状态
 *  @param {string} statusnum statusnum状态
 */
exports.getStatusStr = statusnum => {
    let str = "";
    switch (statusnum) {
        case '0':
            str = "招募中";
            break;
        case '1':
            str = "招募完毕";
            break;
        case '2':
            str = "活动结束";
            break;
        default:
            str = "招募中";
            break;
    }
    return str;
}
exports.getFocusStr = focus => {
    let str = "";
    switch (focus) {
        case 0:
            str = "加关注";
            break;
        case 1:
            str = "已关注";
            break;
        case false:
            str = "加关注";
            break;
        case true:
            str = "已关注";
            break;
    }
    return str;
}
exports.getUserListHeadStr = type => {
    let str = "";
    switch (type) {
        case 'focus':
            str = "关注列表";
            break;
        case 'fans':
            str = "粉丝列表";
            break;
    }
    return str;
}
exports.getGenderStr = {
    read:function(gender) {
        let str = "";
        switch (gender) {
            case '1':
                str = "男";
                break;
            case '2':
                str = "女";
                break;
        }
        return str;
    },
    write:function(gender) {
        let str = "";
        switch (gender) {
            case '男':
                str = "1";
                break;
            case '女':
                str = "2";
                break;
        }
        return str;
    }
}
exports.getSecretStr = {
    read:function(hide) {
        let str = "";
        switch (hide) {
            case '1':
                str = "公开";
                break;
            case '0':
                str = "保密";
                break;
            case 1:
                str = "公开";
                break;
            case 0:
                str = "保密";
                break;
        }
        return str;
    },
    write:function(hide) {
        let str = "";
        switch (hide) {
            case '公开':
                str = "1";
                break;
            case '保密':
                str = "0";
                break;
        }
        return str;
    }
}