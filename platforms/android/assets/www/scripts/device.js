!function(){function e(e,t,a){a.SupportsContentUploading?$("#fldCameraUploadPath",e).show():$("#fldCameraUploadPath",e).hide(),$("#txtCustomName",e).val(t.CustomName||""),$("#txtUploadPath",e).val(t.CameraUploadPath||""),$(".reportedName",e).html(t.ReportedName||"")}function t(t){Dashboard.showLoadingMsg();var a=getParameterByName("id"),o=ApiClient.getJSON(ApiClient.getUrl("Devices/Info",{Id:a})),i=ApiClient.getJSON(ApiClient.getUrl("Devices/Capabilities",{Id:a}));Promise.all([o,i]).then(function(a){e(t,a[0],a[1]),Dashboard.hideLoadingMsg()})}function a(e){var t=getParameterByName("id");ApiClient.ajax({url:ApiClient.getUrl("Devices/Options",{Id:t}),type:"POST",data:JSON.stringify({CustomName:$("#txtCustomName",e).val(),CameraUploadPath:$("#txtUploadPath",e).val()}),contentType:"application/json",dataType:"json"}).then(Dashboard.processServerConfigurationUpdateResult)}function o(){var e=this,t=$(e).parents(".page");return a(t),!1}$(document).on("pageinit","#devicePage",function(){var e=this;$("#btnSelectUploadPath",e).on("click.selectDirectory",function(){require(["directorybrowser"],function(t){var a=new t;a.show({callback:function(t){t&&$("#txtUploadPath",e).val(t),a.close()},header:Globalize.translate("HeaderSelectUploadPath")})})}),$(".deviceForm").off("submit",o).on("submit",o)}).on("pageshow","#devicePage",function(){var e=this;t(e)})}();