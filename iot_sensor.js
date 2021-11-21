
var iot_unit = ["℃", "%RH","μg/m³","cm","m","m/s","km/h","kg","g","mv/g","bar","KPa","MPa"];
var devIndex = parseInt(getQueryString("devIndex"));

var MAX_SENSOR_NUM = 24;

var m_cur_chn_index = 0;


var DEV_LORA_SENSOR = "0";
var DEV_LORA_NODE = "1";
var PORT_NONE = "0";
var PORT_RS485 = "1";
var PORT_GPIO = "2";
var PORT_AI = "3";

var g_cur_edit_index = -1;

var m_device_lora_type_list = iot_sensor_json.iotdevicetype;
var m_device_lora_type = m_device_lora_type_list.split(",");

var m_device_sensortype_list = new Array(iot_sensor_json["iotdevsensortype.0"],iot_sensor_json["iotdevsensortype.1"],iot_sensor_json["iotdevsensortype.2"],iot_sensor_json["iotdevsensortype.3"],iot_sensor_json["iotdevsensortype.4"],
	iot_sensor_json["iotdevsensortype.5"],iot_sensor_json["iotdevsensortype.6"],iot_sensor_json["iotdevsensortype.7"]);
var m_device_sensorname_list = new Array(iot_sensor_json["iotdevsensorname.0"],iot_sensor_json["iotdevsensorname.1"],iot_sensor_json["iotdevsensorname.2"],iot_sensor_json["iotdevsensorname.3"],iot_sensor_json["iotdevsensorname.4"],
	iot_sensor_json["iotdevsensorname.5"],iot_sensor_json["iotdevsensorname.6"],iot_sensor_json["iotdevsensorname.7"]);
var m_device_decimal_list = new Array(iot_sensor_json["iotdevdecimal.0"],iot_sensor_json["iotdevdecimal.1"],iot_sensor_json["iotdevdecimal.2"],iot_sensor_json["iotdevdecimal.3"],iot_sensor_json["iotdevdecimal.4"],
	iot_sensor_json["iotdevdecimal.5"],iot_sensor_json["iotdevdecimal.6"],iot_sensor_json["iotdevdecimal.7"]);
var m_device_unit_list = new Array(iot_sensor_json["iotdevunit.0"],iot_sensor_json["iotdevunit.1"],iot_sensor_json["iotdevunit.2"],iot_sensor_json["iotdevunit.3"],iot_sensor_json["iotdevunit.4"],
	iot_sensor_json["iotdevunit.5"],iot_sensor_json["iotdevunit.6"],iot_sensor_json["iotdevunit.7"]);
var m_device_showosd_list = new Array(iot_sensor_json["iotdevshowosd.0"],iot_sensor_json["iotdevshowosd.1"],iot_sensor_json["iotdevshowosd.2"],iot_sensor_json["iotdevshowosd.3"],iot_sensor_json["iotdevshowosd.4"],
	iot_sensor_json["iotdevshowosd.5"],iot_sensor_json["iotdevshowosd.6"],iot_sensor_json["iotdevshowosd.7"]);
var m_device_sign_list = new Array(iot_sensor_json["iotdevsign.0"],iot_sensor_json["iotdevsign.1"],iot_sensor_json["iotdevsign.2"],iot_sensor_json["iotdevsign.3"],iot_sensor_json["iotdevsign.4"],
	iot_sensor_json["iotdevsign.5"],iot_sensor_json["iotdevsign.6"],iot_sensor_json["iotdevsign.7"]);
var m_device_port_type_list = new Array(iot_sensor_json["iotdevporttype.0"],iot_sensor_json["iotdevporttype.1"],iot_sensor_json["iotdevporttype.2"],iot_sensor_json["iotdevporttype.3"],iot_sensor_json["iotdevporttype.4"],
	iot_sensor_json["iotdevporttype.5"],iot_sensor_json["iotdevporttype.6"],iot_sensor_json["iotdevporttype.7"]);
var m_device_osh_list = new Array(iot_sensor_json["iotdevosh.0"],iot_sensor_json["iotdevosh.1"],iot_sensor_json["iotdevosh.2"],iot_sensor_json["iotdevosh.3"],iot_sensor_json["iotdevosh.4"],
	iot_sensor_json["iotdevosh.5"],iot_sensor_json["iotdevosh.6"],iot_sensor_json["iotdevosh.7"]);
