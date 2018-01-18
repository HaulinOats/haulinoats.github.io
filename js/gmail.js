//GMail API info (only works for requests from this domain)
var clientId = '239131988494-bdeh799j6rm275f41eedllvjk0lfqapc.apps.googleusercontent.com';
var apiKey = 'Q8Q-q0zGGfCucsyxt5mWgWHN';
var scopes ='https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send';
function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}
function checkAuth() {
    gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
    }, handleAuthResult);
}
function handleAuthResult(authResult) {
    console.log('authResult: ', authResult);
    if(authResult && !authResult.error) {
        loadGmailApi();
        $('#authorize-button').remove();
        $('.table-inbox').removeClass("hidden");
        $('#compose-button').removeClass("hidden");
    } else {
        $('#authorize-button').removeClass("hidden");
        $('#authorize-button').on('click', function(){
            handleAuthClick();
        });
    }
}