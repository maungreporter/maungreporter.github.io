

// var martyrList = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g/values/[MM]Detail Cases?key=AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw');
// var martyrList = []
//         function makeApiCall() {
//             console.log("Make API Call");
//           var params = {
//             // The ID of the spreadsheet to retrieve data from.
//             spreadsheetId: '1PYlfnHxUJFc_GYtFCpcvAIb3QbxYtBGQq9Ra2eltT3g',  // TODO: Update placeholder value.
    
//             // The A1 notation of the values to retrieve.
//             range: 'Detail Cases',  // TODO: Update placeholder value.
    
//             // How values should be represented in the output.
//             // The default render option is ValueRenderOption.FORMATTED_VALUE.
//             valueRenderOption: 'FORMATTED_VALUE',  // TODO: Update placeholder value.
    
//             // How dates, times, and durations should be represented in the output.
//             // This is ignored if value_render_option is
//             // FORMATTED_VALUE.
//             // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
//             dateTimeRenderOption: 'FORMATTED_STRING',  // TODO: Update placeholder value.
//           };
    
//           var request = gapi.client.sheets.spreadsheets.values.get(params);
//           request.then(function(response) {
//             // TODO: Change code below to process the `response` object:
            
//             console.log(response.result.values[2]);
//             martyrList= response.result.values;
//             console.log("api martyrlist" + martyrList);
//             martyrVM.martyrList = martyr
//           }, function(reason) {
//             console.error('error: ' + reason.result.error.message);
//           });
//         }
    
//         function initClient() {
//           var API_KEY = 'AIzaSyBuoa3iAy6JtfpBUpcqL4k1gsrMT631TPw';  // TODO: Update placeholder with desired API key.
    
//           var CLIENT_ID = '733294314965-96ipml82ri3665chv4uugqblvsh4dspf.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.
    
//           // TODO: Authorize using one of the following scopes:
//           //   'https://www.googleapis.com/auth/drive'
//           //   'https://www.googleapis.com/auth/drive.file'
//           //   'https://www.googleapis.com/auth/drive.readonly'
//           //   'https://www.googleapis.com/auth/spreadsheets'
//           //   'https://www.googleapis.com/auth/spreadsheets.readonly'
//           var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
    
//           gapi.client.init({
//             'apiKey': API_KEY,
//             'clientId': CLIENT_ID,
//             'scope': SCOPE,
//             'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//           }).then(function() {
//             gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
//             updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//           });
//         }
    
//         function handleClientLoad() {
//           gapi.load('client:auth2', initClient);
//         }
    
//         function updateSignInStatus(isSignedIn) {
//           if (isSignedIn) {
//             makeApiCall();
//           }
//         }
    
//         function handleSignInClick(event) {
//           gapi.auth2.getAuthInstance().signIn();
//         }
    
//         function handleSignOutClick(event) {
//           gapi.auth2.getAuthInstance().signOut();
//         }

        