var m_device_osl_list = new Array(iot_sensor_json["iotdevosl.0"],iot_sensor_json["iotdevosl.1"],iot_sensor_json["iotdevosl.2"],iot_sensor_json["iotdevosl.3"],iot_sensor_json["iotdevosl.4"],
	iot_sensor_json["iotdevosl.5"],iot_sensor_json["iotdevosl.6"],iot_sensor_json["iotdevosl.7"]);
var m_device_chn_list = new Array(iot_sensor_json["iotdevchn.0"],iot_sensor_json["iotdevchn.1"],iot_sensor_json["iotdevchn.2"],iot_sensor_json["iotdevchn.3"],iot_sensor_json["iotdevchn.4"],
	iot_sensor_json["iotdevchn.5"],iot_sensor_json["iotdevchn.6"],iot_sensor_json["iotdevchn.7"]);

var m_sensor_type_array = m_device_sensortype_list[devIndex].split(";");
var m_sensor_name_array = m_device_sensorname_list[devIndex].split("/,;");
var m_decimal_array = m_device_decimal_list[devIndex].split(";");
var m_sign_array = m_device_sign_list[devIndex].split(";");
var m_unit_array = m_device_unit_list[devIndex].split("/,;");
var m_show_osd_array = m_device_showosd_list[devIndex].split(";");
var m_sign_array = m_device_sign_list[devIndex].split(";");
var m_port_type_array = m_device_port_type_list[devIndex].split(";");
var m_osh_array = m_device_osh_list[devIndex].split(";");
var m_osl_array = m_device_osl_list[devIndex].split(";");
var m_chn_array = m_device_chn_list[devIndex].split(";");

window.onload = function()
{
	ASTGUI.cookies.fe_check_cookie();
	ForbidUserViewer();		

	My_Load();
};

function init_ui(lora_type)
{
	if(lora_type == DEV_LORA_SENSOR)
	{
		$("#tr_sensor_id").show();
		$("#tr_port_type").hide();
		$("#tr_rs485_id").hide();
		$("#tr_gpio_id").hide();
		$("#tr_ai_id").hide();
		$("#tr_sensor_type").show();
		$("#tr_sign").show();
		$("#tr_decimal_place").show();
		$("#tr_osh").hide();
		$("#tr_osl").hide();
		$("#tr_unit").show();
		$("#tr_show_osd").show();
		changeSensorId();
	}
	else
	{
		$("#tr_sensor_id").hide();
		changePortType();
		init_sensor_list();
		getUnuseChannel();
	}
}

function changeSensorId()
{
	var index = parseInt(document.getElementById("sel_sensor_id").value);
	document.getElementById("sel_sensor_type").value = m_sensor_type_array[index];
	document.getElementById("input_sensor_type").value = m_sensor_name_array[index];
	changeSensorType();
	init_show_unit(m_unit_array[index]);
	document.getElementById("check_sign").checked = m_sign_array[index]=="1"?true:false;
	document.getElementById("input_decimal_place").value = m_decimal_array[index];
	document.getElementById("check_showosd").checked = m_show_osd_array[index]=="1"?true:false;
	setMsTableStyle();
}

function changePortType(setRecommendChannel)
{
	var value = document.getElementById("sel_port_type").value;
	$("#tr_port_type").show();	
	$("#tr_sensor_type").show();
	$("#tr_show_osd").show();
	if(value == PORT_RS485)	//RS485
	{
		$("#tr_sign").show();
		$("#tr_decimal_place").show();
		$("#tr_osh").hide();
		$("#tr_osl").hide();
		$("#tr_unit").show();
		$("#tr_rs485_id").show();
		$("#tr_gpio_id").hide();
		$("#tr_ai_id").hide();
		changeUnit();
	}
	else if(value == PORT_GPIO)
	{
		$("#tr_sign").hide();
		$("#tr_decimal_place").hide();
		$("#tr_osh").hide();
		$("#tr_osl").hide();
		$("#tr_unit").hide();
		$("#tr_unit_other").hide();
		$("#tr_rs485_id").hide();
		$("#tr_gpio_id").show();
		$("#tr_ai_id").hide();
	}
	else if(value == PORT_AI)
	{
		$("#tr_sign").hide();
		$("#tr_decimal_place").hide();
		$("#tr_osh").show();
		$("#tr_osl").show();
		$("#tr_unit").show();
		$("#tr_rs485_id").hide();
		$("#tr_gpio_id").hide();
		$("#tr_ai_id").show();
		changeUnit();
	}
	changeSensorType();	
	if(setRecommendChannel == "1")
		getUnuseChannel();
	setMsTableStyle();
}

