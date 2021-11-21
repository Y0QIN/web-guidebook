var m_iotenable = iot_device_json.iotenable;
var mChannelPlan = iot_device_json.iotradiochnpal;
//var m_channel_plan = iot_device_json.iotchannelplan;
//var m_frequency = iot_device_json.iotfrequency;
//m_frequency = parseFloat(m_frequency) + "";
//var m_spread_factor = iot_device_json.spreadfactor;
//var m_band_width = iot_device_json.iotbandwidth;
var m_install_state = iot_device_json.iotinstallstate;

//device
var m_device_name = iot_device_json.iotdevicename;
var m_device_eui = iot_device_json.iotdeviceeui;
var m_device_profile = iot_device_json.iotdeviceprofile;
var m_frame_counter_enable = iot_device_json.framecounterenable;
var m_app_key = iot_device_json.iotappkey;
var m_device_addr = iot_device_json.iotdeviceaddr;
var m_network_key = iot_device_json.iotnetworkkey;
var m_app_session_key = iot_device_json.iotappsessionkey;
var m_uplink_count = iot_device_json.iotuplinkcount;
var m_downlink_count = iot_device_json.iotdownlinkcount;
var m_device_type = iot_device_json.iotdevicetype;
var m_device_color = iot_device_json.iotdevicecolor;
var m_device_status = iot_device_json.iotdevicestatus;
var m_device_fontsize = iot_device_json.iotdevicefontsize;

//device array
var m_device_name_array = m_device_name.split(",");
var m_device_eui_array = m_device_eui.split(",");
var m_device_profile_array = m_device_profile.split(",");
var m_frame_counter_enable_array = m_frame_counter_enable.split(",");
var m_app_key_array = m_app_key.split(",");
var m_device_addr_array = m_device_addr.split(",");
var m_network_key_array = m_network_key.split(",");
var m_app_session_key_array = m_app_session_key.split(",");
var m_uplink_count_array = m_uplink_count.split(",");
var m_downlink_count_array = m_downlink_count.split(",");
var m_device_type_array = m_device_type.split(",");
var m_device_color_array = m_device_color.split(",");
var m_device_status_array = m_device_status.split(",");
var m_device_fontsize_array = m_device_fontsize.split(",");
var m_device_battery_array = ["0","0","0","0","0","0","0","0"];

var m_mainRtspPort = iot_device_json.mainrtspport;
var m_protocol = iot_device_json.rtspprotocol;
var m_macpluginsite = iot_device_json.macplugin;
var m_maxconn = iot_device_json.maxconn;
var m_currentconn = iot_device_json.curmaxconn;
var m_smartstream = iot_device_json.smartstreamswitch;
var m_subsmartstream = iot_device_json.subsmartstream;
var m_thirdsmartstream = iot_device_json.thirdsmartstream;
var m_mainCodec = GV(iot_device_json.maincodec, 0);
var mProfileNameAll = iot_device_json.iotdeviceprofilename;
var mProfileJoinTypeAll = iot_device_json.iotdeviceprofilejointype;

var mProfileNameList = mProfileNameAll.split(";");
var mProfileJoinTypeList = mProfileJoinTypeAll.split(";");
var g_cur_edit_index = -1;

var MAX_DEVICE_NUM = 8;

var statusTimer = 0;

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

window.onload = function() {
	
	ASTGUI.cookies.fe_check_cookie();
	ForbidUserViewer();
	MY_ONLOAD();
};

function MY_ONUNLOAD() {
	
	MsDisConnect();
}

function MY_ONLOAD() {
	My_Load();
	loadOBJ();
	if(Judge_Browser_Ver())//lyb add
	{
		$("#canvas").initCanvas();
		MsSetMjpegMotion(m_motionmask);
		var mjpeg = document.getElementById("mjpeg");
		var mjpeg_src = "/ipcam/mjpeg.cgi";	
		mjpeg.src = mjpeg_src;	
	}
	else	
		PlayActiveX();
}	  

