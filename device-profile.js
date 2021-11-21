
var profileUsed = device_profile_json.iotdeviceprofile;
var chnPlan = device_profile_json.iotradiochnpal;
var profileDataAll = device_profile_json.iotdeviceprofilelist;

var profileList = profileDataAll.split(";");
var profileArrayUsed = profileUsed.split(",");

var channelPlan = "";
var macVersionValue = "2";
var regionalParaValue = "1";
var showTitle = 0;
var curProfileIndex = 0;
var MAX_PROFILE_NUM = 64;
var curProfileName = "";
var curOperate = 0;
var deleteIndex = -1;
var curJoinType = 0;
window.onunload = function()
{	
	MY_ONUNLOAD();
};

function MY_ONUNLOAD() {
	MsDisConnect();
}

window.onload = function() {
	myLoad();
}

function myLoad() {

	setMsTableStyle();
	document.getElementById("classA").checked = true;
	document.getElementById("classA").disabled = true;
	document.getElementById("classB").disabled = true;

	document.getElementById("selMacVersion").value = macVersionValue;
	document.getElementById("selRegionalPara").value = regionalParaValue;

	onGetChannelPlan();
	checkRx1RataOffset();
	checkRx2Rata();
	checkRx2Frequency();
	
	showProfileList();
}

function onGetChannelPlan() {
	switch (chnPlan) {
		case "0":
			channelPlan = "EU868";
			break;
		case "1":
			channelPlan = "IN865";
			break;
		case "2":
			channelPlan = "RU864";
			break;
		case "3":
			channelPlan = "US915";
			break;
		case "4":
			channelPlan = "AU915";
			break;
		case "5":
			channelPlan = "AS923";
			break;
		case "6":
			channelPlan = "AS923-2";
			break;
		case "7":
			channelPlan = "KR920";
			break;
		case "8":
			channelPlan = "CN470";
			break;
	}
}

function checkRx1RataOffset() {
	var rateOffset = document.getElementById("selRx1RateOffset");
	rateOffset.add(new Option("0", "0"));
	rateOffset.add(new Option("1", "1"));
	rateOffset.add(new Option("2", "2"));
	rateOffset.add(new Option("3", "3"));
	switch (channelPlan) {
		case "EU868":
		case "RU864":
		case "AU915":
		case "CN470":
			rateOffset.add(new Option("4", "4"));
			rateOffset.add(new Option("5", "5"));
			break;
		case "IN865":
		case "KR920":
		case "AS923":
		case "AS923-2":
			rateOffset.add(new Option("4", "4"));
			rateOffset.add(new Option("5", "5"));
			rateOffset.add(new Option("6", "6"));
			rateOffset.add(new Option("7", "7"));
			break;
		case "US915":
			break;
	}
}


