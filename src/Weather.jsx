import { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const api_key = "4d746f311bfb306a2330f7c9e2961c9d";
  const handleData = async () => {
    try {
      setError("");
      const responce = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );
      const liveData = await responce.json();
      setWeather(liveData);
      if (!responce.ok) throw new Error("City not found");
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  return (
    <>
      {/* ---------TOP--------- */}

      <div className="bg-cover h-screen bg-[url('./assets/bgw.jpg')] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-black/50 rounded-2xl shadow-2xl text-white p-5 backdrop-blur-xl">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            Weather 🌍
          </h1>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter City Name"
              className="placeholder:text-sm text-lg text-white rounded-md p-2 font-semibold bg-transparent border-t border-b border-t-white border-b-neutral-800 focus:outline-none focus:border-t-white focus:border-b-neutral-800 focus:border-b-black focus:shadow-[0px_2px_8px_#00000020] transition duration-800 ease shadow-xl "
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleData()}
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 px-12 py-2 rounded-md font-semibold text-md"
              onClick={handleData}
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          {weather && (
            <>
              {/* ---------Main-mid--------- */}

              <div className="flex flex-col items-center justify-center mt-5">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather-icon"
                  className="mx-auto h-30 object-contain"
                />

                <h1 className="md-4 text-2xl font-semibold">
                  {weather.name}/{weather.sys.country}
                </h1>

                <p className="mt-2 text-md font-medium">
                  {weather.weather[0].description}
                </p>

                <p className="mt-2 text-2xl font-extrabold">
                  {weather.main.temp}°C
                </p>
              </div>

              {/* ---------Footer--------- */}

              <div className="grid md:grid-cols-3 sm:grid-col-1 gap-1 md:gap-4 text-sm place-items-center mt-6  ">
                <div className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 grid place-items-center">
                  <p className="text-white font-semibold ">Humidity</p>
                  <p className="text-white text-xs">{weather.main.humidity}%</p>
                </div>
                <div className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 grid place-items-center">
                  <p className="text-white font-semibold ">Wind</p>
                  <p className="text-white text-xs">{weather.wind.speed} ms</p>
                </div>
                <div className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 grid place-items-center">
                  <p className="text-white font-semibold ">Cloud</p>
                  <p className="text-white text-xs">{weather.clouds.all}%</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