function My_Load() {

	document.getElementById("iot_check").checked = (m_iotenable=="1"?true:false);
	onCheckChannelPlan();
	
	color_R = 255;
	color_G = 255;
	color_B = 255;

	checkOverMaxConn();
	updateCurConnects();

	init_device();
	enableAll(parseInt(m_iotenable));
	updateDevStatus();
	if(m_install_state == "2")
	{
		document.getElementById("iottips").style.display = "inline";
        document.getElementById("iottips").write = update_again;
	}
	onClear();
}

function updateDevStatus()
{
	var url = "/vb.htm?&paratest=iotdevicestatus&paratest=iotdevicebattery&paratest=iotdeviceSeen";
	SendHttp(url, false, updateStatus);
}

function updateStatus(g_SubmitHttp) 
{
	if (g_SubmitHttp.readyState == 4) 
	{
		if (g_SubmitHttp.status == 200) 
		{
			try 
			{
				var txt = g_SubmitHttp.responseText;
				var ix1 = txt.indexOf("OK iotdevicestatus=");
				var ix2 = txt.indexOf("OK iotdevicebattery=");
				var ix3 = txt.indexOf("OK iotdeviceSeen=");
				if (ix1 >= 0 && ix2 >= 0 && ix3 >= 0)
				{
					var status = txt.substring(ix1 + 19,ix2).split(",");
					var battery_status = txt.substring(ix2+20).split(",");
					var seenStus = txt.substring(ix3+17).split(",");
					var timeStamp = Date.parse(new Date());
					timeStamp = timeStamp / 1000;
					for(var i = 0;i < MAX_DEVICE_NUM;i++)
					{
						if(m_device_status_array[i] != status[i])
						{
							updateDevData();
						}
						m_device_status_array[i] = status[i];
						if(m_device_name_array[i] != ""){
							if(m_device_status_array[i] == "1"){
								$("#status_"+(i+1)).html(Yes);
								var timeTmp = parseInt((timeStamp - seenStus[i]) / 60);

								if(timeTmp < 1 || seenStus[i] == 0){
									timeTmp = 0;
								}
								var seenTxt;
								if(timeTmp >= 1440){
									var seenInterval = parseInt(timeTmp / 60 / 24);	//days
									if(seenInterval > 30){
										$("#status_"+(i+1)).html("-");
										$("#battery_"+(i+1)).html("-");
										$("#seen_"+(i+1)).html("-");
										m_device_status_array[i] = 0;
										continue;
									}
									else if(seenInterval > 1){
										seenTxt = seenInterval+daysAgo;
									}
									else{
										seenTxt = seenInterval+dayAgo;
									}
								}
								else if(timeTmp >= 60){
									var seenInterval = parseInt(timeTmp / 60);	//hour
									if(seenInterval > 1){
										seenTxt = seenInterval + hoursAgo;
									}
									else{
										seenTxt = seenInterval + hourAgo;
									}
								}
								else{
									if(timeTmp == 0){
										seenTxt = justNow;
									}
									else{
										if(timeTmp == 1){
											seenTxt = timeTmp + minuteAgo;
										}
										else{
											seenTxt = timeTmp + minutesAgo;
										}
									}
								}
								$("#seen_"+(i+1)).html(seenTxt);

								if(battery_status[i] == 0){
									$("#battery_"+(i+1)).html("-");
								}
								else{
									if(battery_status[i] != m_device_battery_array[i] 
										&& parseInt(battery_status[i]) <= 5)
										ShowAlert(battery_lower);
									$("#battery_"+(i+1)).html(battery_status[i]+"%");
								}
							}
							//else if(m_device_status_array[i] == "0")
							//{
							//	$("#status_"+(i+1)).html(wifi_status_disconnect);
							//	$("#battery_"+(i+1)).html("-");
							//}
							else
							{
								$("#status_"+(i+1)).html("-");
								$("#battery_"+(i+1)).html("-");
								$("#seen_"+(i+1)).html("-");
							}
						}
						m_device_battery_array[i] = battery_status[i];
					}
				}				
				statusTimer = setTimeout(function(){updateDevStatus();}, 5000);
			} 
			catch (e) 
			{
			}
		}
	}
}