function checkRx2Rata() {
	var rate = document.getElementById("selRx2Rate");
	var rateValue = "0";
	switch (channelPlan) {
		case "EU868":
		case "KR920":
		case "CN470":
			rate.add(new Option("DR0(SF12, 125KHz)", "0"));
			rate.add(new Option("DR1(SF11, 125KHz)", "1"));
			rate.add(new Option("DR2(SF10, 125KHz)", "2"));
			rate.add(new Option("DR3(SF9, 125KHz)", "3"));
			rate.add(new Option("DR4(SF8, 125KHz)", "4"));
			rate.add(new Option("DR5(SF7, 125KHz)", "5"));		
			rateValue = "0";
			break;
		case "RU864":
			rate.add(new Option("DR0(SF12, 125KHz)", "0"));
			rate.add(new Option("DR1(SF11, 125KHz)", "1"));
			rate.add(new Option("DR2(SF10, 125KHz)", "2"));
			rate.add(new Option("DR3(SF9, 125KHz)", "3"));
			rate.add(new Option("DR4(SF8, 125KHz)", "4"));
			rate.add(new Option("DR5(SF7, 125KHz)", "5"));	
			rate.add(new Option("DR7(FSK)", "7"));
			rateValue = "0";
			break;
		case "IN865":
		case "AS923":
		case "AS923-2":
			rate.add(new Option("DR0(SF12, 125KHz)", "0"));
			rate.add(new Option("DR1(SF11, 125KHz)", "1"));
			rate.add(new Option("DR2(SF10, 125KHz)", "2"));
			rate.add(new Option("DR3(SF9, 125KHz)", "3"));
			rate.add(new Option("DR4(SF8, 125KHz)", "4"));
			rate.add(new Option("DR5(SF7, 125KHz)", "5"));	
			rate.add(new Option("DR7(FSK)", "7"));
			rateValue = "2";
			break;
		case "US915":
			rate.add(new Option("DR0(SF10, 125KHz)", "0"));
			rate.add(new Option("DR1(SF9, 125KHz)", "1"));
			rate.add(new Option("DR2(SF8, 125KHz)", "2"));
			rate.add(new Option("DR3(SF7, 125KHz)", "3"));
			rate.add(new Option("DR4(SF8, 500KHz)", "4"));
			rate.add(new Option("DR8(SF12, 500KHz)", "8"));
			rate.add(new Option("DR9(SF11, 250KHz)", "9"));
			rate.add(new Option("DR10(SF10, 500KHz)", "10"));
			rate.add(new Option("DR11(SF9, 500KHz)", "11"));
			rate.add(new Option("DR12(SF8, 500KHz)", "12"));
			rate.add(new Option("DR13(SF7, 500KHz)", "13"));
			rateValue = "8";
			break;
		case "AU915":
			rate.add(new Option("DR0(SF12, 125KHz)", "0"));
			rate.add(new Option("DR1(SF11, 125KHz)", "1"));
			rate.add(new Option("DR2(SF10, 125KHz)", "2"));
			rate.add(new Option("DR3(SF9, 125KHz)", "3"));
			rate.add(new Option("DR4(SF8, 125KHz)", "4"));
			rate.add(new Option("DR5(SF7, 125KHz)", "5"));
			rate.add(new Option("DR6(SF8, 500KHz)", "6"));
			rate.add(new Option("DR8(SF12, 500KHz)", "8"));
			rate.add(new Option("DR9(SF11, 500KHz)", "9"));
			rate.add(new Option("DR10(SF10, 500KHz)", "10"));
			rate.add(new Option("DR11(SF9, 500KHz)", "11"));
			rate.add(new Option("DR12(SF8, 500KHz)", "12"));
			rate.add(new Option("DR13(SF7, 500KHz)", "13"));			
			rateValue = "8";
			break;
	}
	document.getElementById("selRx2Rate").value = rateValue;

}

function checkRx2Frequency() {
	var value = "";
	switch (channelPlan) {
		case "EU868":
			value = "869525000";
			break;
		case "IN865":
			value = "866550000";
			break;
		case "RU864":
			value = "869100000";
			break;
		case "US915":
			value = "923300000";
			break;
		case "AU915":
			value = "923300000";
			break;
		case "AS923":
			value = "923200000";
			break;
		case "AS923-2":
			value = "921400000";
			break;
		case "KR920":
			value = "921900000";
			break;
		case "CN470":
			value = "505300000";
			break;
	}
	document.getElementById("inputRx2Frequency").value	= value;
}


function showProfileList() {
	var TBL = _$('tableProfileList');
	for (var i = 0; i < profileList.length; i++) {
		if (profileList[i] == "" || profileList[i] == undefined || profileList[i] == "-1") {
			continue;
		}
		var profileData = profileList[i].split(":");
		onCreateProfileListHead(TBL);
		insertProfileList(TBL, i, profileData);
		curProfileIndex++;
	}
}



function enableClassC() {
	var enableC = document.getElementById("classC").checked;
	if (enableC == true) {
		document.getElementById("trTimeoutClassC").style.display = "";
	} else {
		document.getElementById("trTimeoutClassC").style.display = "none";
	}
	setMsTableStyle();
}



function onCreateProfileListHead(TBL) {
	if (!showTitle) {
		TBL.style.display = "";
		var newRow = TBL.insertRow(-1);
		var addCell = ASTGUI.domActions.tr_addCell;
		newRow.className = "frow";
		addCell(newRow, {html:profileName, align:"center"});
		addCell(newRow, {html:maxTXP, align:"center"});
		addCell(newRow, {html:joinType, align:"center"});
		addCell(newRow, {html:classType, align:"center"});
		addCell(newRow, {html:Edit, align:"center"});
		addCell(newRow, {html:Delete, align:"center"});
		showTitle = 1;
	}
}


