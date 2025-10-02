import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

interface InstrumentPanelProps {
  instrument: string;
  location: any;
  data: any;
  loading: boolean;
}

const InstrumentPanel = ({ instrument, location, data, loading }: InstrumentPanelProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="glass p-6">
            <Skeleton className="h-20 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  const renderMODIS = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass p-6">
          <div className="text-sm text-muted-foreground mb-2">Active Fires</div>
          <div className="text-4xl font-bold text-red-500">{data?.modis?.totalFires || 0}</div>
          <Progress value={(data?.modis?.totalFires || 0) * 10} className="mt-4" />
        </Card>
        <Card className="glass p-6">
          <div className="text-sm text-muted-foreground mb-2">High Confidence</div>
          <div className="text-4xl font-bold text-orange-500">{data?.modis?.highConfidence || 0}</div>
          <Progress value={(data?.modis?.highConfidence || 0) * 10} className="mt-4" />
        </Card>
        <Card className="glass p-6">
          <div className="text-sm text-muted-foreground mb-2">Avg Brightness</div>
          <div className="text-4xl font-bold text-yellow-500">{data?.modis?.avgBrightness || 0}°K</div>
          <Progress value={50} className="mt-4" />
        </Card>
        <Card className="glass p-6">
          <div className="text-sm text-muted-foreground mb-2">Fire Power (FRP)</div>
          <div className="text-4xl font-bold text-red-500">{data?.modis?.avgFRP || 0} MW</div>
          <Progress value={65} className="mt-4" />
        </Card>
      </div>
      <Card className="glass p-6">
        <h4 className="text-lg font-bold mb-4">MODIS True Color Imagery</h4>
        <div className="aspect-video bg-background/50 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Satellite imagery layer - {location.name}</p>
        </div>
      </Card>
    </div>
  );

  const renderASTER = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Elevation</div>
        <div className="text-4xl font-bold text-orange-500">{data?.aster?.elevation || 45}m</div>
        <Progress value={30} className="mt-4" />
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Surface Temp</div>
        <div className="text-4xl font-bold text-red-500">{data?.aster?.surfaceTemp || 32}°C</div>
        <Progress value={70} className="mt-4" />
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Resolution</div>
        <div className="text-2xl font-bold text-primary">{data?.aster?.resolution || '15-90m'}</div>
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Land Cover</div>
        <div className="text-xl font-bold text-accent">{data?.aster?.landCover || 'Urban/Agricultural'}</div>
      </Card>
    </div>
  );

  const renderMOPITT = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">CO Level</div>
        <div className="text-4xl font-bold text-purple-500">{data?.mopitt?.carbonMonoxide || 165} ppbv</div>
        <Progress value={60} className="mt-4" />
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Air Quality</div>
        <div className="text-2xl font-bold text-accent">{data?.mopitt?.airQuality || 'Good'}</div>
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Update Frequency</div>
        <div className="text-xl font-bold text-primary">Monthly</div>
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Coverage</div>
        <div className="text-xl font-bold text-secondary">Global</div>
      </Card>
    </div>
  );

  const renderMISR = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Aerosol Optical Depth</div>
        <div className="text-4xl font-bold text-blue-500">{data?.misr?.aerosolOpticalDepth || 0.287}</div>
        <Progress value={40} className="mt-4" />
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Visibility</div>
        <div className="text-2xl font-bold text-accent">{data?.misr?.visibility || 'Moderate'}</div>
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Viewing Angles</div>
        <div className="text-4xl font-bold text-primary">9</div>
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Cloud Height</div>
        <div className="text-3xl font-bold text-secondary">{data?.misr?.cloudHeight || '4.5 km'}</div>
      </Card>
    </div>
  );

  const renderCERES = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Solar Radiation</div>
        <div className="text-4xl font-bold text-yellow-500">{data?.ceres?.solarRadiation || 185} W/m²</div>
        <Progress value={75} className="mt-4" />
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Temperature</div>
        <div className="text-4xl font-bold text-red-500">{data?.ceres?.temperature || 28}°C</div>
        <Progress value={70} className="mt-4" />
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Cloud Cover</div>
        <div className="text-4xl font-bold text-blue-500">{data?.ceres?.cloudCover || 45}%</div>
        <Progress value={45} className="mt-4" />
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Energy Balance</div>
        <div className="text-4xl font-bold text-accent">{data?.ceres?.energyBalance || -195} W/m²</div>
        <Progress value={30} className="mt-4" />
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Precipitation</div>
        <div className="text-4xl font-bold text-blue-400">{data?.ceres?.precipitation || 2.5} mm</div>
        <Progress value={25} className="mt-4" />
      </Card>
      <Card className="glass p-6">
        <div className="text-sm text-muted-foreground mb-2">Humidity</div>
        <div className="text-4xl font-bold text-primary">{data?.ceres?.humidity || 75}%</div>
        <Progress value={75} className="mt-4" />
      </Card>
    </div>
  );

  const renderMap = {
    modis: renderMODIS,
    aster: renderASTER,
    mopitt: renderMOPITT,
    misr: renderMISR,
    ceres: renderCERES
  };

  return renderMap[instrument as keyof typeof renderMap]?.() || null;
};

export default InstrumentPanel;