function updateDevData()
{
	var url = "/vb.htm?&paratest=iotdeviceaddr&paratest=iotnetworkkey&paratest=iotappsessionkey&paratest=iotuplinkcount&paratest=iotdownlinkcount";
	SendHttp(url, false, updateData);
}

function updateData(g_SubmitHttp) 
{
	if (g_SubmitHttp.readyState == 4) 
	{
		if (g_SubmitHttp.status == 200) 
		{
			try 
			{
				var txt = g_SubmitHttp.responseText;
				var ix1 = txt.indexOf("OK iotdeviceaddr=");
				var ix2 = txt.indexOf("OK iotnetworkkey=");
				var ix3 = txt.indexOf("OK iotappsessionkey=");
				var ix4 = txt.indexOf("OK iotuplinkcount=");
				var ix5 = txt.indexOf("OK iotdownlinkcount=");	
				
				var addr = txt.substring(ix1+17,ix2);
				var network = txt.substring(ix2+17,ix3);
				var app = txt.substring(ix3+20,ix4);
				var up = txt.substring(ix4+18,ix5);
				var down = txt.substring(ix5+20);
				m_device_addr_array = addr.split(",");
				m_network_key_array = network.split(",");
				m_app_session_key_array = app.split(",");
				m_uplink_count_array = up.split(",");
				m_downlink_count_array = down.split(",");
			} 
			catch (e) 
			{
			}
		}
	}
}

function onCheckChannelPlan() {
	var selChnPlan = "";
	switch (mChannelPlan) {
		case "0":
			selChnPlan = "EU868";
			break;
		case "1":
			selChnPlan = "IN865";
			break;
		case "2":
			selChnPlan = "RU864";
			break;
		case "3":
			selChnPlan = "US915";
			break;
		case "4":
			selChnPlan = "AU915";
			break;
		case "5":
			selChnPlan = "AS923";
			break;
		case "6":
			selChnPlan = "AS923-2";
			break;
		case "7":
			selChnPlan = "KR920";
			break;
		case "8":
			selChnPlan = "CN470";
			break;
	}
	document.getElementById("channelPlan").innerHTML = selChnPlan;
}

function onCheckDeviceProfile() {
	var profileOption = document.getElementById("sel_profile");
	$("#sel_profile").find("option").remove();
	var flag = 0;
	for (var i = 0; i < mProfileNameList.length; i++) {
		if (mProfileNameList[i] != "" && mProfileNameList[i] != undefined && mProfileNameList[i] != "-1") {
			profileOption.add(new Option(mProfileNameList[i], i));
			flag = 1;
		}
	}
	if (!flag) {
		document.getElementById("sel_profile").disabled = true;
	} else {
		document.getElementById("sel_profile").value = "0";
	}
}

function enableAll(enable)
{
	var flag = false;
	if(enable)
	{
		flag = false;
	}
	else
	{
		flag = true;
	}
	document.getElementById("input_device_name").disabled = flag;
	document.getElementById("input_device_eui").disabled = flag;
	document.getElementById("sel_profile").disabled = flag;
	document.getElementById("frame_counter_check").disabled = flag;
	document.getElementById("input_application_key").disabled = flag;
	document.getElementById("input_device_address").disabled = flag;
	document.getElementById("input_network_session_key").disabled = flag;
	document.getElementById("input_application_session_key").disabled = flag;
	document.getElementById("input_uplink").disabled = flag;
	document.getElementById("input_downlink").disabled = flag;
	document.getElementById("sel_device_type").disabled = flag;
	document.getElementById("mycolor").disabled = flag;

	onCheckDeviceProfile();	
	if(enable) {
		changeProfile();
	}
}

