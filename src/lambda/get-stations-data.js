import axios from "axios";

export async function handler(event) {
  const token = event.queryStringParameters["token"];

  const headers = {
    headers: { Authorization: `Bearer ${token}` }
  };

  try {
    const stationsRequest = axios.get(
      "https://api.netatmo.com/api/getstationsdata",
      headers
    );

    const homeCoachsRequest = axios.get(
      "https://api.netatmo.com/api/gethomecoachsdata",
      headers
    );

    const [stationsData, homeCoachsData] = await axios.all([
      stationsRequest,
      homeCoachsRequest
    ]);

    const stations = [];

    stationsData.data.body.devices.map(device => {
      stations.push(mapData(device));
      device.modules.map(module => {
        stations.push(mapData(module));
      });
    });

    homeCoachsData.data.body.devices.map(device => {
      stations.push(mapData(device));
    });

    return {
      statusCode: 200,
      body: JSON.stringify(stations)
    };
  } catch (error) {
    const { status, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, error: data.error })
    };
  }
}

function mapData(station) {
  return {
    id: station._id,
    name: station.module_name || station.station_name,
    type: mapType(station.type),
    temperature: station.dashboard_data.Temperature,
    humidity: station.dashboard_data.Humidity,
    co2: station.dashboard_data.CO2
  };
}

function mapType(stationType) {
  switch (stationType) {
    case "NAMain":
    case "NAModule4":
    case "NHC":
      return "indoor";
    case "NAModule1":
      return "outdoor";
    default:
      null;
  }
}