function My_Load()
{
	init_ui(m_device_lora_type[devIndex]);
}

function changeSensorType()
{
	var value = document.getElementById("sel_sensor_type").value;
	if(value == "-1")
	{
		$("#tr_sensor_type_other").show();
	}
	else
	{
		$("#tr_sensor_type_other").hide();
	}
	setMsTableStyle();
}

function changeUnit()
{
	var value = document.getElementById("sel_unit").value;
	if(value == "-1")
	{
		$("#tr_unit_other").show();
	}
	else
	{
		$("#tr_unit_other").hide();
	}
	setMsTableStyle();
}

function modify_sensorList(num,port_type, sensor_name,row_index)
{
	var port_name = "";
	if(port_type == PORT_RS485)
	{
		port_name = "RS485";
		channel_id = num;
	}
	else if(port_type == PORT_GPIO)
	{
		port_name = "GPIO";
		channel_id = "GPIO " + num;
	}
	else
	{
		port_name = "AI";
		channel_id = "AI " + num;
	}
	$("#table_sensor_list").find('tr').eq(row_index).find('td').eq(1).html(port_name);
	$("#table_sensor_list").find('tr').eq(row_index).find('td').eq(2).html(channel_id);
	$("#table_sensor_list").find('tr').eq(row_index).find('td').eq(3).html(sensor_name);
}

function get_unuse_sensorList_index()
{
	var index_array = new Array(MAX_SENSOR_NUM);
	for(var i = 0;i < MAX_SENSOR_NUM;i++)
		index_array[i] = 0;
	var row_num = $("#table_sensor_list").find("tr").length;
	for(var i = 1;i < row_num;i++)		//not include thead
	{
		var cur_no = $("#table_sensor_list").find('tr').eq(i).find('td').eq(0).html();
		index_array[parseInt(cur_no)-1] = 1;
	}
	for(var i = 0;i < MAX_SENSOR_NUM;i++)
	{
		if(index_array[i] != 1)
			return i + 1;
	}
}

function insert_sensorList(TBL,index,channel_id,port_type, sensor_name)
{
	var newRow = TBL.insertRow(-1);
	newRow.vAlign = "middle";		
	var addCell = ASTGUI.domActions.tr_addCell;
	newRow.className = ((TBL.rows.length)%2==1)?'odd':'even';	

	addCell( newRow , { html: index,align:"center" } );
	if(port_type == PORT_RS485)
	{
		addCell( newRow , { html: "RS485",align:"center" } );
		channel_id = channel_id;
	}
	else if(port_type == PORT_GPIO)
	{
		addCell( newRow , { html: "GPIO",align:"center" } );
		channel_id = "GPIO " + channel_id;
	}
	else
	{
		addCell( newRow , { html: "AI",align:"center" } );
		channel_id = "AI " + channel_id;
	}
	addCell( newRow , { html: channel_id,align:"center" } );
	addCell( newRow , { html: sensor_name,align:"center" } );

	var sEdit = "<a class='guiButtonModify' href='javascript:onEdit(" + index + ");' id='sensorListEdit_"+index+"'><img style=' border:0px;' src='/image/hammer_screwdriver.png' alt='"+Edit+"' /></a>";
	addCell(newRow, {html: sEdit,align: "center"});

	var sRemove = "<a class='guiButtonDelete' href='javascript:onDel(" + index + ");' id='sensorListDel_"+index+"'><img style=' border:0px;' src='/image/cross.png' alt='"+Delete+"' /></a>";
	addCell(newRow, {html: sRemove,align: "center"});
}

