import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { fetchTerraData } from '@/lib/nasa-api';
import { toast } from 'sonner';

const LOCATIONS = [
  { id: 'dhaka', name: 'Dhaka', lat: 23.8103, lon: 90.4125, icon: '🏙️' },
  { id: 'chittagong', name: 'Chittagong', lat: 22.3569, lon: 91.7832, icon: '🚢' },
  { id: 'sylhet', name: 'Sylhet', lat: 24.8949, lon: 91.8687, icon: '🍃' },
  { id: 'khulna', name: 'Khulna', lat: 22.8456, lon: 89.5403, icon: '🌳' }
];

const CityAnalysis = () => {
  const [selectedCity, setSelectedCity] = useState(LOCATIONS[0]);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, [selectedCity]);

  const loadAnalysis = async () => {
    setLoading(true);
    try {
      const data = await fetchTerraData(selectedCity);
      setAnalysisData(data);
      toast.success(`Analysis loaded for ${selectedCity.name}`);
    } catch (error) {
      toast.error('Error loading analysis data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAirQualityStatus = () => {
    const co = parseFloat(analysisData?.mopitt?.carbonMonoxide || 0);
    if (co > 180) return { status: 'Poor', color: 'text-red-500', icon: AlertTriangle };
    if (co > 150) return { status: 'Moderate', color: 'text-yellow-500', icon: TrendingDown };
    return { status: 'Good', color: 'text-green-500', icon: TrendingUp };
  };

  const getTemperatureTrend = () => {
    const temp = parseFloat(analysisData?.ceres?.temperature || 0);
    if (temp > 32) return { trend: 'Rising', color: 'text-red-500', icon: TrendingUp };
    if (temp < 25) return { trend: 'Falling', color: 'text-blue-500', icon: TrendingDown };
    return { trend: 'Stable', color: 'text-green-500', icon: TrendingUp };
  };

  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">City Analysis</h2>
          <p className="text-xl text-muted-foreground">
            Real-time environmental analysis using NASA Terra data
          </p>
        </div>

        {/* City Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LOCATIONS.map((city) => (
            <Button
              key={city.id}
              variant={selectedCity.id === city.id ? 'default' : 'outline'}
              className={`h-auto py-6 ${
                selectedCity.id === city.id
                  ? 'bg-primary text-primary-foreground glow'
                  : 'glass border-primary/50'
              }`}
              onClick={() => setSelectedCity(city)}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">{city.icon}</span>
                <span className="font-bold">{city.name}</span>
              </div>
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Analyzing satellite data...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Overview Card */}
            <Card className="glass p-6 col-span-full">
              <h3 className="text-2xl font-bold mb-4">
                <span className="mr-2">{selectedCity.icon}</span>
                <span className="text-gradient">{selectedCity.name} Environmental Overview</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Air Quality</p>
                  <p className={`text-2xl font-bold ${getAirQualityStatus().color}`}>
                    {getAirQualityStatus().status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Temperature Trend</p>
                  <p className={`text-2xl font-bold ${getTemperatureTrend().color}`}>
                    {getTemperatureTrend().trend}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fire Risk</p>
                  <p className={`text-2xl font-bold ${
                    (analysisData?.modis?.totalFires || 0) > 5 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {(analysisData?.modis?.totalFires || 0) > 5 ? 'High' : 'Low'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Fire Detection Analysis */}
            <Card className="glass p-6">
              <h4 className="text-xl font-bold mb-4 text-red-500">🔥 Fire Detection (MODIS)</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Fires</span>
                  <span className="text-2xl font-bold">{analysisData?.modis?.totalFires || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">High Confidence</span>
                  <span className="text-2xl font-bold">{analysisData?.modis?.highConfidence || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg Brightness</span>
                  <span className="text-xl font-bold">{analysisData?.modis?.avgBrightness || 0}°K</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                  {(analysisData?.modis?.totalFires || 0) > 0
                    ? `⚠️ ${analysisData?.modis?.totalFires} fire(s) detected in the last 7 days. Monitor closely.`
                    : '✅ No active fires detected in the monitoring area.'}
                </p>
              </div>
            </Card>

            {/* Climate & Energy Analysis */}
            <Card className="glass p-6">
              <h4 className="text-xl font-bold mb-4 text-yellow-500">☀️ Climate Analysis (CERES)</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="text-2xl font-bold">{analysisData?.ceres?.temperature || 0}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Solar Radiation</span>
                  <span className="text-xl font-bold">{analysisData?.ceres?.solarRadiation || 0} W/m²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cloud Cover</span>
                  <span className="text-xl font-bold">{analysisData?.ceres?.cloudCover || 0}%</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                  {parseFloat(analysisData?.ceres?.temperature || 0) > 32
                    ? '🌡️ High temperature detected. Urban heat island effect likely.'
                    : '✅ Temperature within normal range for the region.'}
                </p>
              </div>
            </Card>

            {/* Air Quality Analysis */}
            <Card className="glass p-6">
              <h4 className="text-xl font-bold mb-4 text-purple-500">💨 Air Quality (MOPITT)</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">CO Level</span>
                  <span className="text-2xl font-bold">{analysisData?.mopitt?.carbonMonoxide || 0} ppbv</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Air Quality</span>
                  <span className="text-xl font-bold text-accent">{analysisData?.mopitt?.airQuality || 'Good'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Update</span>
                  <span className="text-sm">Monthly</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                  Carbon monoxide levels are monitored to assess air pollution from traffic and industry.
                </p>
              </div>
            </Card>

            {/* Aerosol Analysis */}
            <Card className="glass p-6">
              <h4 className="text-xl font-bold mb-4 text-blue-500">👁️ Aerosol Analysis (MISR)</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">AOD</span>
                  <span className="text-2xl font-bold">{analysisData?.misr?.aerosolOpticalDepth || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Visibility</span>
                  <span className="text-xl font-bold text-accent">{analysisData?.misr?.visibility || 'Clear'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Angles</span>
                  <span className="text-xl font-bold">9</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                  Multi-angle observations provide detailed atmospheric particle analysis.
                </p>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="glass p-6 col-span-full bg-gradient-to-r from-primary/10 to-accent/10">
              <h4 className="text-xl font-bold mb-4">📊 Analysis Summary & Recommendations</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-primary mb-2">Current Status</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Temperature: {getTemperatureTrend().trend}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Air Quality: {getAirQualityStatus().status}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Fire Risk: {(analysisData?.modis?.totalFires || 0) > 5 ? 'High' : 'Low'}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-primary mb-2">Recommendations</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Continue monitoring fire activity in agricultural areas</li>
                    <li>• Track temperature trends for heat wave prediction</li>
                    <li>• Monitor air quality during winter months</li>
                    <li>• Assess cloud cover for monsoon forecasting</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default CityAnalysis;
