// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
let project_data = {};
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
const { request, response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
// Callback to debug
const port = 3000;
app.listen(port,callBack);
function callBack(){
    console.log(`listening on port ${port}`);
}


// Initialize all route with a callback function
app.get('/all',getALL);
// Callback function to complete GET '/all'
function getALL(request,response){
    response.send(project_data);
}
//get a specific zip code data
app.get('/getCodeData',getCode);
function getCode(request,response){
    response.send(project_data[`${request.code}`]);
}
// Post Route
app.post('/add',addData);
function addData(request,response){
    //create or modify the specified entry of zip code entered with the data.
    project_data = {'zip': request.userResponse.code,'feeling':request.userResponse.feeling,'date':request.date,'temp':request.temp};
}