function ChannelIsUse(channel,skip_index,type)
{
	var row_num = $("#table_sensor_list").find("tr").length;
	var using_channel = "";
	if(type == PORT_RS485)
		using_channel = channel + "";
	else if(type == PORT_GPIO)
		using_channel = "GPIO " + channel;
	else if(type == PORT_AI)
		using_channel = "AI " + channel;
	for(var i = 1;i < row_num;i++)		//not include thead
	{
		var cur_no = $("#table_sensor_list").find('tr').eq(i).find('td').eq(0).html();
		if(cur_no == skip_index)
			continue;
		var cur_chn = $("#table_sensor_list").find('tr').eq(i).find('td').eq(2).html();		
		if(cur_chn == using_channel)
		{
			return 1;
		}
	}
	return 0;
}

function onSave()
{
	if(m_device_lora_type[devIndex] == DEV_LORA_SENSOR)
	{
		if(document.getElementById("input_decimal_place").value.trim().length != 0)
		{
			if(!ASTGUI.checkRequiredFields(['input_decimal_place']))
				return;
			if(!ASTGUI.validateFields(['input_decimal_place']))
				return;
		}
		var index = parseInt(document.getElementById("sel_sensor_id").value);
		var url = "/vb.htm?page=iotsensor";
		m_sensor_type_array[index] = document.getElementById("sel_sensor_type").value;
		m_sensor_name_array[index] = (document.getElementById("sel_sensor_type").value != "-1")?"":document.getElementById("input_sensor_type").value;
		m_sign_array[index] = document.getElementById("check_sign").checked==true?"1":"0";
		m_decimal_array[index] = document.getElementById("input_decimal_place").value.trim();
		if(document.getElementById("sel_unit").value != "-1")
			m_unit_array[index] = document.getElementById("sel_unit").value;
		else
			m_unit_array[index] = document.getElementById("input_unit").value.trim();
		m_show_osd_array[index] = document.getElementById("check_showosd").checked==true?"1":"0";
		url += "&index=" + index;
		url += "&sensortype=" + m_sensor_type_array[index];
		url += "&sensorname=" + encodeURIComponent(m_sensor_name_array[index]);
		url += "&sign=" + m_sign_array[index];
		url += "&decimal=" + (m_decimal_array[index] == ""?"0":m_decimal_array[index]);
		url += "&unit=" +  encodeURIComponent(m_unit_array[index]);
		url += "&showosd=" + m_show_osd_array[index];
		url += "&deviceindex=" + devIndex;
		url += "&porttype=" + m_port_type_array[index];
		url += "&channelid=" + index;
		SendHttp(url, false,function(g_SubmitHttp){
			if (g_SubmitHttp.readyState == 4)
		  	{
		    	if (g_SubmitHttp.status == 200)
		    	{
					ShowMessageView_by_IFrame(general_savetips);
		    	}
		    }	
		});
	}
	else
	{
		var port_type = document.getElementById("sel_port_type").value;
		var sensor_name = get_sensor_name(parseInt(document.getElementById("sel_sensor_type").value));
		if(sensor_name == "")
			sensor_name = document.getElementById("input_sensor_type").value.trim();
		var channel_id = "";
		var index = 0;
		if(g_cur_edit_index == -1)		//add
		{
			index = get_unuse_sensorList_index() - 1;
			var TBL = _$('table_sensor_list');
			var nIndex = TBL.rows.length-1;
			if(nIndex+1 > MAX_SENSOR_NUM)
			{
				ShowAlert(nas_mount_tip);
				return;
			}
		}
		else							//edit
			index = g_cur_edit_index - 1;

		var url = "/vb.htm?page=iotsensor";

		if(port_type == PORT_RS485)
		{
			if(document.getElementById("input_decimal_place").value.trim().length != 0)
			{
				if(!ASTGUI.checkRequiredFields(['input_decimal_place']))
					return;
				if(!ASTGUI.validateFields(['input_decimal_place']))
					return;
			}
			channel_id = parseInt(document.getElementById("sel_rs485_id").value) + 1;
			if(ChannelIsUse(channel_id + "",g_cur_edit_index,port_type))
			{
				ASTGUI.highlightField(_$("sel_rs485_id"), channel_repeat);
				return;
			}
			m_sensor_type_array[index] = document.getElementById("sel_sensor_type").value;
			m_sensor_name_array[index] = (document.getElementById("sel_sensor_type").value != "-1")?"":document.getElementById("input_sensor_type").value;
			m_sign_array[index] = document.getElementById("check_sign").checked==true?"1":"0";
			m_decimal_array[index] = document.getElementById("input_decimal_place").value.trim();
			if(document.getElementById("sel_unit").value != "-1")
				m_unit_array[index] = document.getElementById("sel_unit").value;
			else
				m_unit_array[index] = document.getElementById("input_unit").value.trim();
			m_show_osd_array[index] = document.getElementById("check_showosd").checked==true?"1":"0";
			m_chn_array[index] = document.getElementById("sel_rs485_id").value;
			url += "&index=" + index;
			url += "&sensortype=" + m_sensor_type_array[index];
			url += "&sensorname=" + encodeURIComponent(m_sensor_name_array[index]);
			url += "&sign=" + m_sign_array[index];
			url += "&decimal=" + (m_decimal_array[index] == ""?"0":m_decimal_array[index]);
			url += "&unit=" +  encodeURIComponent(m_unit_array[index]);
			url += "&showosd=" + m_show_osd_array[index];
			url += "&channelid=" + m_chn_array[index];
		}
		else if(port_type == PORT_GPIO)
		{
			channel_id = parseInt(document.getElementById("sel_gpio_id").value) + 1;
			if(ChannelIsUse(channel_id + "",g_cur_edit_index,port_type))
			{
				ASTGUI.highlightField(_$("sel_gpio_id"), channel_repeat);
				return;
			}
			m_sensor_type_array[index] = document.getElementById("sel_sensor_type").value;
			m_sensor_name_array[index] = (document.getElementById("sel_sensor_type").value != "-1")?"":document.getElementById("input_sensor_type").value;
			m_show_osd_array[index] = document.getElementById("check_showosd").checked==true?"1":"0";
			m_chn_array[index] = document.getElementById("sel_gpio_id").value;
			url += "&index=" + index;
			url += "&sensortype=" + m_sensor_type_array[index];
			url += "&sensorname=" + m_sensor_name_array[index];
			url += "&showosd=" + m_show_osd_array[index];
			url += "&channelid=" + m_chn_array[index];
		}
		else if(port_type == PORT_AI)
		{
			if(!ASTGUI.checkRequiredFields(['input_osh','input_osl']))
				return;
			if(!ASTGUI.validateFields(['input_osh','input_osl']))
				return;
			channel_id = parseInt(document.getElementById("sel_ai_id").value) + 1;
			if(ChannelIsUse(channel_id + "",g_cur_edit_index,port_type))
			{
				ASTGUI.highlightField(_$("sel_ai_id"), channel_repeat);
				return;
			}
			var osh = document.getElementById("input_osh").value;
			var osl = document.getElementById("input_osl").value;
			if(parseInt(osh) < parseInt(osl))
			{
				ASTGUI.highlightField(_$("input_osl"), osl_tips);
				return;
			}
			m_sensor_type_array[index] = document.getElementById("sel_sensor_type").value;
			m_sensor_name_array[index] = (document.getElementById("sel_sensor_type").value != "-1")?"":document.getElementById("input_sensor_type").value;
			m_osh_array[index] = document.getElementById("input_osh").value;
			m_osl_array[index] = document.getElementById("input_osl").value;
			if(document.getElementById("sel_unit").value != "-1")
				m_unit_array[index] = document.getElementById("sel_unit").value;
			else
				m_unit_array[index] = document.getElementById("input_unit").value.trim();
			m_show_osd_array[index] = document.getElementById("check_showosd").checked==true?"1":"0";
			m_chn_array[index] = document.getElementById("sel_ai_id").value;
			url += "&index=" + index;
			url += "&sensortype=" + m_sensor_type_array[index];
			url += "&sensorname=" + encodeURIComponent(m_sensor_name_array[index]);
			url += "&osh=" + m_osh_array[index];
			url += "&osl=" + m_osl_array[index];
			url += "&unit=" + encodeURIComponent(m_unit_array[index]);
			url += "&showosd=" + m_show_osd_array[index];
			url += "&channelid=" + m_chn_array[index];
		}
		m_port_type_array[index] = document.getElementById("sel_port_type").value;
		var TBL = _$('table_sensor_list');
		if(g_cur_edit_index == -1)			//Add
		{
			var tr_index = get_unuse_sensorList_index();
			insert_sensorList(TBL,tr_index,channel_id,port_type,sensor_name);
			$("#table_sensor_list").show();
		}
		else								//Edit
		{
			var row_index = 0;
			var row_num = $("#table_sensor_list").find("tr").length;
			for(var i = 1;i < row_num;i++)
			{
				var cur_index = $("#table_sensor_list").find('tr').eq(i).find('td').eq(0).html();
				cur_index = parseInt(cur_index);
				if(cur_index == g_cur_edit_index)
				{
					row_index = i;
				}
			}
			modify_sensorList(channel_id,port_type,sensor_name,row_index);
		}

		url += "&porttype=" + m_port_type_array[index];
		url += "&deviceindex=" + devIndex;
		SendHttp(url, false,function(g_SubmitHttp){
			if (g_SubmitHttp.readyState == 4)
		  	{
		    	if (g_SubmitHttp.status == 200)
		    	{
					ShowMessageView_by_IFrame(general_savetips);
		    	}
		    }	
		});
		reinit_ui();
		getUnuseChannel();
	}
}

