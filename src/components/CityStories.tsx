import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ChevronRight } from 'lucide-react';

const CITY_STORIES = [
  {
    id: 'dhaka',
    name: 'Dhaka',
    icon: '🏙️',
    story: 'As Bangladesh\'s bustling capital, Dhaka faces significant urban environmental challenges. Terra satellites monitor the urban heat island effect, where concrete and asphalt absorb and retain heat, raising temperatures 5-7°C higher than surrounding areas. The MODIS instrument tracks air quality and thermal patterns, while CERES measures energy balance to understand climate impacts on this megacity of 22 million people.',
    videoUrl: 'https://example.com/dhaka-animation.mp4',
    facts: [
      'Population density: 44,000 per km²',
      'Temperature increase: 0.5°C per decade',
      'Green space: Only 10% coverage',
      'Air quality concerns year-round'
    ]
  },
  {
    id: 'chittagong',
    name: 'Chittagong',
    icon: '🚢',
    story: 'Bangladesh\'s premier port city faces unique coastal environmental pressures. Terra satellites monitor coastal erosion, sea level changes, and shipping-related pollution. MISR\'s multi-angle observations track aerosols from port activities, while MODIS provides imagery of coastal land use changes. The city serves as a critical indicator for climate change impacts on South Asian coastal regions.',
    videoUrl: 'https://example.com/chittagong-animation.mp4',
    facts: [
      'Major international seaport',
      'Coastal erosion: 2-3m annually',
      'Rising sea levels threat',
      'Ship traffic monitoring via satellite'
    ]
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    icon: '🍃',
    story: 'Known for its lush tea gardens and wetlands, Sylhet is a biodiversity hotspot. Terra\'s MODIS NDVI (vegetation index) monitors the health of tea plantations and natural forests. ASTER provides high-resolution temperature data crucial for agricultural planning. The region experiences severe monsoon flooding, which Terra helps predict and monitor through cloud tracking and precipitation analysis.',
    videoUrl: 'https://example.com/sylhet-animation.mp4',
    facts: [
      'Tea production: 60% of Bangladesh total',
      'Wetland ecosystem critical habitat',
      'Annual monsoon flooding',
      'Rich biodiversity preservation'
    ]
  },
  {
    id: 'khulna',
    name: 'Khulna',
    icon: '🌳',
    story: 'Gateway to the Sundarbans, the world\'s largest mangrove forest and a UNESCO World Heritage Site. Terra satellites are vital for monitoring mangrove health, tracking deforestation, and measuring sea level rise impacts. MODIS detects fires and changes in vegetation cover, while ASTER measures surface temperatures in this critical ecosystem that protects against cyclones and supports Bengal tigers.',
    videoUrl: 'https://example.com/khulna-animation.mp4',
    facts: [
      'Sundarbans gateway city',
      'Mangrove forest monitoring',
      'Bengal tiger habitat protection',
      'Cyclone buffer zone tracking'
    ]
  }
];

const CityStories = () => {
  const [selectedCity, setSelectedCity] = useState(CITY_STORIES[0]);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">City Stories & Videos</h2>
          <p className="text-xl text-muted-foreground">
            Explore the environmental narratives of Bangladesh's key cities
          </p>
        </div>

        {/* City Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CITY_STORIES.map((city) => (
            <Button
              key={city.id}
              variant={selectedCity.id === city.id ? 'default' : 'outline'}
              className={`h-auto py-6 px-4 ${
                selectedCity.id === city.id
                  ? 'bg-primary text-primary-foreground glow'
                  : 'glass border-primary/50'
              }`}
              onClick={() => {
                setSelectedCity(city);
                setVideoPlaying(false);
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">{city.icon}</span>
                <span className="font-bold">{city.name}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Story Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Section */}
          <Card className="glass p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>{selectedCity.icon}</span>
              <span className="text-gradient">{selectedCity.name} Animation</span>
            </h3>
            
            <div className="relative aspect-video bg-background/50 rounded-lg overflow-hidden group cursor-pointer">
              {!videoPlaying ? (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all"
                  onClick={() => setVideoPlaying(true)}
                >
                  <div className="text-center space-y-4">
                    <Play className="w-20 h-20 text-primary mx-auto animate-pulse" />
                    <p className="text-lg font-semibold">Watch Satellite Animation</p>
                    <p className="text-sm text-muted-foreground">
                      Terra satellite observations over time
                    </p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground">Loading animation...</p>
                    <p className="text-xs text-muted-foreground">
                      Satellite data visualization for {selectedCity.name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                className="glass"
                onClick={() => setVideoPlaying(!videoPlaying)}
              >
                {videoPlaying ? 'Reset' : 'Play Animation'}
              </Button>
              <span className="text-sm text-muted-foreground">
                Terra Multi-Instrument View
              </span>
            </div>
          </Card>

          {/* Story Section */}
          <Card className="glass p-6">
            <h3 className="text-2xl font-bold mb-4">Environmental Story</h3>
            
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {selectedCity.story}
              </p>

              <div>
                <h4 className="text-lg font-bold mb-3 text-primary">Key Facts</h4>
                <ul className="space-y-2">
                  {selectedCity.facts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-primary">Monitoring Since:</strong> December 1999
                  <br />
                  <strong className="text-primary">Data Updates:</strong> Every 1-2 days
                  <br />
                  <strong className="text-primary">Instruments:</strong> All 5 Terra instruments active
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CityStories;
