/* ============================================================
   WEATHER.JS — API meteorológica para HERENCIA IA
//    ============================================================ */

const WeatherAPI = {

    key: "",

    async get(query){

        if(!this.key) return "⚠️ Weather API no configurada.";

        const city = query.replace(/clima|tiempo|clima en/gi, "").trim();

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${this.key}&units=metric&lang=es`;

        try{
            const res = await fetch(url);
            const data = await res.json();
            if(data.cod !== 200) return "Ciudad no encontrada.";
            return {
                ciudad: data.name,
                temperatura: data.main.temp,
                descripcion: data.weather[0].description,
                humedad: data.main.humidity,
                viento: data.wind.speed
            };
        }catch(e){
            console.error("Weather Error:", e);
            return null;
        }
    },

    setKey(k){
        this.key = k;
    },

    expose(){
        window.WeatherAPI = this;
    }
};

WeatherAPI.expose();