function reinit_ui()
{
	document.getElementById("sel_sensor_type").value = "0";
	document.getElementById("input_sensor_type").value = "";
	document.getElementById("check_sign").checked = false;
	document.getElementById("input_decimal_place").value = "";
	document.getElementById("sel_unit").value = "℃";
	document.getElementById("input_unit").value = "";
	document.getElementById("check_showosd").checked = false;
	document.getElementById("input_osh").value = "20";
	document.getElementById("input_osl").value = "4";
	changeUnit();
	changeSensorType();
	g_cur_edit_index = -1;
}

function onCancel()
{
	windowObj.layer.closeAll();
}

function init_sensor_list()
{
	var TBL = _$('table_sensor_list');
		
	var newRow = TBL.insertRow(-1);
	var addCell = ASTGUI.domActions.tr_addCell;
	newRow.className = "frow";
	addCell( newRow , { html:"No",align:"center"} );
	addCell( newRow , { html:lang_port_type,align:"center"} );
	addCell( newRow , { html:lang_channel_id,align:"center"} );
	addCell( newRow,  { html:sensor_type,align:"center"});
	addCell( newRow , { html:Edit,align:"center"});	
	addCell( newRow , { html:Delete,align:"center"});
	$("#table_sensor_list").hide();

	for(var i = 0;i < MAX_SENSOR_NUM;i++)
	{
		if(m_port_type_array[i] != "0")
		{
			$("#table_sensor_list").show();
			var sensor_name = get_sensor_name(parseInt(m_sensor_type_array[i]));
			if(sensor_name == "")
				sensor_name = m_sensor_name_array[i];
			insert_sensorList(TBL,i+1,parseInt(m_chn_array[i])+1,m_port_type_array[i],sensor_name);
		}
	}
}

