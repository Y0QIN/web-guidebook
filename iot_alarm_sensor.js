var m_device_name = iot_alarm_sensor_json.iotdevicename;
var m_device_sensortype_list = new Array(iot_alarm_sensor_json["iotdevsensortype.0"],iot_alarm_sensor_json["iotdevsensortype.1"],iot_alarm_sensor_json["iotdevsensortype.2"],iot_alarm_sensor_json["iotdevsensortype.3"],iot_alarm_sensor_json["iotdevsensortype.4"],
	iot_alarm_sensor_json["iotdevsensortype.5"],iot_alarm_sensor_json["iotdevsensortype.6"],iot_alarm_sensor_json["iotdevsensortype.7"]);
var m_device_port_type_list = new Array(iot_alarm_sensor_json["iotdevporttype.0"],iot_alarm_sensor_json["iotdevporttype.1"],iot_alarm_sensor_json["iotdevporttype.2"],iot_alarm_sensor_json["iotdevporttype.3"],iot_alarm_sensor_json["iotdevporttype.4"],
	iot_alarm_sensor_json["iotdevporttype.5"],iot_alarm_sensor_json["iotdevporttype.6"],iot_alarm_sensor_json["iotdevporttype.7"]);
var m_device_sensorname_list = new Array(iot_alarm_sensor_json["iotdevsensorname.0"],iot_alarm_sensor_json["iotdevsensorname.1"],iot_alarm_sensor_json["iotdevsensorname.2"],iot_alarm_sensor_json["iotdevsensorname.3"],iot_alarm_sensor_json["iotdevsensorname.4"],
	iot_alarm_sensor_json["iotdevsensorname.5"],iot_alarm_sensor_json["iotdevsensorname.6"],iot_alarm_sensor_json["iotdevsensorname.7"]);
var m_device_unit_list = new Array(iot_alarm_sensor_json["iotdevunit.0"],iot_alarm_sensor_json["iotdevunit.1"],iot_alarm_sensor_json["iotdevunit.2"],iot_alarm_sensor_json["iotdevunit.3"],iot_alarm_sensor_json["iotdevunit.4"],
	iot_alarm_sensor_json["iotdevunit.5"],iot_alarm_sensor_json["iotdevunit.6"],iot_alarm_sensor_json["iotdevunit.7"]);

var m_device_trig_more_list = new Array(iot_alarm_sensor_json["iotdevtrigmore.0"],iot_alarm_sensor_json["iotdevtrigmore.1"],iot_alarm_sensor_json["iotdevtrigmore.2"],iot_alarm_sensor_json["iotdevtrigmore.3"]);
var m_device_trig_less_list = new Array(iot_alarm_sensor_json["iotdevtrigless.0"],iot_alarm_sensor_json["iotdevtrigless.1"],iot_alarm_sensor_json["iotdevtrigless.2"],iot_alarm_sensor_json["iotdevtrigless.3"]);
var m_device_more_thres_list = new Array(iot_alarm_sensor_json["iotdevmorethres.0"],iot_alarm_sensor_json["iotdevmorethres.1"],iot_alarm_sensor_json["iotdevmorethres.2"],iot_alarm_sensor_json["iotdevmorethres.3"]);
var m_device_less_thres_list = new Array(iot_alarm_sensor_json["iotdevlessthres.0"],iot_alarm_sensor_json["iotdevlessthres.1"],iot_alarm_sensor_json["iotdevlessthres.2"],iot_alarm_sensor_json["iotdevlessthres.3"]);
var m_device_sensor_alarm_list = new Array(iot_alarm_sensor_json["iotdevalarmlist.0"],iot_alarm_sensor_json["iotdevalarmlist.1"],iot_alarm_sensor_json["iotdevalarmlist.2"],iot_alarm_sensor_json["iotdevalarmlist.3"]);

var m_device_name_array = m_device_name.split(",");

