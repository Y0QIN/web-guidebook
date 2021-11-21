var iot_ftp_enable_param = iot_actionsetting_json.iotftpenable;
var iot_ftp_enable_list = iot_ftp_enable_param.split(",");
var iot_ftp_file_param = iot_actionsetting_json.iotftpfileformat;
var iot_ftp_file_list = iot_ftp_file_param.split(",");
var iot_smtp_enable_param = iot_actionsetting_json.iotsmtpenable;
var iot_smtp_enable_list = iot_smtp_enable_param.split(",");
var iot_smtp_file_param = iot_actionsetting_json.iotsmtpfileformat;
var iot_smtp_file_list = iot_smtp_file_param.split(",");
var iot_storage_enalbe_param = iot_actionsetting_json.iotstorageenable;
var iot_storage_enalbe_list = iot_storage_enalbe_param.split(",");
var iot_storage_file_param = iot_actionsetting_json.iotstoragefileformat;
var iot_storage_file_list = iot_storage_file_param.split(",");
var iot_ext_output_param = iot_actionsetting_json.iotexttriggeroutput;
var iot_ext_output_list = iot_ext_output_param.split(",");
var iot_audio_play_param = iot_actionsetting_json.iotaudioplay;
var iot_audio_play_list = iot_audio_play_param.split(",");
var iot_audio_file_param = iot_actionsetting_json.iotaudiofile;
var iot_audio_file_list = iot_audio_file_param.split(",");
var iot_sip_alarm_param = iot_actionsetting_json.iotsipphone;
var iot_sip_alarm_list = iot_sip_alarm_param.split(",");
var iot_buzz_play_param = iot_actionsetting_json.iotbuzzenable;
var iot_buzz_play_list = iot_buzz_play_param.split(",");
var iot_trig_duration_param = iot_actionsetting_json.iotduration;
var iot_trig_duration_list = iot_trig_duration_param.split(",");
var iot_audio_interval_param = iot_actionsetting_json.iotaudiointerval;
var iot_audio_interval_list = iot_audio_interval_param.split(",");
var iot_smtp_interval_param = iot_actionsetting_json.iotsmtpinterval;
var iot_smtp_interval_list = iot_smtp_interval_param.split(",");
var iot_record_sec_param = iot_actionsetting_json.iotrecordduration;
var iot_record_sec_list = iot_record_sec_param.split(",");
var iot_snap_stream_param = iot_actionsetting_json.iotjpgsavestream;
var iot_snap_stream_list = iot_snap_stream_param.split(",");
var iot_snap_num_param = iot_actionsetting_json.iotsnapnum;
var iot_snap_num_list = iot_snap_num_param.split(",");
var iot_snap_interval_param = iot_actionsetting_json.iotsnapinterval;
var iot_snap_interval_list = iot_snap_interval_param.split(",");
var iot_snap_unit_param = iot_actionsetting_json.iotsnapunit;
var iot_snap_unit_list = iot_snap_unit_param.split(",");
var iot_notify_enable_param = iot_actionsetting_json.iotnotifyenable;
var iot_notify_enable_list = iot_notify_enable_param.split(",");

var iot_notify_url_0_param = iot_actionsetting_json.iotnotifyurl0;
var iot_notify_url_list_0  = iot_notify_url_0_param.split("/,;");
var iot_notify_url_1_param = iot_actionsetting_json.iotnotifyurl1;
var iot_notify_url_list_1  = iot_notify_url_1_param.split("/,;");
var iot_notify_url_2_param = iot_actionsetting_json.iotnotifyurl2;
var iot_notify_url_list_2  = iot_notify_url_2_param.split("/,;");
var iot_notify_user_0_param = iot_actionsetting_json.iotnotifyuser0;
var iot_notify_user_list_0  = iot_notify_user_0_param.split("/,;");
var iot_notify_user_1_param = iot_actionsetting_json.iotnotifyuser1;
var iot_notify_user_list_1  = iot_notify_user_1_param.split("/,;");
var iot_notify_user_2_param = iot_actionsetting_json.iotnotifyuser2;
var iot_notify_user_list_2  = iot_notify_user_2_param.split("/,;");
var iot_notify_pwd_0_param = iot_actionsetting_json.iotnotifypwd0;
var iot_notify_pwd_list_0  = iot_notify_pwd_0_param.split("/,;");
var iot_notify_pwd_1_param = iot_actionsetting_json.iotnotifypwd1;
var iot_notify_pwd_list_1  = iot_notify_pwd_1_param.split("/,;");
var iot_notify_pwd_2_param = iot_actionsetting_json.iotnotifypwd2;
var iot_notify_pwd_list_2  = iot_notify_pwd_2_param.split("/,;");
var iot_notify_interval_param = iot_actionsetting_json.iotnotifyinterval;
var iot_notify_interval_list = iot_notify_interval_param.split(",");
var iot_notify_select_param = iot_actionsetting_json.iotnotifyselect;
var iot_notify_select_list = iot_notify_select_param.split(",");

