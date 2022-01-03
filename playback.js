import {getIpcConfig, sendVbData} from './config.js';
const translateTime = timeStr => {
    timeStr = timeStr.replace(/-/g,'')
    timeStr = timeStr.replace(/:/g,'')
    timeStr = timeStr.replace(/ /g,'')
    console.log(timeStr)
    return timeStr
}
const subResByStr = (srcStr,str) => {
    srcStr = srcStr.substring(srcStr.indexOf(str)+str.length)
    const resArr = srcStr.split('\n')
    return resArr[0]
}
const searchTotalFile = async param => {	
    let {startTime,endTime,type,sid} = param
	startTime = translateTime(startTime);
	endTime = translateTime(endTime);
    const pbParam = {
        PBStartTimePos: startTime,
        PBEndTimePos: endTime,
        pbsetsid: sid,
        PBFileTotalPage: type
    }
    let res = await sendVbData(pbParam),
    flagStr = `OK pbfiletotalpage=`
    res = res.substring(res.indexOf(flagStr)+flagStr.length)
    console.log(res)
    const resArr = res.split('\n')
    const total = parseInt(resArr[0])
    sid = parseInt(resArr[1]&&parseInt(resArr[1].substring(resArr[1].indexOf('=')+1)))
    return {total,sid}
}

const getPageFile = async param => {
	let {startTime,endTime,curPage,sid} = param
    startTime = translateTime(startTime);
	endTime = translateTime(endTime);
    const pbParam = {
        PBStartTimePos: startTime,
        PBEndTimePos: endTime,
        pbsetsid: sid,
        PBFilePageIndex: curPage
    }
	let res = await sendVbData(pbParam),
    flagStr = `OK pbfilepageindex=`
    res = res.substring(res.indexOf(flagStr)+flagStr.length)
    res = res.split('\n')
    return res[0].split(';')
}
const getPlaybackInfo = ()=>{
    let param= `&macplugin&playbackport&upnpplaybackport&ddnsplaybackport&ddnsdomain&recordtime&ptzspeed
    &fishinstallmodel&fishdisplaymodel&fishcorrectmodel&osdzmtime&osdmdtime&osdpatroltime&osdscantime`
    return getIpcConfig(param)
}
const playRecord = async param => {
    let {time,sid} = param
    time = translateTime(time)
    const recordInfo = {
        PBCurTimePosHttp: time,
        pbsetsid: sid
    }
    let res = await sendVbData(recordInfo)
    let url = subResByStr(res,`OK pbcurtimepos=`)
    return url
}
const pauseRecord = (state,sid) => {
    return sendVbData(`PBStateHttp=${state}:${sid}`)
}
const stopRecord = sid => {
    return sendVbData(`PBStateHttp=-1:${sid}`)
}
const getCurTime = async sid => {
    const recordInfo = {
        PBCurTimePosHttp: sid
    }
    let res = await sendVbData(recordInfo)
    let success = res.indexOf("NG pbcurtimepos")<0
    res = subResByStr(res,`OK pbcurtimepos=`)
    console.log(res)
    const curTime = res.replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
        '$1-$2-$3 $4:$5:$6'
    )
    console.log(curTime)
    return {curTime,success}
}
const changeSpeed = async param => {
    const {speed,sid} = param
    const speedParam = {
        PBSpeed: speed,
        PBStateHttp: `2:${sid}`
    }
	let res = await sendVbData(speedParam)
    let setSpeed = res.indexOf('OK pbspeed')!=-1,
        success = res.indexOf('OK pbstate')!=-1
    return success&&setSpeed
}
const delSidHandle = sid=>{
    const sidParam = {
        pbsetsid: sid,
        pbdelete: ''
    }
    return sendVbData(sidParam)
}
export {
    searchTotalFile,
    getPageFile,
    getPlaybackInfo,
    playRecord,
    getCurTime,
    changeSpeed,
    pauseRecord,
    stopRecord,
    delSidHandle
}