function changeProfile()
{
	var value = document.getElementById("sel_profile").value;
	var otaa = 0;
	var num = -1;
	var i = 0;
	for (i = 0; i < mProfileJoinTypeList.length; i++) {
		if (mProfileJoinTypeList[i] != "" && mProfileJoinTypeList[i] != undefined && mProfileJoinTypeList[i] != "-1") {
			num++;
		}
		if (num == parseInt(value)) {
			break;
		}
	}

	if (document.getElementById("iot_check").checked) {
		if (mProfileJoinTypeList[i] == "1") {
			document.getElementById("input_application_key").disabled = true;
			document.getElementById("frame_counter_check").disabled = false;
			document.getElementById("input_device_address").disabled = false;
			document.getElementById("input_network_session_key").disabled = false;
			document.getElementById("input_application_session_key").disabled = false;
			document.getElementById("input_uplink").disabled = false;
			document.getElementById("input_downlink").disabled = false;
		} else {
			document.getElementById("input_application_key").disabled = false;
			document.getElementById("frame_counter_check").disabled = true;
			document.getElementById("frame_counter_check").checked = false;
			document.getElementById("input_device_address").disabled = true;
			document.getElementById("input_device_address").value = null;
			document.getElementById("input_network_session_key").disabled = true;
			document.getElementById("input_network_session_key").value = null;
			document.getElementById("input_application_session_key").disabled = true;
			document.getElementById("input_application_session_key").value = null;
			document.getElementById("input_uplink").disabled = true;
			document.getElementById("input_uplink").value = null;
			document.getElementById("input_downlink").disabled = true;
			document.getElementById("input_downlink").value = null;
		}
	}
}

function NameIsUse(name,skip_index)
{
	var row_num = $("#table_device_list").find("tr").length;
	for(var i = 1;i < row_num;i++)		//not include thead
	{
		if(i == skip_index)
			continue;
		var cur_name = $("#table_device_list").find('tr').eq(i).find('td').eq(1).html();
		if(cur_name == name)
		{
			return 1;
		}
	}
	return 0;
}

function EuiIsUse(eui,skip_index)
{
	var row_num = $("#table_device_list").find("tr").length;
	for(var i = 1;i < row_num;i++)		//not include thead
	{
		if(i == skip_index)
			continue;
		var cur_eui = $("#table_device_list").find('tr').eq(i).find('td').eq(2).html();

		if(cur_eui.toUpperCase() == eui.toUpperCase())
		{
			return 1;
		}
	}
	return 0;
}

