

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&APPID=e112f04b374270a8b948f65603e3dbef';

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',generateData);
/* Function called by event listener */
function generateData(event){

    const zip =  document.getElementById('zip').value;
    const feeling =  document.getElementById('feelings').value;
    
    getApiWeather(baseURL,zip,apiKey)
    .then(function(temp){
        postData('/add',{'temp':temp,'date':newDate,'feeling':feeling});
    })
    .then(function(){
        updateUI();
    })
}
/* Function to GET Web API Data*/
const getApiWeather = async(baseUrl,zipCode,key)=>{
    const req = await fetch(baseUrl+zipCode+key);
    try{
        const weatherData = await req.json();
        //add the data to project end point
        //console.log(weatherData.main.temp);
        return weatherData.main.temp;
    }
    catch(error){
        console.log(error);
    }
}
/* Function to POST data */
const postData = async (url='',data={})=>{
    const response = await fetch(url,{
        method:'POST',
        credentials:"same-origin",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        return newData;
    }
    catch(error){
        console.log(error);
    }
}

/* Function to GET Project Data */
const getProjectData = async ()=>{
    const req = await fetch('/all');
    try{
        const data = await req.json();
        return data;
    }
    catch(error){
        console.log(error);
    }

}
// function to read the project data end point and update the UI with it
const updateUI = async()=>{
    const req = await fetch('/all');
    try{
        const ProjectData = await req.json();
        console.log(ProjectData);
        document.getElementById('date').innerHTML = "date: "+ProjectData.date;
        document.getElementById('temp').innerHTML = "temp: "+ProjectData.temp;
        document.getElementById('content').innerHTML = "Your feeling is: "+ProjectData.feeling;
    }
    catch(error){
        console.log(error);
    }
}


//getApiWeather(baseURL,"99501",apiKey);