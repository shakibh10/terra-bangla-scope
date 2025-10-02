const API_CONFIG = {
  nasaApiKey: 'ergBLMygalCMreEXyWzadwomDUdbqppdTtFJTMmO',
  firmsMapKey: '3bf8983f8e11b3ad84c70300281d6008',
  earthdataToken: 'eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiVXNlciIsInVpZCI6InNoYWtpaGFzYW4xMDcwIiwiZXhwIjoxNzY0MjAxNTk5LCJpYXQiOjE3NTg5NDUwMzYsImlzcyI6Imh0dHBzOi8vdXJzLmVhcnRoZGF0YS5uYXNhLmdvdiIsImlkZW50aXR5X3Byb3ZpZGVyIjoiZWRsX29wcyIsImFjciI6ImVkbCIsImFzc3VyYW5jZV9sZXZlbCI6M30.1kQCf58ZMBXnxPv5M_hMsKigsTNYy0O0IA43WAEiEDUONst9QmMEqdHBEd3_ciiLKBje2T4DKNQBKQ5WcZWETSjxfBelTyhkyZHt9Jrt9AkNiaJzGgCNmN9jbhJOdQGTZ_YBC7X0PE_wukOuDte5w43qTBbxWLl3dJ-Rel1vhVtis7zqsQ4fwu53Ivxfh-zQFlerJiJRkLOjvp0MHB7VNrezghwIdh3E06bthKoP3l0HOc0iNJzkc9b6IsDRcGuaN-Y1dLavhiHoe3eL9lOADSTMhIOK5dPW00QfsbzK8cdlCF2kO8uSOmz89RwvvQgm3hOnyud-DL0_stkUt1LKqw'
};

const getBbox = (lat: number, lon: number) => {
  return `${lon-2},${lat-2},${lon+2},${lat+2}`;
};

export const fetchMODISFires = async (location: any) => {
  const bbox = getBbox(location.lat, location.lon);
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/json/${API_CONFIG.firmsMapKey}/MODIS_NRT/${bbox}/7`;
  
  try {
    const response = await fetch(url);
    const fires = await response.json();
    
    return {
      fires: Array.isArray(fires) ? fires : [],
      totalFires: Array.isArray(fires) ? fires.length : 0,
      highConfidence: Array.isArray(fires) ? fires.filter((f: any) => f.confidence > 80).length : 0,
      avgBrightness: Array.isArray(fires) && fires.length > 0 ? 
        (fires.reduce((sum: number, f: any) => sum + f.brightness, 0) / fires.length).toFixed(1) : '0',
      avgFRP: Array.isArray(fires) && fires.length > 0 ?
        (fires.reduce((sum: number, f: any) => sum + (f.frp || 0), 0) / fires.length).toFixed(2) : '0'
    };
  } catch (error) {
    console.error('MODIS API Error:', error);
    return { fires: [], totalFires: 0, highConfidence: 0, avgBrightness: '0', avgFRP: '0' };
  }
};

export const fetchCERESData = async (location: any) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 7);
  
  const start = startDate.toISOString().split('T')[0].replace(/-/g, '');
  const end = today.toISOString().split('T')[0].replace(/-/g, '');
  
  const url = `https://power.larc.nasa.gov/api/temporal/daily/point`;
  const params = new URLSearchParams({
    parameters: 'ALLSKY_SFC_SW_DWN,ALLSKY_SFC_LW_DWN,T2M,PRECTOTCORR,CLOUD_AMT,RH2M,WS10M',
    community: 'RE',
    longitude: location.lon.toString(),
    latitude: location.lat.toString(),
    start: start,
    end: end,
    format: 'JSON'
  });
  
  try {
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();
    const param = data.properties.parameter;
    
    const getLatest = (p: string) => {
      const values = Object.values(param[p] || {});
      return values[values.length - 1] || 0;
    };
    
    return {
      solarRadiation: (getLatest('ALLSKY_SFC_SW_DWN') as number).toFixed(1),
      longwaveRadiation: (getLatest('ALLSKY_SFC_LW_DWN') as number).toFixed(1),
      temperature: (getLatest('T2M') as number).toFixed(1),
      precipitation: (getLatest('PRECTOTCORR') as number).toFixed(2),
      cloudCover: (getLatest('CLOUD_AMT') as number).toFixed(0),
      humidity: (getLatest('RH2M') as number).toFixed(0),
      windSpeed: (getLatest('WS10M') as number).toFixed(1),
      energyBalance: ((getLatest('ALLSKY_SFC_SW_DWN') as number) - (getLatest('ALLSKY_SFC_LW_DWN') as number)).toFixed(1)
    };
  } catch (error) {
    console.error('CERES API Error:', error);
    return {
      solarRadiation: '185', longwaveRadiation: '380', temperature: '28',
      precipitation: '2.5', cloudCover: '45', humidity: '75', windSpeed: '3.5', energyBalance: '-195'
    };
  }
};

export const fetchTerraData = async (location: any) => {
  const [modis, ceres] = await Promise.all([
    fetchMODISFires(location),
    fetchCERESData(location)
  ]);
  
  // Simulated data for other instruments (GIBS visualization available)
  const baseAOD = location.id === 'dhaka' ? 0.35 : 0.18;
  const baseCO = location.id === 'dhaka' ? 180 : 120;
  
  return {
    modis,
    aster: {
      elevation: Math.floor(Math.random() * 100) + 20,
      surfaceTemp: (parseFloat(ceres.temperature) + Math.random() * 3).toFixed(1),
      landCover: 'Urban/Agricultural',
      resolution: '15-90m'
    },
    mopitt: {
      carbonMonoxide: (baseCO + Math.random() * 50).toFixed(1),
      airQuality: baseCO > 160 ? 'Moderate' : baseCO > 130 ? 'Good' : 'Excellent',
      units: 'ppbv',
      coverage: 'Monthly'
    },
    misr: {
      aerosolOpticalDepth: (baseAOD + Math.random() * 0.15).toFixed(3),
      visibility: baseAOD > 0.35 ? 'Hazy' : baseAOD > 0.25 ? 'Moderate' : 'Clear',
      angles: 9,
      cloudHeight: (Math.random() * 8 + 2).toFixed(1) + ' km'
    },
    ceres
  };
};