function init_show_unit(unit)
{
	var i = 0;
	for(i = 0;i < iot_unit.length;i++)
	{
		if(unit == iot_unit[i])
		{
			document.getElementById("sel_unit").value = unit;
			document.getElementById("input_unit").value = "";
			break;
		}
	}
	if(i == iot_unit.length)
	{
		document.getElementById("sel_unit").value = "-1";
		document.getElementById("input_unit").value = unit;
	}
	changeUnit();
}

function onEdit(num){

	var index = num - 1;
	var port_type = m_port_type_array[index];
	if(port_type == PORT_RS485)
	{
		document.getElementById("sel_sensor_type").value = m_sensor_type_array[index];
		document.getElementById("input_sensor_type").value = m_sensor_name_array[index];
		document.getElementById("check_sign").checked = m_sign_array[index]=="1"?true:false;
		document.getElementById("input_decimal_place").value = m_decimal_array[index];
		init_show_unit(m_unit_array[index]);
		document.getElementById("check_showosd").checked = m_show_osd_array[index]=="1"?true:false;
		document.getElementById("sel_rs485_id").value = m_chn_array[index];
		
	}
	else if(port_type == PORT_GPIO)
	{
		document.getElementById("sel_sensor_type").value = m_sensor_type_array[index];
		document.getElementById("input_sensor_type").value = m_sensor_name_array[index];
		document.getElementById("check_showosd").checked = m_show_osd_array[index]=="1"?true:false;
		document.getElementById("sel_gpio_id").value = m_chn_array[index];
	}
	else
	{
		document.getElementById("sel_sensor_type").value = m_sensor_type_array[index];
		document.getElementById("input_sensor_type").value = m_sensor_name_array[index];
		document.getElementById("input_osh").value = m_osh_array[index];
		document.getElementById("input_osl").value = m_osl_array[index];
		init_show_unit(m_unit_array[index]);
		document.getElementById("check_showosd").checked = m_show_osd_array[index]=="1"?true:false;
		document.getElementById("sel_ai_id").value = m_chn_array[index];
	}
	document.getElementById("sel_port_type").value = port_type;
	changePortType();

	g_cur_edit_index = num;
}

