var m_cellular_isp = cellular_json.cellularisp;
var m_cellular_simstatus = cellular_json.cellularsimstatus;
var m_cellular_strength = cellular_json.cellularstrength;
var m_cellular_status = cellular_json.cellularstus;

var m_cellular_imei = cellular_json.cellularimei;
var m_cellular_imsi = cellular_json.cellularimsi;
var m_cellular_iccid = cellular_json.cellulariccid;

var m_cellular_ip = cellular_json.cellularip;
var m_cellular_submask = cellular_json.cellularmask;
var m_cellular_gateway = cellular_json.cellulargateway;
var m_cellular_dns = cellular_json.cellulardns;
var m_cellular_usage = cellular_json.cellularusage;

var m_cellular_enable = cellular_json.cellularenable;
var m_cellular_apn = cellular_json.cellularapn;
var m_cellular_name = cellular_json.cellularname;
var m_cellular_password = cellular_json.cellularpassword;
var m_cellular_pin = cellular_json.cellularpin;
var m_cellular_access = cellular_json.cellularaccess;
var m_cellular_authentication = cellular_json.cellularauthentication;
var m_cellular_network = cellular_json.cellularnetwork;
var m_cellular_redial = cellular_json.cellularredial;
var m_cellular_bill = cellular_json.cellularbill;

var m_max_bill_day = 28;


setMsTableStyle();
buildMenuTab(pageName());

function My_Load()
{
	cellular_init_bill();	
	update_cellular_status();
}

window.onload = function()
{		
	//check_cookie(debug);
	ASTGUI.cookies.fe_check_cookie();
	ASTGUI.dialog.hide();
	ForbidUserViewer();
	My_Load();
}


function cellular_init_bill()
{
	var i=0;
	var opt;
	var index = 0;
	for(i=0; i<m_max_bill_day; i++)
	{
		index = i + 1;
		opt += "<option value='" +i+ "'>" +index+ "</option>";
	}
	$("#cellularBilling").append(opt);
	$("#cellularBilling").val(i);
}


function update_cellular_status()
{
	if(m_cellular_simstatus == "No SIM Card"){
		document.getElementById("ispStus").value = "-";
	}
	else{
		document.getElementById("ispStus").value = m_cellular_isp;
	}
	document.getElementById("simStus").value = m_cellular_simstatus;
//	document.getElementById("signalStus").value = m_cellular_strength;
	set_sign(m_cellular_strength);
	document.getElementById("connectStaus").value = m_cellular_status;

	if(m_cellular_status == "Disconnect"){
		document.getElementById("cellularImei").value = "-";
		document.getElementById("cellularImsi").value = "-";
		document.getElementById("cellularIccid").value = "-";
		document.getElementById("ipStaus").value = "0.0.0.0";
		document.getElementById("subMaskStaus").value = "0.0.0.0";
		document.getElementById("gatewayStaus").value = "0.0.0.0";
		document.getElementById("dnsStaus").value = "0.0.0.0";
	}
	else{
		document.getElementById("cellularImei").value = m_cellular_imei;
		document.getElementById("cellularImsi").value = m_cellular_imsi;
		document.getElementById("cellularIccid").value = m_cellular_iccid;
		document.getElementById("ipStaus").value = m_cellular_ip;
		document.getElementById("subMaskStaus").value = m_cellular_submask;
		document.getElementById("gatewayStaus").value = m_cellular_gateway;
		document.getElementById("dnsStaus").value = m_cellular_dns;
	}

	var dataUsage = m_cellular_usage+"MiB";
	document.getElementById("dataUseStaus").value =dataUsage;

	if(m_cellular_enable == 1)
		document.getElementById("cellularEnable").checked = true;
	else
		document.getElementById("cellularEnable").checked = false;
	document.getElementById("apnSet").value = m_cellular_apn;
	document.getElementById("uNameSet").value = m_cellular_name;
	if(m_cellular_password !=''){
		setTagIntstr("#passwordSet","randstr",6);
	}
//	document.getElementById("passwordSet").value =m_cellular_password;
	document.getElementById("pinCode").value = m_cellular_pin;
	document.getElementById("accessNumber").value = m_cellular_access;
	document.getElementById("authenticationType").value = m_cellular_authentication;
	document.getElementById("netWorkType").value = m_cellular_network;
	document.getElementById("redialIntval").value = m_cellular_redial;
	document.getElementById("cellularBilling").value = m_cellular_bill-1;


}

function onSubmit()
{
	var url = "/vb.htm?page=cellularsetting";
	var billDay = 0;
	var enable = document.getElementById("cellularEnable").checked ? 1:0;
	url += "&cellularenable=" + enable;
	url += "&cellularapn=" + encodeURIComponent(document.getElementById("apnSet").value);
	url += "&cellularname=" + encodeURIComponent(document.getElementById("uNameSet").value);
	url += getPwdUrlStrNoTrim("&cellularpassword=",'passwordSet','randstr');
	if(document.getElementById("pinCode").value != ""){
		if(!ASTGUI.validateFields(['pinCode']))
			return;
	}
	url += "&cellularpin=" + encodeURIComponent(document.getElementById("pinCode").value);
	url += "&cellularaccess=" + encodeURIComponent(document.getElementById("accessNumber").value);
	url += "&cellularauthentication=" + document.getElementById("authenticationType").value;
	url += "&cellularnetwork=" + document.getElementById("netWorkType").value;

	if(!ASTGUI.validateFields(['redialIntval'])){
		return;
	}

	url += "&cellularredial=" + document.getElementById("redialIntval").value;
	billDay = Number(document.getElementById("cellularBilling").value) + 1;
	url += "&cellularbill=" + billDay;
	SendHttp(url, false, OnSendHttp);
}

function OnRefresh() {
    window.location.href = "cellular.html";
}

function set_sign(count)
{
	var tmpElement = document.getElementById("signalStus");
	for(var i=0;i<5;i++){
		tmpElement.children[i].style.backgroundColor = "#FFF";
		if(i<=count-1){
			if(count<2){ 
				tmpElement.children[i].style.backgroundColor = "red";//一格时为红色
			}else{
				tmpElement.children[i].style.backgroundColor = "#00A0E8";
			}
		}
	}
}


