
var PushNotification = function() {
};


	// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
	PushNotification.prototype.register = function(successCallback, errorCallback, options) {
    	if (errorCallback == null) { errorCallback = function() {}}

		if (typeof errorCallback != "function")  {
			console.log("PushNotification.register failure: failure parameter not a function");
			return;
		}

		if (typeof successCallback != "function") {
			console.log("PushNotification.register failure: success callback parameter must be a function");
			return;
		}

		cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
	};

    // Call this to unregister for push notifications
    PushNotification.prototype.unregister = function(successCallback, errorCallback) {
		if (errorCallback == null) { errorCallback = function() {}}

		if (typeof errorCallback != "function")  {
			console.log("PushNotification.unregister failure: failure parameter not a function");
			return;
		}

		if (typeof successCallback != "function") {
			console.log("PushNotification.unregister failure: success callback parameter must be a function");
			return;
		}

		cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
    };
 
 
    // Call this to set the application icon badge
    PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, badge) {
		if (errorCallback == null) { errorCallback = function() {}}

		if (typeof errorCallback != "function")  {
			console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
			return;
		}

		if (typeof successCallback != "function") {
			console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
			return;
		}

		cordova.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
    };

//-------------------------------------------------------------------

if(!window.plugins) {
	window.plugins = {};
}
if (!window.plugins.pushNotification) {
	window.plugins.pushNotification = new PushNotification();
}

var pushNotification;
            
            function onDeviceReady() {
                $("#app-status-ul").append('<li>deviceready event received</li>');
                
				document.addEventListener("backbutton", function(e)
				{
                	$("#app-status-ul").append('<li>backbutton event received</li>');
  					
      				if( $("#home").length > 0)
					{
						// call this to get a new token each time. don't call it to reuse existing token.
						//pushNotification.unregister(successHandler, errorHandler);
						e.preventDefault();
						navigator.app.exitApp();
					}
					else
					{
						navigator.app.backHistory();
					}
				}, false);
			
				try 
				{ 
                	pushNotification = window.plugins.pushNotification;
                	if (device.platform == 'android' || device.platform == 'Android') {
						$("#app-status-ul").append('<li>registering android</li>');
                    	pushNotification.register(successHandler, errorHandler, {"senderID":"422369111973","ecb":"onNotificationGCM"});		// required!
					} else {
						$("#app-status-ul").append('<li>registering iOS</li>');
                    	pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
                	}
                }
				catch(err) 
				{ 
					txt="There was an error on this page.\n\n"; 
					txt+="Error description: " + err.message + "\n\n"; 
					//alert(txt); 
				} 
            }
            
            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                     /*$("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     navigator.notification.alert(e.alert);*/
                }
                    
                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }
                
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            
            // handle GCM notifications for Android
            function onNotificationGCM(e) {
                $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
                
                switch( e.event )
                {
                    case 'registered':
					if ( e.regid.length > 0 )
					{
						PushWoosh.appCode = "D1073-040C1";
            			PushWoosh.register(e.regid, function(data) {
                        	//alert("PushWoosh register success: " + JSON.stringify(data));}, function(errorregistration) {
                         	//alert("Couldn't register with PushWoosh" +  errorregistration);
                    		});
						$("#app-status-ul").append('<li>REGISTERED -> REGID:<p id="regid">' + e.regid + "</p></li>");
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
						//console.log("regID = " + e.regid);
						localStorage.device_id=e.regid;
					}
                    break;
                    
                    case 'message':
                    	// if this flag is set, this notification happened while we were in the foreground.
                    	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    	if (e.foreground)
                    	{
							$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
							
							// if the notification contains a soundname, play it.
							var my_media = new Media("/android_asset/www/"+e.soundname);
							my_media.play();
						}
						else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart)
								$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
							else
							$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
						}
							
						$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
						$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                    break;
                    
                    case 'error':
						$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
						$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                $("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
			
            function successHandler (result) {
                $("#app-status-ul").append('<li>success:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                $("#app-status-ul").append('<li>error:'+ error +'</li>');
            }
            
			document.addEventListener('deviceready', onDeviceReady, true);