function insertProfileList(oTable, index, profileData) {
	var pName = "";
	var pMaxTXP = "";
	var pJoinType = "";
	var pClassType = "";
	
	var newRow = oTable.insertRow(-1);	
	newRow.vAlign = "middle";		
	var addCell = ASTGUI.domActions.tr_addCell;
	newRow.className = ((oTable.rows.length - 1) % 2 == 1) ? 'odd' : 'even';

	pName = profileData[0];
	pMaxTXP = profileData[1];
	if (profileData[2] == "0") {
		pJoinType = "OTAA";
	} else if (profileData[2] == "1") {
		pJoinType = "ABP";
	}
	if (parseInt(profileData[3]) == 0) {
		pClassType = "";
	} else if (parseInt(profileData[3]) == 1) {
		pClassType = "Class A";
	} else if (parseInt(profileData[3]) == 2) {
		pClassType = "Class B";
	} else if (parseInt(profileData[3]) == 3) {
		pClassType = "Class A, Class B";
	} else if (parseInt(profileData[3]) == 4) {
		pClassType = "Class C";
	} else if (parseInt(profileData[3]) == 5) {
		pClassType = "Class A, Class C";
	} else if (parseInt(profileData[3]) == 6) {
		pClassType = "Class B, Class C";
	} else if (parseInt(profileData[3]) == 7) {
		pClassType = "Class A, Class B, Class C";
	}
	
	var sName = "<div id='sNameDiv"+index+"' style='width: auto;'>"+pName+"</div>";
	var sMaxTXP = "<div id='sMaxTXPDiv"+index+"' style='width: auto;'>"+pMaxTXP+"</div>";
	var sJoinType = "<div id='sJoinTypeDiv"+index+"' style='width: auto;'>"+pJoinType+"</div>";
	var sClassType = "<div id='sClassTypeDiv"+index+"' style='width: auto;'>"+pClassType+"</div>";
	
	var sEdit = "<a class='guiButtonEdit'  href='javascript:onEdit(\""+index+"\");' id='guiButtonEditobj"+
				index+"'><img style=' border:0px;' src='/image/hammer_screwdriver.png' alt='"+Edit+"' /></a>";
	var sDelete = "<a class='guiButtonDelete'  href='javascript:onDelete(\""+index+"\");' id='guiButtonDeleteobj"+
				  index+"'><img style=' border:0px;' src='/image/cross.png' alt='"+Delete+"' /></a>";

	addCell(newRow, {html: sName, align:"center"});
	addCell(newRow, {html: sMaxTXP, align:"center"});
	addCell(newRow, {html: sJoinType, align:"center"});
	addCell(newRow, {html: sClassType, align:"center"});
	addCell(newRow, {html: sEdit, align:"center"});
	addCell(newRow, {html: sDelete, align:"center"});
}


function onEdit(index) {
	var profileData = profileList[index].split(":");
	$("#cancel").show();

	document.getElementById("inputProfileName").value = profileData[0];
	document.getElementById("inputMaxTXP").value = profileData[1];
	document.getElementById("selJoinType").value = profileData[2];
	if(checkProfileUse(index)){
		document.getElementById("selJoinType").disabled = true;
	} else {
		document.getElementById("selJoinType").disabled = false;
	}
	if (parseInt(profileData[3]) & 1 << 2) {
		document.getElementById("classC").checked = true;
		enableClassC();
		document.getElementById("inputTimeoutClassC").value = profileData[10];
	} else {
		document.getElementById("classC").checked = false;
		enableClassC();
	}
	
	document.getElementById("selMacVersion").value = profileData[4];
	document.getElementById("selRegionalPara").value = profileData[5];
	document.getElementById("selRx1RateOffset").value = profileData[6];
	document.getElementById("selRx2Rate").value = profileData[7];
	document.getElementById("inputRx2Frequency").value = profileData[8];
	document.getElementById("inputFrequencyList").value = profileData[9];
	curProfileIndex = index;
}

function onDelete(nIndex) {
	var TBL = _$('tableProfileList');
	ShowConfirm(profileDeleteTips, function() {
		if (checkProfileUse(nIndex)) {
			ShowAlertView(profileUsedTips, 0);
		} else {
			var url = "/vb.htm?language=ie";
			url += "&deleteprofile="+nIndex;
			curOperate = 2;
			deleteIndex = nIndex;
			onRemove(nIndex);
			SendHttp(url, false, checkSendHttpSuccess);
		}
	});
}

function onRemove(index) {
	var obj = "guiButtonDeleteobj" + index;
	var TBL = _$('tableProfileList');
	var rowIndex = document.getElementById(obj).parentNode.parentNode.rowIndex;
	TBL.deleteRow(rowIndex);
	if (TBL.rows.length == 1) {
		showTitle = 0;
		TBL.deleteRow(0);
	}
	setTableStyle("tableProfileList");
}

function checkProfileUse(nIndex) 
{
	for (var i = 0; i < MAX_PROFILE_NUM; i++) {
		if (profileArrayUsed[i] == nIndex) {
			return 1;
		}
	}
	return 0;
}