var m_trig_more_array = new Array();
var m_trig_less_array = new Array();
var m_more_thres_array = new Array();
var m_less_thres_array = new Array();
var m_sensor_alarm_array = new Array();


var MAX_SENSOR_NUM = 24;
var MAX_DEVICE_NUM = 8;
var PORT_NONE = "0";
var PORT_RS485 = "1";
var PORT_GPIO = "2";
var PORT_AI = "3";

var g_cur_device_id = 0;
var g_cur_sensor_id = 0;

var ruleIndex = parseInt(getQueryString("ruleIndex"));

window.onload = function() {
	
	ASTGUI.cookies.fe_check_cookie();
	ForbidUserViewer();
	My_Load();
};

function My_Load()
{
	m_trig_more_array = m_device_trig_more_list[ruleIndex].split(";");
	m_trig_less_array = m_device_trig_less_list[ruleIndex].split(";");
	m_more_thres_array = m_device_more_thres_list[ruleIndex].split(";");
	m_less_thres_array = m_device_less_thres_list[ruleIndex].split(";");
	m_sensor_alarm_array = m_device_sensor_alarm_list[ruleIndex].split(";");
	var div_name = "";
	var sel_all = true;
	for(var i = 0;i < MAX_DEVICE_NUM;i++)
	{
		var m_sensor_type_array = m_device_sensortype_list[i].split(";");
		var m_port_type_array = m_device_port_type_list[i].split(";");
		var m_sensor_name_array = m_device_sensorname_list[i].split("/,;");
		for(var j = 0;j < MAX_SENSOR_NUM;j++)
		{	
			if(m_port_type_array[j] != PORT_NONE)
			{
				var sensor_name = get_sensor_name(parseInt(m_sensor_type_array[j]));
				if(sensor_name == "")
					sensor_name = m_sensor_name_array[j]
				div_name = m_device_name_array[i] + "-" + (j+1) + "-" + sensor_name;
				insert_sensor_alarm_list(div_name,i,j,m_sensor_alarm_array[i*MAX_SENSOR_NUM+j]);
				if(m_sensor_alarm_array[i*MAX_SENSOR_NUM+j] == "0")
					sel_all = false;
			}			
		}
	}
	document.getElementById("check_select_all").checked = sel_all;
	setMsTableStyle();
}

function insert_sensor_alarm_list(div_name,device_id,sensor_id,check)
{
	var button_id = "btn_" + (device_id*parseInt(MAX_SENSOR_NUM)+sensor_id);
	var input_id = "input_" + (device_id*parseInt(MAX_SENSOR_NUM)+sensor_id);
	var table_html = "";
	table_html += "<tr>"
				+ 	"<td>"
				+		"<input type='checkbox' class='inputcheck' onchange='enableSensor(" + device_id + "," + sensor_id + ")' id='" + input_id +"'/>&nbsp"
				+		"<div class='divNameClass' title='" + div_name + "'>" + div_name + "</div>"
				+		"<a  class='local_button' id='"+ button_id +"' style='float:right;display:none;' href='javascript:onEditSensorAlarm(" + device_id + "," + sensor_id + ")'>" + lang_threshold + "</a>"
				+ 	"</td>"
				+ "</tr>";
	$("#sensorListTable").append(table_html);
	document.getElementById(input_id).checked = check=="1"?true:false;
	if(check)
		show_sensor_threshold(device_id,sensor_id);
}

