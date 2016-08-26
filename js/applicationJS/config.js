/**
 * @author pa00127946
 */


//@Development
var verify_user = "http://10.15.102.197:8080/UMPWebContainer/UMPRequestProcessor";

//Input Payload

var head = "{\"MESSAGE\" : {\"HEADER\" : {\"LOGIN\" : \"gr00107978@TechMahindra\"},\"PAYLOAD\"";
var session = "\"SESSION\": {\"LATITUDE\": \"0.0\",\"LONGITUDE\": \"0.0\",\"APP\": \"GascoTest\", \"ORG\": \"TechMahindra\",\"TRANSACTION\": \"LOGIN\",\"KEY\": \"LOGIN/ID\",\"TYPE\": \"LOGIN\",\"CHANNEL\": \"b2c\"}}}";
var globalErrorMsg = {};
globalErrorMsg.entervalidCredentials = 'Please enter valid Credentials.';
