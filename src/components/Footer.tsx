import { Satellite } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Satellite className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-gradient">Terra Monitor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time environmental monitoring for Bangladesh using NASA's Terra satellite data.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">Terra Instruments</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• MODIS - Fire Detection</li>
              <li>• ASTER - Surface Temperature</li>
              <li>• MOPITT - Air Quality</li>
              <li>• MISR - Aerosol Monitoring</li>
              <li>• CERES - Energy Balance</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">Monitoring Locations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>🏙️ Dhaka - Urban Heat Island</li>
              <li>🚢 Chittagong - Coastal Changes</li>
              <li>🍃 Sylhet - Vegetation Health</li>
              <li>🌳 Khulna - Mangrove Monitoring</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            Data provided by NASA's Terra satellite mission • Launched December 1999 • 25+ Years of Earth Observation
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Terra Bangladesh Monitor • Built with NASA Open Data APIs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
