import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Clock, Calendar, Play, Pause } from 'lucide-react';

const LOCATIONS = [
  { id: 'dhaka', name: 'Dhaka', icon: '🏙️' },
  { id: 'chittagong', name: 'Chittagong', icon: '🚢' },
  { id: 'sylhet', name: 'Sylhet', icon: '🍃' },
  { id: 'khulna', name: 'Khulna', icon: '🌳' }
];

const TimeMachine = () => {
  const [selectedCity, setSelectedCity] = useState(LOCATIONS[0]);
  const [year, setYear] = useState([2025]);
  const [isPlaying, setIsPlaying] = useState(false);

  const yearData = {
    2000: { temp: 26.5, fires: 12, co: 145, description: 'Early Terra observations begin' },
    2005: { temp: 27.1, fires: 18, co: 152, description: 'Rapid urbanization period' },
    2010: { temp: 27.8, fires: 25, co: 165, description: 'Industrial growth acceleration' },
    2015: { temp: 28.2, fires: 31, co: 178, description: 'Climate impacts visible' },
    2020: { temp: 28.7, fires: 28, co: 182, description: 'Pandemic temporary reduction' },
    2025: { temp: 29.1, fires: 34, co: 190, description: 'Current environmental state' }
  };

  const currentData = yearData[year[0] as keyof typeof yearData];

  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">Terra Time Machine</h2>
          <p className="text-xl text-muted-foreground">
            Journey through 25+ years of satellite observations
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

        {/* Time Controls */}
        <Card className="glass p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-2xl font-bold text-gradient">Time Traveler</h3>
                  <p className="text-sm text-muted-foreground">Explore historical satellite data</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="glass border-primary/50"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isPlaying ? 'Pause' : 'Play Timeline'}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Selected Year:</span>
                <span className="text-3xl font-bold text-primary">{year[0]}</span>
              </div>
              
              <Slider
                value={year}
                onValueChange={setYear}
                min={2000}
                max={2025}
                step={5}
                className="w-full"
              />

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>2000</span>
                <span>2005</span>
                <span>2010</span>
                <span>2015</span>
                <span>2020</span>
                <span>2025</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Visualization */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Satellite View */}
          <Card className="glass p-6">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Satellite Imagery - {year[0]}</span>
            </h4>
            
            <div className="aspect-square bg-gradient-to-br from-background/50 to-primary/20 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center space-y-2">
                <span className="text-6xl">{selectedCity.icon}</span>
                <p className="text-2xl font-bold text-gradient">{selectedCity.name}</p>
                <p className="text-sm text-muted-foreground">Terra Satellite View</p>
                <p className="text-xs text-muted-foreground">{currentData.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="glass p-3 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Temp</p>
                <p className="text-lg font-bold text-red-500">{currentData.temp}°C</p>
              </div>
              <div className="glass p-3 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Fires</p>
                <p className="text-lg font-bold text-orange-500">{currentData.fires}</p>
              </div>
              <div className="glass p-3 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">CO</p>
                <p className="text-lg font-bold text-purple-500">{currentData.co}</p>
              </div>
            </div>
          </Card>

          {/* Historical Trends */}
          <Card className="glass p-6">
            <h4 className="text-xl font-bold mb-4">Historical Trends</h4>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Temperature Change</span>
                  <span className="text-sm font-bold text-red-500">+{(currentData.temp - 26.5).toFixed(1)}°C</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-500"
                    style={{ width: `${((currentData.temp - 26.5) / 3) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Fire Incidents</span>
                  <span className="text-sm font-bold text-orange-500">{currentData.fires} detected</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-red-500 transition-all duration-500"
                    style={{ width: `${(currentData.fires / 40) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">CO Pollution</span>
                  <span className="text-sm font-bold text-purple-500">{currentData.co} ppbv</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${(currentData.co / 200) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h5 className="font-bold mb-2 text-primary">Key Insights</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Temperature has risen {(currentData.temp - 26.5).toFixed(1)}°C since 2000</li>
                  <li>• Fire incidents show {currentData.fires > 20 ? 'increasing' : 'stable'} trend</li>
                  <li>• Air pollution levels have {currentData.co > 170 ? 'worsened' : 'improved'}</li>
                  <li>• Continuous monitoring since Terra launch in 1999</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline Events */}
        <Card className="glass p-6">
          <h4 className="text-xl font-bold mb-4">Terra Mission Timeline</h4>
          <div className="grid md:grid-cols-6 gap-4">
            {Object.entries(yearData).map(([yearKey, data]) => (
              <div
                key={yearKey}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  parseInt(yearKey) === year[0]
                    ? 'bg-primary/20 border-2 border-primary'
                    : 'glass border border-border hover:border-primary/50'
                }`}
                onClick={() => setYear([parseInt(yearKey)])}
              >
                <p className="text-2xl font-bold text-primary mb-1">{yearKey}</p>
                <p className="text-xs text-muted-foreground">{data.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TimeMachine;