function get_row_index(num)
{
	var row_num = $("#table_sensor_list").find("tr").length;
	for(var i = 1;i < row_num;i++)		//not include thead
	{
		var cur_num = $("#table_sensor_list").find('tr').eq(i).find('td').eq(0).html();
		cur_num = parseInt(cur_num);
		if(cur_num == num)
		{
			return i;
		}
	}
	return -1;
}

function onDel(num)
{
	ShowConfirm(del_device_tips, function()
	{
		var row_index = get_row_index(num);
		var id = $("#table_sensor_list").find('tr').eq(row_index).find('td').eq(0).html();
		if(parseInt(id) == g_cur_edit_index)	//editing
			g_cur_edit_index = -1;
		id = parseInt(id) - 1;
		$("#table_sensor_list").find('tr').eq(row_index).remove();
		var row_num = $("#table_sensor_list").find("tr").length;
		if(row_num <= 1)
			$("#table_sensor_list").hide();
		
		var url = "/vb.htm?deliotsensor=" + devIndex + ";" + id + ";";
		SendHttp(url, false,function(g_SubmitHttp){
		if (g_SubmitHttp.readyState == 4)
	  	{
		    	if (g_SubmitHttp.status == 200)
		    	{
					ShowMessageView_by_IFrame(general_savetips);
		    	}
		    }	
		});
		
		m_port_type_array[id] = PORT_NONE;
	});
}

function getUnuseChannel()
{
	var type = document.getElementById("sel_port_type").value;
	var used_channels = new Array(0,0,0,0,0,0,0,0);
	var i = 0;

	for(i = 0;i < MAX_SENSOR_NUM;i++)
	{
		if(m_port_type_array[i] == type)
		{
			var chn = parseInt(m_chn_array[i]);
			used_channels[chn] = 1;		
		}
	}
	for(i = 0;i < MAX_SENSOR_NUM/3;i++)
	{
		if(used_channels[i] != 1)
		{
			break;
		}
	}
	if(i == MAX_SENSOR_NUM/3)
		i = 0;

	if(type == "1")
	{
		document.getElementById("sel_rs485_id").value = String(parseInt(i));
	}
	else if(type == "2")
	{
		document.getElementById("sel_gpio_id").value = String(parseInt(i));
	}
	else
	{
		document.getElementById("sel_ai_id").value = String(parseInt(i));
	}
}

function changeChannelId(index)
{
	var id = 0;
	var name = "";
	var type = "";
	if(index == 0)
	{
		id = parseInt(document.getElementById("sel_rs485_id").value);
		name = "sel_rs485_id";
		type = PORT_RS485;
	}
	else if(index == 1)
	{
		id = parseInt(document.getElementById("sel_gpio_id").value);
		name = "sel_gpio_id";
		type = PORT_GPIO;
	}
	else
	{
		id = parseInt(document.getElementById("sel_ai_id").value);
		name = "sel_ai_id";
		type = PORT_AI;
	}

	if(ChannelIsUse((id+1) + "",g_cur_edit_index,type))
	{
		ASTGUI.highlightField(_$(name), channel_repeat);
		return;
	}
}