function onSaveDevice()
{
	if(m_iotenable == "0")
		return;
	if(!ASTGUI.checkRequiredFields(['input_device_name','input_device_eui']))
		return;
	if(!ASTGUI.validateFields(['input_device_eui']))
		return;
	if (document.getElementById("sel_profile").length == 0) {
		ShowAlertView(iotDeviceProfileNote, 0);
		return;
	}
	var profile = document.getElementById("sel_profile").value;
	var chanceNum = 0;
	var num = -1;
	for (chanceNum = 0; chanceNum < mProfileJoinTypeList.length; chanceNum++) {
		if (mProfileJoinTypeList[chanceNum] != "" && mProfileJoinTypeList[chanceNum] != undefined && mProfileJoinTypeList[chanceNum] != "-1") {
			num++;
		}
		if (num == parseInt(profile)) {
			break;
		}
	}
	
	if(mProfileJoinTypeList[chanceNum] == "0") {
		if(!ASTGUI.checkRequiredFields(['input_application_key']))
			return;
		if(!ASTGUI.validateFields(['input_application_key']))
			return;
	} else {
		if(!ASTGUI.checkRequiredFields(['input_device_address','input_network_session_key','input_application_session_key']))
			return;
		if(!ASTGUI.validateFields(['input_device_address','input_network_session_key','input_application_session_key',
			'input_uplink','input_downlink']))
			return;
	}

	var row_num = $("#table_device_list").find("tr").length;
	var array_index = 0;
	if(g_cur_edit_index == -1)				//Add
	{
		if(NameIsUse(document.getElementById("input_device_name").value))
		{
			ShowTips("input_device_name", use_another_name);
			document.getElementById("input_device_name").focus();
			return;
		}
		if(EuiIsUse(document.getElementById("input_device_eui").value))
		{
			ShowTips("input_device_eui", use_another_eui);
			document.getElementById("input_device_eui").focus();
			return;
		}
		var TBL = _$('table_device_list');
		var nIndex = TBL.rows.length-1;
		if(nIndex+1 > MAX_DEVICE_NUM)
		{
			ShowAlert(nas_mount_tip);
			return;
		}

		var num_array = [0,0,0,0,0,0,0,0];
		for(var i = 1;i < row_num;i++)	//not include thead
		{
			var cur_num = $("#table_device_list").find('tr').eq(i).find('td').eq(0).html();
			cur_num = parseInt(cur_num);
			num_array[cur_num-1] = 1;
		}
		var device_no = "";
		for(var i = 0;i < MAX_DEVICE_NUM;i++)
		{
			if(num_array[i] == 0)
			{
				device_no = i + 1;
				break;
			}
		}
		var device_name = document.getElementById("input_device_name").value.trim();	
		var device_eui = document.getElementById("input_device_eui").value;
		var device_profile = document.getElementById("sel_profile").value;
		var device_type = document.getElementById("sel_device_type").value;
		insert_deviceList(TBL,device_no,device_name,device_eui,device_profile,device_type,"2");
		$("#table_device_list").show();
		array_index = device_no - 1;
	}
	else									//Edit
	{
		array_index = g_cur_edit_index - 1;
		var row_index = 0;
		for(var i = 1;i < row_num;i++)
		{
			var cur_index = $("#table_device_list").find('tr').eq(i).find('td').eq(0).html();
			cur_index = parseInt(cur_index);
			if(cur_index == g_cur_edit_index)
			{
				row_index = i;
				break;
			}
		}
		if(NameIsUse(document.getElementById("input_device_name").value,row_index))
		{
			ShowTips("input_device_name", use_another_name);
			document.getElementById("input_device_name").focus();
			return;
		}
		if(EuiIsUse(document.getElementById("input_device_eui").value,row_index))
		{
			ShowTips("input_device_eui", use_another_eui);
			document.getElementById("input_device_eui").focus();
			return;
		}

		var device_name = document.getElementById("input_device_name").value.trim();	
		var device_eui = document.getElementById("input_device_eui").value;
		var device_type = document.getElementById("sel_device_type").value;
		var td_profile = "";
		var td_type = "";

		td_profile = mProfileNameList[chanceNum];
		
		if(device_type == "0")
			td_type = lora_sensor;
		else
			td_type = lora_node;
		$("#table_device_list").find('tr').eq(row_index).find('td').eq(1).html(device_name);
		$("#table_device_list").find('tr').eq(row_index).find('td').eq(2).html(device_eui);
		$("#table_device_list").find('tr').eq(row_index).find('td').eq(3).html(td_profile);
		$("#table_device_list").find('tr').eq(row_index).find('td').eq(4).html(td_type);
	}
	m_device_name_array[array_index] = document.getElementById("input_device_name").value;
	m_device_eui_array[array_index] = document.getElementById("input_device_eui").value;
	m_device_profile_array[array_index] = document.getElementById("sel_profile").value;
	m_frame_counter_enable_array[array_index] = (document.getElementById("frame_counter_check").checked==true?"1":"0");
	m_app_key_array[array_index] = document.getElementById("input_application_key").value;
	m_device_addr_array[array_index] = document.getElementById("input_device_address").value;
	m_network_key_array[array_index] = document.getElementById("input_network_session_key").value;
	m_app_session_key_array[array_index] = document.getElementById("input_application_session_key").value;
	var input_uplink = document.getElementById("input_uplink").value.trim();
	m_uplink_count_array[array_index] = (input_uplink.length == 0)?"0":input_uplink;
	var input_downlink = document.getElementById("input_downlink").value.trim();
	m_downlink_count_array[array_index] = (input_downlink.length == 0)?"0":input_downlink;
	m_device_type_array[array_index] = document.getElementById("sel_device_type").value;
	m_device_color_array[array_index] = color_R + ":" + color_G + ":" + color_B;
	m_device_fontsize_array[array_index] = document.getElementById("osdfontsize").value;

	var url = "/vb.htm?page=iotdevice";
	url += "&index=" + array_index;
	url += "&name=" + encodeURI(m_device_name_array[array_index]);
	url += "&eui=" + m_device_eui_array[array_index];
	url += "&profile=" + m_device_profile_array[array_index];
	url += "&framecounter=" + m_frame_counter_enable_array[array_index];
	url += "&appkey=" + m_app_key_array[array_index];

	url += "&address=" + m_device_addr_array[array_index];
	url += "&netsessionkey=" + m_network_key_array[array_index];
	url += "&appsessionkey=" + m_app_session_key_array[array_index];
	url += "&uplink=" + m_uplink_count_array[array_index];
	url += "&downlink=" + m_downlink_count_array[array_index];
	url += "&type=" + m_device_type_array[array_index];
	url += "&fontsize=" + m_device_fontsize_array[array_index];
	url += "&colorr=" + color_R;
	url += "&colorg=" + color_G;
	url += "&colorb=" + color_B;
	SendHttp(url, false, OnSendHttp);
	onClear();
	setTimeout("updateDevData()",5000);
	clearTimeout(statusTimer);
	statusTimer = setTimeout("updateDevStatus()",3000);
}

