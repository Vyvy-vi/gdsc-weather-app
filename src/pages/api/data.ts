import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

interface WeatherForecastAPIResponse {
  cod: string;
  msg: number;
  cnt: number;
  list: WeatherData[];
}

interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface GeoData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") || "phagwara";

  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );

  const geoData: GeoData[] = await res.json();

  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  const res2 = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
  const weatherData: WeatherForecastAPIResponse = await res2.json();
  console.log(weatherData.list[0]);

  return new Response(JSON.stringify(weatherData), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
