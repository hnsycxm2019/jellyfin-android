define(["appSettings","events","jQuery"],function(e,t,n){function o(){function t(t){t=Object.assign(t,{userId:Dashboard.getCurrentUserId(),deviceId:ApiClient.deviceId(),accessToken:ApiClient.accessToken(),serverAddress:ApiClient.serverAddress(),receiverName:f||v});var n=e.maxChromecastBitrate();n&&(t.maxBitrate=n),require(["chromecasthelpers"],function(e){e.getServerAddress(ApiClient).then(function(e){t.serverAddress=e,o(t)})})}function o(e){var t=JSON.stringify(e);a.sendMessage(t)}function i(){var e=a.devices||{},t=[];for(var n in e){var o=e[n];t.push({name:o.friendlyName,deviceName:o.friendlyName,playerName:v,playableMediaTypes:["Audio","Video"],isLocalPlayer:!1,id:o.id,supportedCommands:["VolumeUp","VolumeDown","Mute","Unmute","ToggleMute","SetVolume","SetAudioStreamIndex","SetSubtitleStreamIndex","DisplayContent","SetRepeatMode","EndSession"]})}return Promise.resolve(t)}function r(){var e=y.lastPlayerData||{};return e=e.PlayState||{},null==e.VolumeLevel?100:e.VolumeLevel}function s(){t({options:{},command:"Identify"})}function u(){c(),MediaController.removeActivePlayer(v)}function c(){y.lastPlayerData={}}function m(e,t){e&&a.disconnect(),c(),f=null,t||(p=null)}function l(e,t){var n=i().filter(function(t){return t.getId()==e})[0];n?y.tryPair(e):t&&setTimeout(function(){l(e,!1)},2e3)}function d(){var e=p;e&&setTimeout(function(){l(e,!0)},0)}var p,f,y=this,v="Chromecast",g="2D4B1DA3";y.name=v,y.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(n){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){n({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))};var I={};Events.on(I,"playbackstart",function(e,t){var n=y.getPlayerStateInternal(t);Events.trigger(y,"playbackstart",[n])}),Events.on(I,"playbackstop",function(e,t){var n=y.getPlayerStateInternal(t);Events.trigger(y,"playbackstop",[n]),y.lastPlayerData={}}),Events.on(I,"playbackprogress",function(e,t){var n=y.getPlayerStateInternal(t);Events.trigger(y,"positionchange",[n])}),y.play=function(e){Dashboard.getCurrentUser().then(function(){e.items?y.playWithCommand(e,"PlayNow"):y.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,y.playWithCommand(e,"PlayNow")})})},y.playWithCommand=function(e,n){return e.items?(e.items=e.items.map(function(e){return{Id:e.Id,Name:e.Name,Type:e.Type,MediaType:e.MediaType,IsFolder:e.IsFolder}}),void t({options:e,command:n})):void ApiClient.getItem(Dashboard.getCurrentUserId(),e.ids[0]).then(function(t){e.items=[t],y.playWithCommand(e,n)})},y.unpause=function(){t({command:"Unpause"})},y.pause=function(){t({command:"Pause"})},y.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){y.playWithCommand({items:[e]},"Shuffle")})},y.instantMix=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){y.playWithCommand({items:[e]},"InstantMix")})},y.canQueueMediaType=function(e){return"Audio"==e},y.queue=function(e){y.playWithCommnd(e,"PlayLast")},y.queueNext=function(e){y.playWithCommand(e,"PlayNext")},y.stop=function(){t({command:"Stop"})},y.displayContent=function(e){t({options:e,command:"DisplayContent"})},y.mute=function(){t({command:"Mute"})},y.unMute=function(){y.setVolume(r()+2)},y.toggleMute=function(){var e=y.lastPlayerData||{};e=e.PlayState||{},e.IsMuted?y.unMute():y.mute()},y.getTargets=function(){return i()},y.seek=function(e){e=parseInt(e),e/=1e7,t({options:{position:e},command:"Seek"})},y.setAudioStreamIndex=function(e){t({options:{index:e},command:"SetAudioStreamIndex"})},y.setSubtitleStreamIndex=function(e){t({options:{index:e},command:"SetSubtitleStreamIndex"})},y.nextTrack=function(){t({options:{},command:"NextTrack"})},y.previousTrack=function(){t({options:{},command:"PreviousTrack"})},y.beginPlayerUpdates=function(){},y.endPlayerUpdates=function(){},y.volumeDown=function(){t({options:{},command:"VolumeDown"})},y.setRepeatMode=function(e){t({options:{RepeatMode:e},command:"SetRepeatMode"})},y.volumeUp=function(){t({options:{},command:"VolumeUp"})},y.setVolume=function(e){e=Math.min(e,100),e=Math.max(e,0),t({options:{volume:e},command:"SetVolume"})},y.getPlayerState=function(){return new Promise(function(e){var t=y.getPlayerStateInternal();e(t)})},y.lastPlayerData={},y.getPlayerStateInternal=function(e){return e=e||y.lastPlayerData,y.lastPlayerData=e,e},y.tryPair=function(e){return a.selectDevice(e.id).then(function(){var t=function(){p=e.id,f=e.name,setTimeout(s,2e3)};return a.joinApplication().then(t,function(){return a.launchApplication().then(t)})})},y.endSession=function(){y.stop(),setTimeout(function(){m(!0,!1)},1e3)},document.addEventListener("resume",d,!1),a.scanForDevices(g),n(a).on("disconnectWithError",u),n(a).on("deviceDidGoOffline",function(e,t){t.id==p&&u()})}var a=cordova.require("fw-cordova-chromecast.FWChromecast");MediaController.registerPlayer(new o)});