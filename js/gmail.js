//GMail API info (only works for requests from this domain)
var clientId = '239131988494-bdeh799j6rm275f41eedllvjk0lfqapc.apps.googleusercontent.com';
var apiKey = 'Q8Q-q0zGGfCucsyxt5mWgWHN';
var scopes ='https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send';
function handleClientLoad() {
    console.log('handleClientLoad()');
    gapi.auth2.init({
        client_id:clientId
    })
    .then(function(onInit, onError){
        console.log(onInit);
        console.log(onError);
    })
}