function enableSensor(device_id,sensor_id)
{
	var button_id = "#btn_" + (device_id*parseInt(MAX_SENSOR_NUM)+sensor_id);
	var input_id = "input_" + (device_id*parseInt(MAX_SENSOR_NUM)+sensor_id);
	if(document.getElementById(input_id).checked)
	{
		$(button_id).show();
		var sel_all = true;
		for(var i = 0;i < MAX_DEVICE_NUM;i++)
		{
			var m_port_type_array = m_device_port_type_list[i].split(";");
			for(var j = 0;j < MAX_SENSOR_NUM;j++)
			{	
				if(m_port_type_array[j] != PORT_NONE)
				{
					var input_id = "input_" + (i*parseInt(MAX_SENSOR_NUM)+j);
					if(!document.getElementById(input_id).checked)
					{
						document.getElementById("check_select_all").checked = false;
						return;
					}
				}			
			}
		}
		document.getElementById("check_select_all").checked = true;
	}
	else
	{
		$(button_id).hide();
		document.getElementById("check_select_all").checked = false;
	}
}

function show_sensor_threshold(device_id,sensor_id)
{
	var button_id = "#btn_" + (device_id*parseInt(MAX_SENSOR_NUM)+sensor_id);
	var input_id = "input_" + (device_id*parseInt(MAX_SENSOR_NUM)+sensor_id);
	if(document.getElementById(input_id).checked)
		$(button_id).show();
	else
		$(button_id).hide();
}

function set_all_ui_disable_flag(disable_flag)
{
	for(var i = 0;i < MAX_DEVICE_NUM;i++)
	{
		var m_port_type_array = m_device_port_type_list[i].split(";");
		for(var j = 0;j < MAX_SENSOR_NUM;j++)
		{	
			if(m_port_type_array[j] != PORT_NONE)
			{
				var button_id = "#btn_" + (i*parseInt(MAX_SENSOR_NUM)+j);
				var input_id = "#input_" + (i*parseInt(MAX_SENSOR_NUM)+j);
				$(button_id).attr("disabled",disable_flag);
				$(input_id).attr("disabled",disable_flag);
			}			
		}
	}
	$("submit").attr("disabled",disable_flag);
	$("cancel").attr("disabled",disable_flag);
}

function onEditSensorAlarm(device_id,sensor_id)
{
	set_all_ui_disable_flag(true);
	$("#div_threshold").show();
	var m_unit_array = m_device_unit_list[device_id].split("/,;");
	$("#more_unit").html(m_unit_array[sensor_id]);
	$("#less_unit").html(m_unit_array[sensor_id]);

	var index = device_id * MAX_SENSOR_NUM + sensor_id;
	var m_port_type_array = m_device_port_type_list[device_id].split(";");
	if(m_port_type_array[sensor_id] == PORT_GPIO)
	{
		if(m_trig_more_array[index] == "1")
		{
			document.getElementById("gpio_check").checked = true;
			document.getElementById("sel_gpio").value = "1";
		}
		else if(m_trig_less_array[index] == "1")
		{
			document.getElementById("gpio_check").checked = true;
			document.getElementById("sel_gpio").value = "0";
		}
		else
		{
			document.getElementById("gpio_check").checked = false;
			document.getElementById("sel_gpio").value = "0";
		}
		$("#tr_more").hide();
		$("#tr_less").hide();
		$("#tr_gpio").show();
	}
	else
	{
		document.getElementById("more_check").checked = m_trig_more_array[index] == "1"?true:false;
		document.getElementById("less_check").checked = m_trig_less_array[index] == "1"?true:false;
		document.getElementById("more_input").value = m_more_thres_array[index];
		document.getElementById("less_input").value = m_less_thres_array[index];
		more_check_change();
		less_check_change();
		$("#tr_more").show();
		$("#tr_less").show();
		$("#tr_gpio").hide();
	}
	g_cur_device_id = device_id;
	g_cur_sensor_id = sensor_id;
}