var iot_ext_output_ext_param = iot_actionsetting_json.iotexttriggeroutputext;
var iot_ext_output_ext_list = iot_ext_output_ext_param.split(",");
var iot_whitelightenable_param = iot_actionsetting_json.iotwhitelightenable;
var iot_whitelightenable_list = iot_whitelightenable_param.split(",");
var iot_flashtime_param = iot_actionsetting_json.iotflashtime;
var iot_flashtime_list = iot_flashtime_param.split(",");
var iot_alwaystime_param = iot_actionsetting_json.iotalwaystime;
var iot_alwaystime_list = iot_alwaystime_param.split(",");
var iot_whiteledmode_param = iot_actionsetting_json.iotwhiteledmode;
var iot_whiteledmode_list = iot_whiteledmode_param.split(",");
var iot_whiteStartHour_param = iot_actionsetting_json.iotwhitestarthour;
var iot_whiteStartHour_list = iot_whiteStartHour_param.split(",");
var iot_whiteStartMinute_param = iot_actionsetting_json.iotwhitestartminute;
var iot_whiteStartMinute_list = iot_whiteStartMinute_param.split(",");
var iot_whiteStopHour_param = iot_actionsetting_json.iotwhitestophour;
var iot_whiteStopHour_list = iot_whiteStopHour_param.split(",");
var iot_whiteStopMinute_param = iot_actionsetting_json.iotwhitestopminute;
var iot_whiteStopMinute_list = iot_whiteStopMinute_param.split(",");
var iot_whitEffectMode_param = iot_actionsetting_json.iotwhiteeffectmode;
var iot_whitEffectMode_list = iot_whitEffectMode_param.split(",");
var iot_whiteEffectValue_param = iot_actionsetting_json.iotwhiteeffectvalue;
var iot_whiteEffectValue_list = iot_whiteEffectValue_param.split(",");
var iot_whiteledgroup_param = iot_actionsetting_json.iotwhiteledgroup;
var iot_whiteledgroup_list = iot_whiteledgroup_param.split(",");

var iot_osdblink_enable_param = iot_actionsetting_json.iotosdblinkenable;
var iot_osdblink_enable_list = iot_osdblink_enable_param.split(",");
var iot_osdblink_time_param = iot_actionsetting_json.iotosdblinktime;
var iot_osdblink_time_list = iot_osdblink_time_param.split(",");


// var m_device_showosd_list = new Array(iot_osdblink_time_param["iotdevshowosd.0"],iot_osdblink_time_param["iotdevshowosd.1"],iot_osdblink_time_param["iotdevshowosd.2"],iot_osdblink_time_param["iotdevshowosd.3"],iot_osdblink_time_param["iotdevshowosd.4"],
// 	iot_osdblink_time_param["iotdevshowosd.5"],iot_osdblink_time_param["iotdevshowosd.6"],iot_osdblink_time_param["iotdevshowosd.7"]);
// var m_device_sensor_alarm_list = new Array(iot_osdblink_time_param["iotdevalarmlist.0"],iot_osdblink_time_param["iotdevalarmlist.1"],iot_osdblink_time_param["iotdevalarmlist.2"],iot_osdblink_time_param["iotdevalarmlist.3"]);
// var m_show_osd_array = new Array();
// var m_sensor_alarm_array = new Array();

var g_iot_index = 0;
var MAX_SENSOR_NUM = 24;
var MAX_DEVICE_NUM = 8;