function insert_deviceList(TBLUC, num, name, eui, profile, type, status)
{
	var index = 0;
	var i = 0;
	var profileNum = -1;
	var newRow = TBLUC.insertRow(-1);
	newRow.vAlign = "middle";		
	var addCell = ASTGUI.domActions.tr_addCell;
	newRow.className = ((TBLUC.rows.length)%2==1)?'odd':'even';

	addCell( newRow , { html: num,align:"center" } );
	addCell( newRow , { html: name,align:"center" } );
	addCell( newRow , { html: eui,align:"center" } );

	for (i = 0; i < mProfileNameList.length; i++) {
		if (mProfileNameList[i] != "-1") {
			profileNum++;
		}
		if (profileNum == parseInt(profile)) {
			break;
		}
	}
	var tdProfile = "<span id='devProfile_"+num + "'>" + mProfileNameList[i] +"</span>";
	addCell( newRow , { html: tdProfile, align:"center" } );
	if (profileNum == -1) {
		$("#devProfile_"+num).html("-");
	}

	if(type == "0") {
		addCell( newRow , { html: lora_sensor,align:"center" } );
	} else {
		addCell( newRow , { html: lora_node,align:"center" } );
	}
	
	var td_battery = "<span id='battery_"+ num + "'></span>";
	addCell( newRow , { html: td_battery,align:"center"} );

	var tdSeen = "<span id='seen_"+ num + "'></span>";
	addCell( newRow , { html: tdSeen,align:"center"} );

	var td_status = "";
	if(status == "1")
		td_status = "<span id='status_"+num + "'>" + Yes +"</span>";
//	else if(status == "0")
//		td_status = "<span id='status_"+num + "'>" + wifi_status_disconnect +"</span>";
	else
		td_status = "<span id='status_"+num + "'>" + "-" +"</span>";
	
	addCell( newRow , { html: td_status,align:"center"} );

	var sensor = "<a class='button' style='margin:1px;' href='javascript:SetSensor(" + num + ")'>"+ lang_sensor +"</a>";
	addCell(newRow, {html: sensor,align: "center"});
	
	var sEdit = "<a class='guiButtonModify' href='javascript:onEdit(" + num + ");' id='deviceListEdit_"+num+"'><img style=' border:0px;' src='/image/hammer_screwdriver.png' alt='"+Edit+"' /></a>";
	addCell(newRow, {html: sEdit,align: "center"});

	var sRemove = "<a class='guiButtonDelete' href='javascript:onDel(" + num + ");' id='deviceListDel_"+num+"'><img style=' border:0px;' src='/image/cross.png' alt='"+Delete+"' /></a>";
	addCell(newRow, {html: sRemove,align: "center"});
}

