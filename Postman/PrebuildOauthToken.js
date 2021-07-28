/*
    @params in local/global variables
        url - host of authorization server
        client_id - user id
        client_secret - user secret

    @AutoGenerated params
        access_token - auto insert valid token
        access_token_expiry - calculate when token is expired
*/
const echoPostRequest = {
    url: 'https://' + pm.environment.get("url") + '/authorizationserver/oauth/token',
    method: 'POST',
    header: 'Content-Type:application/json',
    body: {
        mode: 'urlencoded',
        urlencoded: [
            {key: "client_id", value: pm.environment.get("client_id")},
            {key: "client_secret", value: pm.environment.get("client_secret")},
            {key: "grant_type", value: "client_credentials"},
        ]
    }
};

var getToken = true;

if (!pm.environment.get('access_token_expiry') ||
    !pm.environment.get('access_token')) {
    console.log('Token or expiry date are missing')
} else if (pm.environment.get('access_token_expiry') <= (new Date()).getTime()) {
    console.log('Token is expired')
} else {
    getToken = false;
    console.log('Token and expiry date are all good');
}

if (getToken === true) {
    pm.sendRequest(echoPostRequest, function (err, res) {
        console.log(err ? err : res.json());
        if (err === null) {
            console.log('Saving the token and expiry date')
            var responseJson = res.json();
            pm.environment.set('access_token', responseJson.access_token)

            var expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + responseJson.expires_in);
            pm.environment.set('access_token_expiry', expiryDate.getTime());
        }
    });
}