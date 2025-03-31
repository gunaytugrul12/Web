const cityInput= document.getElementById("cityInput");
const searchBtn= document.getElementById("searchBtn");
const weatherResult= document.getElementById("weatherResult");


const API_KEY='c841d1048c2b4feedc13e85a9775c505';
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function getWeather(city){
    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=tr`)
    .then(Response=> Response.json())
    .then(data =>{
        if(data.cod !==200){
            weatherResult.innerHTML= "Şehir Bulunamadı";
            return;
        }
        const temperature= data.main.temp;
        const description= data.weather[0].description;
        const weatherMain= data.weather[0].main;
        const cityName= data.name;

        changeBackground(temperature,weatherMain);

        weatherResult.innerHTML=`
        <h2>${cityName}</h2>
        <p>${temperature}°C - ${description}</p>
    `;
    })
    .catch(error=>{
        console.error("Hata:",error);
        weatherResult.innerHTML="Hava durumu bilgisi alınamadı!";
    });
}

function changeBackground(temp,weatherMain){
    document.body.style.backgroundColor= temp>15 ?"orange":"lightblue";
    if(temp<0){
        document.body.style.backgroundColor="blue";
    }

    let backgroundImage= "";
    switch (weatherMain){
        case "Clear":
            backgroundImage ="url('./images/sun.png')";//güneş
            break;
            case "Clouds":
                backgroundImage="url('./images/clouds.png')";//nbulut
                case "Rain":
                    backgroundImage="url('./images/rain.png')"
                    break;
                    case "Snow":
                    backgroundImage="url('./images/snow.png')"
                    break;
                    default:
                        backgroundImage="";
                        break;
    }
    document.getElementById("imageBox").style.backgroundImage=backgroundImage;
    document.getElementById("imageBox").style.backgroundSize="cover";
    document.getElementById("imageBox").style.backgroundRepeat="no-repeat";
    
}

searchBtn.addEventListener("click",()=>{

    const city=cityInput.value.trim();
    if(city){
        getWeather(city);
    }else{
        weatherResult.innerHTML="Lütfen bir şehir girin";
    }
});

cityInput.addEventListener("keypress",(event)=>{

    if(event.key==="Enter"){
        searchBtn.click();
    }
});