function init_device()
{
	var TBL = _$('table_device_list');
		
	var newRow = TBL.insertRow(-1);
	var addCell = ASTGUI.domActions.tr_addCell;
	newRow.className = "frow";
	addCell( newRow , { html:device_id,align:"center"} );
	addCell( newRow , { html:device_name,align:"center"} );
	addCell( newRow , { html:device_eui,align:"center"} );
	addCell( newRow,  { html:device_profile,align:"center"});
	addCell( newRow,  { html:device_type,align:"center"});
	addCell( newRow,  { html:battery,align:"center"});
//	addCell( newRow,  { html:ms_status,align:"center"});

	addCell( newRow,  { html:lastSeen,align:"center"});
	addCell( newRow,  { html:activation,align:"center"});

	addCell( newRow,  { html:lang_sensor,align:"center"});
	addCell( newRow , { html:Edit,align:"center"});	
	addCell( newRow , { html:Delete,align:"center"});
	$("#table_device_list").hide();

	for(var i = 0;i < MAX_DEVICE_NUM;i++)
	{
		if(m_device_name_array[i] != "")
		{
			$("#table_device_list").show();
			insert_deviceList(TBL,i+1,m_device_name_array[i],m_device_eui_array[i],m_device_profile_array[i],m_device_type_array[i],"0");
		}
	}
}

function get_row_index(num)
{
	var row_num = $("#table_device_list").find("tr").length;
	for(var i = 1;i < row_num;i++)		//not include thead
	{
		var cur_num = $("#table_device_list").find('tr').eq(i).find('td').eq(0).html();
		cur_num = parseInt(cur_num);
		if(cur_num == num)
		{
			return i;
		}
	}
	return -1;
}

function onEdit(num){

	if(m_iotenable == "0")
		return;
	if(num < 1 || num > MAX_DEVICE_NUM)
		return;
	$("#btnclear").show();
	$("#btnsave").show();
	var index = num - 1;
	document.getElementById("input_device_name").value = m_device_name_array[index];
	document.getElementById("input_device_eui").value = m_device_eui_array[index];
	document.getElementById("input_device_eui").disabled = true;
	document.getElementById("sel_profile").value = m_device_profile_array[index];
	document.getElementById("frame_counter_check").checked = (m_frame_counter_enable_array[index]=="1"?true:false);
	document.getElementById("input_application_key").value = m_app_key_array[index];
	document.getElementById("input_device_address").value = m_device_addr_array[index];
	document.getElementById("input_network_session_key").value = m_network_key_array[index];
	document.getElementById("input_application_session_key").value = m_app_session_key_array[index];
	document.getElementById("input_uplink").value = m_uplink_count_array[index];
	document.getElementById("input_downlink").value = m_downlink_count_array[index];
	document.getElementById("sel_device_type").value = m_device_type_array[index];
	document.getElementById("osdfontsize").value = m_device_fontsize_array[index];
	
	changeProfile();
	var color = m_device_color_array[index].split(":");
	var fontcolor = "rgb(" + color[0] + "," + color[1] + "," + color[2] +")";
	$("#mycolor").css("backgroundColor", fontcolor);
	color_R = color[0];
	color_G = color[1];
	color_B = color[2];

	g_cur_edit_index = num;
}

function onDel(num)
{
	ShowConfirm(del_device_tips+"<br>"+restart_after_long_wait, function()
	{
		var row_index = get_row_index(num);
		var id = $("#table_device_list").find('tr').eq(row_index).find('td').eq(0).html();
		if(parseInt(id) == g_cur_edit_index)	//editing
			g_cur_edit_index = -1;
		id = parseInt(id) - 1;
		$("#table_device_list").find('tr').eq(row_index).remove();
		var row_num = $("#table_device_list").find("tr").length;
		if(row_num <= 1)
			$("#table_device_list").hide();
		
		var url = "/vb.htm?deliotdevice="+id;
		SendHttp(url, false, OnSendHttp);
	});
}