function checkProfileName(nIndex, name) 
{
	for (var i = 0; i < MAX_PROFILE_NUM; i++) {
		if (i == nIndex) {
			continue;
		}
		var data = profileList[i].split(":");
		var profileNameTmp = encodeURIComponent(data[0]);
		if (profileNameTmp == name) {
			return 1;
		}
	}
	return 0;
}

function checkMaxTxpData(id) {
	var maxTxp = parseInt(document.getElementById(id).value);
	switch (channelPlan) {
		case "EU868":
		case "RU864":
		case "AS923":
		case "AS923-2":
			if (!focusInputRangeIncorrect(id, maxTxp, 0, 16)) {
				return 0;
			}
			break;
		case "IN865":
		case "US915":
		case "AU915":
			if (!focusInputRangeIncorrect(id, maxTxp, 0, 30)) {
				return 0;
			}
			break;
		case "KR920":
			if (!focusInputRangeIncorrect(id, maxTxp, 0, 14)) {
				return 0;
			}
			break;
		case "CN470":
			if (!focusInputRangeIncorrect(id, maxTxp, 0, 20)) {
				return 0;
			}
			break;
	}
	return 1;
}

function checkProfileFrequencyData(id, value) {
	switch (channelPlan) {
		case "EU868":
			if (!focusInputRangeIncorrect(id, value, 863000000, 870000000)) {
				return 0;
			}
			break;
		case "IN865":
			if (!focusInputRangeIncorrect(id, value, 865000000, 867000000)) {
				return 0;
			}
			break;
		case "RU864":
			if (!focusInputRangeIncorrect(id, value, 864000000, 870000000)) {
				return 0;
			}
			break;
		case "US915":
			if (!focusInputRangeIncorrect(id, value, 902000000, 928000000)) {
				return 0;
			}
			break;
		case "AU915":
		case "AS923":
		case "AS923-2":
			if (!focusInputRangeIncorrect(id, value, 915000000, 928000000)) {
				return 0;
			}
			break;
		case "KR920":
			if (!focusInputRangeIncorrect(id, value, 920900000, 923300000)) {
				return 0;
			}
			break;
		case "CN470":
			if (!focusInputRangeIncorrect(id, value, 470000000, 510000000)) {
				return 0;
			}
			break;
	}
	return 1;
}


function focusInputRangeIncorrect(id, value, min, max) {
	var note = "";
	if (id == "inputMaxTXP") {
		note = maxTxpNote;
	} else if (id == "inputRx2Frequency" || id == "inputFrequencyList") {
		note = frequencyNote;
	} else if (id == "inputTimeoutClassC") {
		note = timeoutClassCNote;
	}
	if (value > max || value < min || isNaN(value)) {
		ShowTips(id, note+min+"~"+max);
		document.getElementById(id).style.backgroundColor = "#ff6464";
		setTimeout( function(){ document.getElementById(id).style.backgroundColor = ""; } , 2000 );
		document.getElementById(id).focus();
		return 0;
	}
	return 1;
}

