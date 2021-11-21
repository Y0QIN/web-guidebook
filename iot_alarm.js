var iot_alarm_enable_param = iot_alarm_json.iotalarmenable;
var iot_alarm_enable_list = iot_alarm_enable_param.split(",");
var m_iot_has_sensor = iot_alarm_json.iothassensor;

function changeRule()
{
	var rule = document.getElementById("sel_rules").value;
	var index = parseInt(rule);
	document.getElementById("enable_check").checked = iot_alarm_enable_list[index] == "1"?true:false;
	rule = parseInt(rule) + parseInt(IoT_ALARM_EVENT_RULE1);
	document.getElementById("scheChartFrame").src="/scheduleChart.html?schIndex="+rule;
	iFrameHeight('scheChartFrame');
	document.getElementById("alarmActionSettings").src="/alarm_actionsetting.html?alarmIndex="+rule;
	iFrameHeight('alarmActionSettings');
}

var AlarmTimer = 0;

document.onselectstart=function(e){
    var omitformtags = ["input", "textarea"];
    omitformtags = "|"+ omitformtags.join("|") + "|";
    e=window.event||e;
    var etar=e.srcElement.tagName||e.target.tagName
    var eName=etar==undefined?"div":etar.toLowerCase();
    if (omitformtags.indexOf("|"+eName+"|")==-1)
    {return false;}
}
window.onunload = function()
{
	MY_ONUNLOAD();
};

function MY_ONUNLOAD() {
	
}

function MY_ONLOAD() {
	ASTGUI.cookies.fe_check_cookie();
	ForbidUserViewer();
	My_Load();
}	
	  
function My_Load() {
	
	document.getElementById("enable_check").checked = iot_alarm_enable_list[0] == "1"?true:false;
	setTimeout("updateIoTAlarmStatus()", 3000);
}

function updateIoTAlarmStatus()
{
	var url = "/vb.htm?language=ie&getiotalarmstatus";
	SendHttp(url, false, updateIoTAlarmStatusUI);
}


function updateIoTAlarmStatusUI(g_SubmitHttp) 
{
	if (g_SubmitHttp.readyState == 4) 
	{
		if (g_SubmitHttp.status == 200) 
		{
			try 
			{
				var txt = g_SubmitHttp.responseText;
				var ix = txt.indexOf("OK getiotalarmstatus=");
				//var ix1 = txt.indexOf("diffnum=");
				
				if (ix >= 0) 
				{
					var code = txt.substring(ix + 21,ix + 29);					
					code = parseInt(code, 16);

					var rule = parseInt(document.getElementById("sel_rules").value);
										
					if (code & (1 << rule)) 
					{
						
						document.getElementById("alarming").style.display = "inline";
					} 
					else 
					{
						document.getElementById("alarming").style.display = "none";
					}
				}
			} 
			catch (e) 
			{
			}
		}
		AlarmTimer = setTimeout("updateIoTAlarmStatus()", 3000);
	}
}

function onSubmit(){

	var rule = parseInt(document.getElementById("sel_rules").value);
	var url = "/vb.htm?page=iotalarm."+rule;
	
	iot_alarm_enable_list[rule] = document.getElementById("enable_check").checked==true?"1":"0";
	url += "&alarmenable=" + iot_alarm_enable_list[rule];
	var asUrl = alarmActionSettings.window.getActionSettingsUrl(url);
	if (asUrl == -1)
		return;

	url += asUrl;
	SendHttp(url, false, OnSendHttp);
	setMsTableStyle();
}

function onEditSensorAlarm()
{
	var index = document.getElementById("sel_rules").value;
	if(m_iot_has_sensor == "1")
	{
		windowObj.ShowIFrame("/iot_alarm_sensor.html?ruleIndex="+index, 600, 450);
	}
	else if(m_iot_has_sensor == "2"){
		ShowAlert(iotEditSensorTips);
	}
	else
	{
		ShowAlert(iot_no_sensor_tips);
	}
}
