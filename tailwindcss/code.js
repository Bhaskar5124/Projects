
const city = document.querySelector("#input");
const sbutton = document.querySelector("#searchbutton");
const select = document.querySelector("#myselect");
const wimg = document.querySelector("#weatherimg");
const wb = document.querySelector("#weatherbox");
const outputlabel = document.querySelector("#label");
wb.classList.add("defaultweather");


//Method to select any recently searched city from dropdown to input field
select.addEventListener("click", dropdownfunc);
function dropdownfunc(){
    city.value = select.options[select.selectedIndex].text;
}



sbutton.addEventListener("click", data);
function data(){


    //Storing inout data into dropdown Menu
    var option = document.createElement("option");
        option.innerHTML = city.value;
        select.appendChild(option);
    


    setTimeout(()=>{
        try{  
            async function fetchdata(){
                //Ensuring input should be a city name
                if(city.value == ''){
                    return outputlabel.textContent = "Please enter any city name";
                }else{
                    outputlabel.textContent = '';
                }
                

                //Fetching data form weather API for the day
                let pdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=+${city.value}+&appid=8fa9d55603e2e3480f5b8e3f0cee7138&units=metric`);
                let fdata = await pdata.json();

                console.log(fdata);

                const unixTimestampdate = fdata.dt;
                const date = new Date(unixTimestampdate * 1000);
                //const datetime = date.toLocaleString([],{hour:"2-digit",minute:"2-digit",});
                //console.log(date.toString());
                document.querySelector("#date").innerHTML = date;
                document.querySelector("#city").innerHTML = fdata.name;

                document.querySelector("#temperature").innerHTML = fdata.main.temp;
                document.querySelector("#mintemp").textContent = fdata.main.temp_min;
                document.querySelector("#maxtemp").innerHTML = fdata.main.temp_max;
                document.querySelector("#wind").innerHTML = fdata.wind.speed;
                document.querySelector("#humidity").innerHTML = fdata.main.humidity;
                document.querySelector("#pressure").innerHTML = fdata.main.pressure;
                document.querySelector("#feel").innerHTML = fdata.main.feels_like;

                //Changing image as per the sky condition for the day
                wimg.src = `/imgs/${fdata.weather[0].main}.png`;

                //Calcuting sunrise time from UTC format
                const unixTimestampsr = fdata.sys.sunrise;
                const sr = new Date(unixTimestampsr * 1000);
                const sunrisetime = sr.toLocaleString([],{hour:"2-digit",minute:"2-digit",});
                document.querySelector("#sunrise").innerHTML = sunrisetime;

                //Calcuting sunset time from UTC format
                const unixTimestampss = fdata.sys.sunset;
                const ss = new Date(unixTimestampss * 1000);
                const sunsettime = ss.toLocaleString([],{hour:"2-digit",minute:"2-digit",});
                document.querySelector("#sunset").innerHTML = sunsettime;


                //Changing background image after sunrise to night mode
                if(fdata.dt<fdata.sys.sunset){
                    wb.classList.add("day");
                }
                else{
                    wb.classList.add("night");
                }


                //Fetching data from API which is giving 5 day weather report
                let partialdata = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=+${city.value}+&appid=8fa9d55603e2e3480f5b8e3f0cee7138&units=metric`);
                let extendedweatherdata = await partialdata.json();

                console.log(extendedweatherdata);

                
                const nd1fulldate = new Date(extendedweatherdata.list[10].dt * 1000);
                document.querySelector("#nd1date").innerHTML = nd1fulldate.toLocaleString('locale',{weekday:'short', month:'short',})+' '+nd1fulldate.getDate();
                document.querySelector("#nd1min").innerHTML = extendedweatherdata.list[10].main.temp_min;
                document.querySelector("#nd1max").innerHTML = extendedweatherdata.list[10].main.temp_max;
                document.querySelector("#nd1sky").innerHTML = extendedweatherdata.list[10].weather[0].main;


                const nd2fulldate = new Date(extendedweatherdata.list[18].dt * 1000);
                document.querySelector("#nd2date").innerHTML = nd2fulldate.toLocaleString('locale',{weekday:'short', month:'short',})+' '+nd2fulldate.getDate();
                document.querySelector("#nd2min").innerHTML = extendedweatherdata.list[18].main.temp_min;
                document.querySelector("#nd2max").innerHTML = extendedweatherdata.list[18].main.temp_max;
                document.querySelector("#nd2sky").innerHTML = extendedweatherdata.list[18].weather[0].main;


                const nd3fulldate = new Date(extendedweatherdata.list[26].dt * 1000);
                document.querySelector("#nd3date").innerHTML = nd3fulldate.toLocaleString('locale',{weekday:'short', month:'short',})+' '+nd3fulldate.getDate();
                document.querySelector("#nd3min").innerHTML = extendedweatherdata.list[26].main.temp_min;
                document.querySelector("#nd3max").innerHTML = extendedweatherdata.list[26].main.temp_max;
                document.querySelector("#nd3sky").innerHTML = extendedweatherdata.list[26].weather[0].main;


                const nd4fulldate = new Date(extendedweatherdata.list[34].dt * 1000);
                document.querySelector("#nd4date").innerHTML = nd4fulldate.toLocaleString('locale',{weekday:'short', month:'short',})+' '+nd4fulldate.getDate();
                document.querySelector("#nd4min").innerHTML = extendedweatherdata.list[34].main.temp_min;
                document.querySelector("#nd4max").innerHTML = extendedweatherdata.list[34].main.temp_max;
                document.querySelector("#nd4sky").innerHTML = extendedweatherdata.list[34].weather[0].main;


                const nd5fulldate = new Date(extendedweatherdata.list[39].dt * 1000);
                document.querySelector("#nd5date").innerHTML = nd5fulldate.toLocaleString('locale',{weekday:'short', month:'short',})+' '+nd5fulldate.getDate();
                document.querySelector("#nd5min").innerHTML = extendedweatherdata.list[39].main.temp_min;
                document.querySelector("#nd5max").innerHTML = extendedweatherdata.list[39].main.temp_max;
                document.querySelector("#nd5sky").innerHTML = extendedweatherdata.list[39].weather[0].main;




                
            }
            fetchdata();
        }catch(err){
            console.log(`Error Timeout ${err}`);
        }
    
    },1000);
}