function InitIotAlarmParams(iot_index)
{
	var alarmIndex = iot_index - parseInt(IoT_ALARM_EVENT_RULE1);
	g_iot_index = alarmIndex;
	m_http_enable = iot_notify_enable_list[alarmIndex];
	m_notify_select = iot_notify_select_list[alarmIndex].split(":");
	m_notify_interval = iot_notify_interval_list[alarmIndex].split(":");
	m_notify_url = new Array(iot_notify_url_list_0[alarmIndex], iot_notify_url_list_1[alarmIndex], iot_notify_url_list_2[alarmIndex]);
	m_notify_user = new Array(iot_notify_user_list_0[alarmIndex], iot_notify_user_list_1[alarmIndex], iot_notify_user_list_2[alarmIndex]);
	m_notify_pwd = new Array(iot_notify_pwd_list_0[alarmIndex], iot_notify_pwd_list_1[alarmIndex], iot_notify_pwd_list_2[alarmIndex]);

	m_aftpenable = iot_ftp_enable_list[alarmIndex];
	m_ftpfileformat = iot_ftp_file_list[alarmIndex];
	m_asmtpenable = iot_smtp_enable_list[alarmIndex];
	m_attfileformat = iot_smtp_file_list[alarmIndex];		// smtp 
	m_alarmstorage = iot_storage_enalbe_list[alarmIndex];
	m_storagefileformat = iot_storage_file_list[alarmIndex];

	m_exttriggeroutput = iot_ext_output_list[alarmIndex];
	m_exttriggeroutput_1 = iot_ext_output_ext_list[alarmIndex];

	m_audioplay = iot_audio_play_list[alarmIndex];
	m_audiofile = iot_audio_file_list[alarmIndex];
	m_alarmsipenable = iot_sip_alarm_list[alarmIndex];
		
	m_buzzplay = iot_buzz_play_list[alarmIndex];

	m_alarmduration = iot_trig_duration_list[alarmIndex];
	m_audiointerval = iot_audio_interval_list[alarmIndex];
	m_smtp_interval = iot_smtp_interval_list[alarmIndex];

	m_aviduration = iot_record_sec_list[alarmIndex];
	m_ajpgsavestream = iot_snap_stream_list[alarmIndex];
	m_asmtpattach = iot_snap_num_list[alarmIndex];		// imgNum
	m_snap_interval = iot_snap_interval_list[alarmIndex];
	m_snap_unit = iot_snap_unit_list[alarmIndex];
	m_whitelightenable = iot_whitelightenable_list[alarmIndex];
	m_flashtime = iot_flashtime_list[alarmIndex];
	m_alwaystime = iot_alwaystime_list[alarmIndex];
	m_whiteledmode = iot_whiteledmode_list[alarmIndex];
	m_whiteStartHour = iot_whiteStartHour_list[alarmIndex];
	m_whiteStartMinute = iot_whiteStartMinute_list[alarmIndex];
	m_whiteStopHour = iot_whiteStopHour_list[alarmIndex];
	m_whiteStopMinute = iot_whiteStopMinute_list[alarmIndex];
	m_whitEffectMode = iot_whitEffectMode_list[alarmIndex];
	m_whiteEffectValue = iot_whiteEffectValue_list[alarmIndex];
	m_whiteledgroup = iot_whiteledgroup_list[alarmIndex];

	m_osdblinkenable = iot_osdblink_enable_list[alarmIndex];
	m_osdblinktime = iot_osdblink_time_list[alarmIndex];

	// m_show_osd_array = m_device_showosd_list[alarmIndex].split(";");
	// m_sensor_alarm_array = m_device_sensor_alarm_list[alarmIndex].split(";");
}

function InitIoTAlarm(iotIndex)
{
	InitIotAlarmParams(iotIndex);
	$("#tr_osd_blink").show();
	$("#tr_osd_blink_time").show();
	document.getElementById("check_osdblink").checked = (m_osdblinkenable=="1"?true:false);
	$("#osdblink_time_slider").slider('value', m_osdblinktime);
	// var len = m_sensor_alarm_array.length;
	// var i = 0;
	// for(i = 0;i < len;i++)
	// {
	// 	if(m_sensor_alarm_array[i] == "1" && m_show_osd_array[i] == "1")
	// 		break;
	// }
	// if(i == len)
	// {
	// 	$("#span_osdblink").show();
	// }
}

// function updateShowOsdCheck()
// {
// 	var url = "/vb.htm?&paratest=iotdevalarmlist." + g_iot_index;
// 	SendHttp(url, false, updateShowOsd);
// }

// function updateShowOsd(g_SubmitHttp) 
// {
// 	if (g_SubmitHttp.readyState == 4) 
// 	{
// 		if (g_SubmitHttp.status == 200) 
// 		{
// 			try 
// 			{
// 				var txt = g_SubmitHttp.responseText;
// 				var ix = txt.indexOf("OK iotdevalarmlist.");				
// 				if (ix >= 0)
// 				{
// 					var status = txt.substring(ix + 21).split(";");
// 					for(var i = 0;i < MAX_DEVICE_NUM;i++)
// 					{
// 						for(var j = 0;j < MAX_SENSOR_NUM;j++)
// 						{
// 							m_sensor_alarm_array[i*MAX_SENSOR_NUM+j] = status[i*MAX_SENSOR_NUM+j];
// 						}
// 					}
// 				}
// 				setTimeout(function(){updateShowOsdCheck();}, 5000);
// 			} 
// 			catch (e) 
// 			{
// 			}
// 		}
// 	}
// }
