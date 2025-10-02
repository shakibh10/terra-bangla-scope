import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Flame, Mountain, Wind, Eye, Sun, MapPin } from 'lucide-react';
import InstrumentPanel from '@/components/InstrumentPanel';
import { fetchTerraData } from '@/lib/nasa-api';
import { toast } from 'sonner';

const LOCATIONS = [
  { id: 'dhaka', name: 'Dhaka', lat: 23.8103, lon: 90.4125, description: 'Urban Heat Island Monitoring', icon: '🏙️' },
  { id: 'chittagong', name: 'Chittagong', lat: 22.3569, lon: 91.7832, description: 'Coastal Environmental Changes', icon: '🚢' },
  { id: 'sylhet', name: 'Sylhet', lat: 24.8949, lon: 91.8687, description: 'Tea Region Vegetation Health', icon: '🍃' },
  { id: 'khulna', name: 'Khulna', lat: 22.8456, lon: 89.5403, description: 'Sundarbans Mangrove Health', icon: '🌳' }
];

const INSTRUMENTS = [
  { id: 'modis', name: 'MODIS', fullName: 'Fire Detection & Imagery', icon: Flame, color: 'text-red-500' },
  { id: 'aster', name: 'ASTER', fullName: 'Surface Temperature & Elevation', icon: Mountain, color: 'text-orange-500' },
  { id: 'mopitt', name: 'MOPITT', fullName: 'Carbon Monoxide Pollution', icon: Wind, color: 'text-purple-500' },
  { id: 'misr', name: 'MISR', fullName: 'Multi-angle Aerosol Monitoring', icon: Eye, color: 'text-blue-500' },
  { id: 'ceres', name: 'CERES', fullName: 'Earth Radiation & Energy Balance', icon: Sun, color: 'text-yellow-500' }
];

const Dashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [selectedInstrument, setSelectedInstrument] = useState(INSTRUMENTS[0]);
  const [terraData, setTerraData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedLocation]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchTerraData(selectedLocation);
      setTerraData(data);
      toast.success(`Data loaded for ${selectedLocation.name}`);
    } catch (error) {
      toast.error('Error loading satellite data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">Live Satellite Dashboard</h2>
          <p className="text-xl text-muted-foreground">
            Real-time environmental data from NASA's Terra satellite
          </p>
        </div>

        {/* Location Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOCATIONS.map((location) => (
            <Card
              key={location.id}
              className={`glass p-6 cursor-pointer transition-all hover:scale-105 ${
                selectedLocation.id === location.id ? 'ring-2 ring-primary glow' : ''
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">{location.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{location.name}</h3>
                <p className="text-sm text-muted-foreground">{location.description}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-primary">
                  <MapPin className="w-3 h-3" />
                  <span>{location.lat.toFixed(4)}°N, {location.lon.toFixed(4)}°E</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Instrument Tabs */}
        <Tabs defaultValue="modis" className="w-full">
          <TabsList className="glass w-full grid grid-cols-5 h-auto p-2 gap-2">
            {INSTRUMENTS.map((instrument) => (
              <TabsTrigger
                key={instrument.id}
                value={instrument.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-4 px-2"
                onClick={() => setSelectedInstrument(instrument)}
              >
                <div className="flex flex-col items-center gap-2">
                  <instrument.icon className={`w-6 h-6 ${instrument.color}`} />
                  <span className="font-bold text-xs md:text-sm">{instrument.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {INSTRUMENTS.map((instrument) => (
            <TabsContent key={instrument.id} value={instrument.id} className="mt-6">
              <Card className="glass p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{instrument.name}</h3>
                    <p className="text-muted-foreground">{instrument.fullName}</p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground px-4 py-2">
                    {loading ? 'Loading...' : 'Live Data'}
                  </Badge>
                </div>

                <InstrumentPanel
                  instrument={instrument.id}
                  location={selectedLocation}
                  data={terraData}
                  loading={loading}
                />
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Dashboard;