function SaveThreshold()
{
	var m_port_type_array = m_device_port_type_list[g_cur_device_id].split(";");
	if(m_port_type_array[g_cur_sensor_id] != PORT_GPIO)
	{
		if(document.getElementById("more_check").value)
		{
			if(!ASTGUI.checkRequiredFields(['more_input']))
				return;
			if(!ASTGUI.validateFields(['more_input']))
				return;	
		}
		if(document.getElementById("less_check").value)
		{
			if(!ASTGUI.checkRequiredFields(['less_input']))
				return;
			if(!ASTGUI.validateFields(['less_input']))
				return;	
		}
	}
	
	var index = g_cur_device_id * MAX_SENSOR_NUM + g_cur_sensor_id;
	if(m_port_type_array[g_cur_sensor_id] == PORT_GPIO)
	{
		m_more_thres_array[index] = "1";
		m_less_thres_array[index] = "0";
		if(document.getElementById("gpio_check").checked)
		{
			if(document.getElementById("sel_gpio").value == "0")
			{
				m_trig_more_array[index] = "0";
				m_trig_less_array[index] = "1";
			}
			else
			{
				m_trig_more_array[index] = "1";
				m_trig_less_array[index] = "0";
			}
		}
	}
	else
	{
		var more_check = document.getElementById("more_check").checked==true?"1":"0";
		var less_check = document.getElementById("less_check").checked==true?"1":"0";
		var more_thres = document.getElementById("more_input").value.trim();
		var less_thres = document.getElementById("less_input").value.trim();

		if(more_check == "1" && less_check == "1")
		{
			if(parseFloat(more_thres) < parseFloat(less_thres))
			{
				ShowAlert(threshold_compare_tips);
				return;
			}
		}

		m_trig_more_array[index] = more_check;
		if(m_trig_more_array[index] == "1")
			m_more_thres_array[index] = more_thres;
		m_trig_less_array[index] = less_check;
		if(m_trig_less_array[index] == "1")
			m_less_thres_array[index] = less_thres;
	}
	$("#div_threshold").hide();
	set_all_ui_disable_flag(false);
	var url = "/vb.htm?page=iotsensor";
	url += "&ruleindex=" + ruleIndex;
	url += "&deviceindex=" + g_cur_device_id;
	url += "&index=" + g_cur_sensor_id;
	url += "&trigmore=" + m_trig_more_array[index];
	url += "&trigless=" + m_trig_less_array[index];
	url += "&morethreshold=" + m_more_thres_array[index];
	url += "&lessthreshold=" + m_less_thres_array[index];
	SendHttp(url, false);
}

function CancelThreshold()
{
	$("#div_threshold").hide();
	set_all_ui_disable_flag(false);
}

function onSave()
{
	var url = "/vb.htm?setiotsensoralarm="+ruleIndex + ";";
	for(var i = 0;i < MAX_DEVICE_NUM;i++)
	{
		var m_port_type_array = m_device_port_type_list[i].split(";");
		for(var j = 0;j < MAX_SENSOR_NUM;j++)
		{	
			if(m_port_type_array[j] != PORT_NONE)
			{
				var input_id = "input_" + (i*parseInt(MAX_SENSOR_NUM)+j);
				var enable = document.getElementById(input_id).checked == true?1:0;
				url += i + "|" + j + "|" + enable + ";";
			}			
		}
	}
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

function onCancel()
{
	windowObj.layer.closeAll();
}

function more_check_change()
{
	if(document.getElementById("more_check").checked)
		$("#more_input").attr("disabled",false);
	else
		$("#more_input").attr("disabled",true);
}

function less_check_change()
{
	if(document.getElementById("less_check").checked)
		$("#less_input").attr("disabled",false);
	else
		$("#less_input").attr("disabled",true);
}

function selectAll()
{
	var value = document.getElementById("check_select_all").checked;
	for(var i = 0;i < MAX_DEVICE_NUM;i++)
	{
		var m_port_type_array = m_device_port_type_list[i].split(";");
		for(var j = 0;j < MAX_SENSOR_NUM;j++)
		{	
			if(m_port_type_array[j] != PORT_NONE)
			{
				var input_id = "input_" + (i*parseInt(MAX_SENSOR_NUM)+j);
				document.getElementById(input_id).checked = value;
				show_sensor_threshold(i,j);
			}			
		}
	}
}