function onClear()
{
	document.getElementById("input_device_name").value = "";
	document.getElementById("input_device_eui").value = "";
	if(parseInt(m_iotenable)){
		document.getElementById("input_device_eui").disabled=false;
	}
	document.getElementById("frame_counter_check").value = false;
	document.getElementById("frame_counter_check").checked = false;
	document.getElementById("input_application_key").value = "5572404c696e6b4c6f52613230313823";
	document.getElementById("input_device_address").value = "";
	document.getElementById("input_network_session_key").value = "";
	document.getElementById("input_application_session_key").value = "";
	document.getElementById("input_uplink").value = "";
	document.getElementById("input_downlink").value = "";
	document.getElementById("sel_device_type").value = "0";
	document.getElementById("osdfontsize").value = "1";
	$("#mycolor").css("background-color","rgb(255,255,255)");
	color_R = 255;
	color_G = 255;
	color_B = 255;
	g_cur_edit_index = -1;
	$("#btnclear").hide();
	changeProfile();
}

function SetSensor(index)
{
	if(m_iotenable == "0")
		return;
	if(m_device_status_array[index-1] != "1")
		return;
	if(m_device_type_array[index-1] == "1")
		windowObj.ShowIFrame("/iot_sensor.html?devIndex="+(index-1), 850, 450);
	else
		windowObj.ShowIFrame("/iot_sensor.html?devIndex="+(index-1), 650, 350);
}

function onEditRadios()
{
	windowObj.showIFrameScaleSize(radiosSettingsTitle, "/radios-settings.html", 760, 850);
}

function onEditDeviceProfile()
{
	windowObj.showIFrameScaleSize(profilesSettingsTitle, "/device-profile.html", 760, 600);
}

function on_enable_iot()
{
	var enable = document.getElementById("iot_check").checked==true?"1":"0";
	var url = "/vb.htm?page=iotsettings";
	url += "&iotenable=" + enable;
	SendHttp(url, false,OnSendHttp,OnRefresh);
}

function updateProfileStus(auCurIndex) {
	var i = 0;
	for (i = 0; i < m_device_profile_array.length; i++) {
		if(m_device_profile_array[i] == auCurIndex) {
			$("#devProfile_"+(i+1)).html(mProfileNameList[auCurIndex]);
		}
	}
}

function updateProfileList() {
	var profileOption = document.getElementById("sel_profile");
	$("#sel_profile").find("option").remove();
	var flag = 0;
	for (var i = 0; i < mProfileNameList.length; i++) {
		if (mProfileNameList[i] != "" && mProfileNameList[i] != undefined && mProfileNameList[i] != "-1") {
			profileOption.add(new Option(mProfileNameList[i], i));
			flag = 1;
		}
	}
	if (!flag) {
		document.getElementById("sel_profile").disabled = true;
	} else {
		document.getElementById("sel_profile").value = "0";
	}

	if(parseInt(m_iotenable)) {
		document.getElementById("sel_profile").disabled = false;
	}
}

function radios_callback(channelPlanType) {
	channelPlan = channelPlanType;
	document.getElementById("channelPlan").innerHTML = channelPlan;
}

function profile_callback(auProfileList,profileDelete,auJoinType,auCurIndex) {
	var i = 0
	auCurIndex = parseInt(auCurIndex);
	if(profileDelete != -1) {
		mProfileNameList[profileDelete] = -1;
	} else {
		for (i = 0; i < auProfileList.length; i++) {
			mProfileNameList[i] = auProfileList[i];
		}
		mProfileJoinTypeList[auCurIndex] = auJoinType;
		updateProfileStus(auCurIndex);
	}
	updateProfileList();
	changeProfile();
}

function OnRefresh(){
	window.location.href = "iot_device.html";
}