function onSubmit() {
	if(curProfileIndex > MAX_PROFILE_NUM-1){
		ShowAlert(profileTips);
		return;
	}
	if (!ASTGUI.checkRequiredFields(['inputProfileName', 'inputMaxTXP', 'inputRx2Frequency'])) {
		return;
	}
	if (!ASTGUI.validateFields(['inputProfileName', 'inputMaxTXP', 'inputRx2Frequency'])) {
		return;
	}
	var nameTmp = document.getElementById("inputProfileName").value;
	var profileN = encodeURIComponent(nameTmp);
	if (checkProfileName(curProfileIndex, profileN)) {
		ShowTips("inputProfileName", use_another_name);
		document.getElementById("inputProfileName").style.backgroundColor = "#ff6464";
		setTimeout( function(){ document.getElementById("inputProfileName").style.backgroundColor = ""; } , 2000 );
		document.getElementById("inputProfileName").focus();
		return;
	}
	var maxTxp = document.getElementById("inputMaxTXP").value;
	if (maxTxp == null || maxTxp == undefined || maxTxp == "") {
		maxTxp = 0;
	}
	else{
		if(!checkMaxTxpData("inputMaxTXP")){
			return;
		}
	}

	var freRX2 = parseInt(document.getElementById("inputRx2Frequency").value);
	if (!checkProfileFrequencyData("inputRx2Frequency", freRX2)) {
		return;
	}
	var freListData = document.getElementById("inputFrequencyList").value;
	if (freListData != "") {
		if ( /[^0-9,]/.test(freListData) ) {
			ShowTips("inputFrequencyList", frequencyListNote);
			document.getElementById("inputFrequencyList").style.backgroundColor = "#ff6464";
			setTimeout( function(){ document.getElementById("inputFrequencyList").style.backgroundColor = ""; } , 2000 );
			document.getElementById("inputFrequencyList").focus();
			return;
		} else {
			var freList = freListData.split(",");
			for (var i = 0; i < freList.length; i++) {
				if (!checkProfileFrequencyData("inputFrequencyList", parseInt(freList[i]))) {
					return;
				}
			}
		}
	}
	var url = "/vb.htm?page=iotdeviceprofile";
	url += "&index=" + curProfileIndex;
	url += "&name=" + profileN;
	curProfileName = profileN;
	url += "&maxtxp=" + maxTxp;
	curJoinType = document.getElementById("selJoinType").value;
	url += "&jointype=" + curJoinType;
	var classTypeV = (document.getElementById("classC").checked == true ? 5 : 1);
	url += "&classtype=" + classTypeV;
	if (parseInt(classTypeV) & 1 << 2) {
		if (!ASTGUI.validateFields(['inputTimeoutClassC'])) {
			return;
		}
		var timeout = document.getElementById("inputTimeoutClassC").value;
		if (!focusInputRangeIncorrect("inputTimeoutClassC", parseInt(timeout), 0, 2147483647)) {
			return;
		}
		url += "&timeoutclassc=" + timeout;
	}
	url += "&macversion=" + document.getElementById("selMacVersion").value;
	url += "&regionalparam=" + document.getElementById("selRegionalPara").value;
	url += "&raterx1=" + document.getElementById("selRx1RateOffset").value;
	url += "&raterx2=" + document.getElementById("selRx2Rate").value;
	url += "&frerx2=" + document.getElementById("inputRx2Frequency").value;
	url += "&frelist=" + document.getElementById("inputFrequencyList").value;

	$("#cancel").hide();
	SendHttp(url, false, checkSendHttpSuccess);
}

function checkSendHttpSuccess(g_SubmitHttp) {
	if (g_SubmitHttp.readyState == 4) {
		if (g_SubmitHttp.status == 200) {

		var profileNameTmp = new Array();

		if(curOperate != 2) {
			for (var i = 0; i < profileList.length; i++) {
			//	if (profileList[i] == "" || profileList[i] == undefined || profileList[i] == "-1") {
			//		continue;
			//	}
				var data = profileList[i].split(":");
				profileNameTmp[i] = data[0];
			}
			profileNameTmp[curProfileIndex] = decodeURIComponent(curProfileName);
		}
		parent.window.document.getElementById("mainscreen").contentWindow.profile_callback(profileNameTmp, deleteIndex,curJoinType,curProfileIndex);
		deleteIndex = -1;
		curOperate = 0;
		ShowMessageView(general_savetips);
		setTimeout( function(){ window.location.href = "device-profile.html"; }, 1000);
		}
	}
}

function setDefaultRx2Data() {
	var rateValue = "0";
	switch (channelPlan) {
		case "EU868":
		case "KR920":
		case "CN470":	
			rateValue = "0";
			break;
		case "RU864":
			rateValue = "0";
			break;
		case "IN865":
		case "AS923":
		case "AS923-2":
			rateValue = "2";
			break;
		case "US915":
			rateValue = "8";
			break;
		case "AU915":		
			rateValue = "8";
			break;
	}
	document.getElementById("selRx2Rate").value = rateValue;
}

function onCancel() {
	document.getElementById("inputProfileName").value = null;
	document.getElementById("inputMaxTXP").value = 0;
	document.getElementById("selJoinType").value = 0;
	document.getElementById("selJoinType").disabled = false;
	document.getElementById("classA").checked = true;
	document.getElementById("classA").disabled = true;
	document.getElementById("classB").disabled = true;
	document.getElementById("classC").checked = false;
	document.getElementById("selMacVersion").value = macVersionValue;
	document.getElementById("selRegionalPara").value = regionalParaValue;
	document.getElementById("selRx1RateOffset").value = 0;
	setDefaultRx2Data();
	checkRx2Frequency();
	document.getElementById("inputFrequencyList").value = null;
	document.getElementById("inputTimeoutClassC").value = 0;
	document.getElementById("trTimeoutClassC").style.display = "none";
	onGetChannelPlan();

	curProfileIndex = 0;
	var TBL = _$('tableProfileList');
	for (var i = 0; i < profileList.length; i++) {
		if (profileList[i] == "" || profileList[i] == undefined || profileList[i] == "-1") {
			continue;
		}
		curProfileIndex++;
	}

	$("#cancel").hide();
}


