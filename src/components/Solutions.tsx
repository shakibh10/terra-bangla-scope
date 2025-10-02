import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Flame, 
  Trees, 
  Wind, 
  Droplets, 
  Sun, 
  Building2, 
  Users, 
  FileText,
  Lightbulb,
  Globe,
  Target,
  TrendingUp
} from 'lucide-react';

const SOLUTION_CATEGORIES = [
  {
    id: 'fire-management',
    title: 'Fire Detection & Prevention',
    icon: Flame,
    color: 'text-red-500',
    bgColor: 'from-red-500/20 to-orange-500/20',
    solutions: [
      {
        title: 'Early Warning Systems',
        description: 'Use MODIS fire detection data to create real-time alert systems for rapid response teams.',
        impact: 'High',
        timeframe: 'Immediate',
        stakeholders: ['Government', 'Fire Services', 'Communities']
      },
      {
        title: 'Agricultural Burning Alternatives',
        description: 'Promote crop residue management techniques instead of open burning. Educate farmers on composting and bio-fertilizer production.',
        impact: 'High',
        timeframe: '1-2 years',
        stakeholders: ['Farmers', 'Agricultural Ministry', 'NGOs']
      },
      {
        title: 'Firebreak Corridors',
        description: 'Create strategic vegetation-free zones in high-risk areas, especially around Sundarbans and tea gardens.',
        impact: 'Medium',
        timeframe: '2-3 years',
        stakeholders: ['Forest Department', 'Local Government']
      }
    ]
  },
  {
    id: 'urban-cooling',
    title: 'Urban Heat Island Mitigation',
    icon: Building2,
    color: 'text-orange-500',
    bgColor: 'from-orange-500/20 to-yellow-500/20',
    solutions: [
      {
        title: 'Green Roof Initiative',
        description: 'Mandate rooftop gardens on buildings in Dhaka and Chittagong to reduce surface temperatures by 2-5°C.',
        impact: 'High',
        timeframe: '3-5 years',
        stakeholders: ['City Corporations', 'Building Owners', 'Architects']
      },
      {
        title: 'Urban Forest Expansion',
        description: 'Increase tree coverage from 10% to 25% in major cities using ASTER temperature data to target hotspots.',
        impact: 'High',
        timeframe: '5-10 years',
        stakeholders: ['Municipalities', 'Environmental Groups', 'Citizens']
      },
      {
        title: 'Cool Pavement Technology',
        description: 'Replace dark asphalt with reflective materials that absorb less heat, reducing ambient temperatures.',
        impact: 'Medium',
        timeframe: '3-5 years',
        stakeholders: ['Public Works', 'City Planners']
      }
    ]
  },
  {
    id: 'air-quality',
    title: 'Air Quality Improvement',
    icon: Wind,
    color: 'text-purple-500',
    bgColor: 'from-purple-500/20 to-blue-500/20',
    solutions: [
      {
        title: 'Vehicle Emission Standards',
        description: 'Implement Euro 6 standards and promote electric vehicles using MOPITT CO data for enforcement zones.',
        impact: 'High',
        timeframe: '2-5 years',
        stakeholders: ['Transport Ministry', 'BRTA', 'Private Sector']
      },
      {
        title: 'Industrial Monitoring Network',
        description: 'Deploy ground sensors integrated with MISR aerosol data to track pollution sources in real-time.',
        impact: 'High',
        timeframe: '1-3 years',
        stakeholders: ['Environment Ministry', 'Industries', 'Regulators']
      },
      {
        title: 'Clean Cooking Programs',
        description: 'Distribute efficient cookstoves and promote LPG to reduce household air pollution in rural areas.',
        impact: 'Medium',
        timeframe: '3-7 years',
        stakeholders: ['Energy Ministry', 'NGOs', 'Rural Communities']
      }
    ]
  },
  {
    id: 'climate-adaptation',
    title: 'Climate Resilience',
    icon: Sun,
    color: 'text-yellow-500',
    bgColor: 'from-yellow-500/20 to-green-500/20',
    solutions: [
      {
        title: 'Mangrove Restoration',
        description: 'Use Terra imagery to map degraded areas in Sundarbans and plant 10 million mangrove trees for coastal protection.',
        impact: 'High',
        timeframe: '5-10 years',
        stakeholders: ['Forest Department', 'Coastal Communities', 'International Donors']
      },
      {
        title: 'Climate-Smart Agriculture',
        description: 'Leverage CERES radiation data to optimize crop cycles and introduce drought-resistant varieties in Sylhet tea regions.',
        impact: 'High',
        timeframe: '2-5 years',
        stakeholders: ['Agricultural Research', 'Farmers', 'Ministry']
      },
      {
        title: 'Flood Early Warning System',
        description: 'Integrate Terra cloud cover and precipitation data with ground sensors for 7-day flood forecasts.',
        impact: 'High',
        timeframe: '1-2 years',
        stakeholders: ['Meteorological Department', 'Disaster Management']
      }
    ]
  },
  {
    id: 'technology',
    title: 'Satellite Technology Integration',
    icon: Globe,
    color: 'text-blue-500',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    solutions: [
      {
        title: 'National Environmental Dashboard',
        description: 'Create a public platform integrating all Terra instruments data for transparent environmental monitoring.',
        impact: 'High',
        timeframe: '1-2 years',
        stakeholders: ['IT Ministry', 'Environment Ministry', 'Public']
      },
      {
        title: 'Mobile Alert System',
        description: 'Send SMS/app notifications to citizens about air quality, fire risks, and extreme weather using satellite data.',
        impact: 'Medium',
        timeframe: '6 months-1 year',
        stakeholders: ['Telecom Companies', 'Government', 'App Developers']
      },
      {
        title: 'Researcher Data Access',
        description: 'Establish open data portals for universities and research institutions to use Terra data for local studies.',
        impact: 'Medium',
        timeframe: '1 year',
        stakeholders: ['Universities', 'SPARRSO', 'NASA']
      }
    ]
  },
  {
    id: 'community',
    title: 'Community Engagement',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'from-green-500/20 to-teal-500/20',
    solutions: [
      {
        title: 'Environmental Education Programs',
        description: 'Train 10,000 climate ambassadors to interpret satellite data and lead local environmental initiatives.',
        impact: 'High',
        timeframe: '2-3 years',
        stakeholders: ['Schools', 'NGOs', 'Youth Groups']
      },
      {
        title: 'Citizen Science Networks',
        description: 'Enable communities to report environmental changes that complement satellite observations.',
        impact: 'Medium',
        timeframe: '1-2 years',
        stakeholders: ['Local Communities', 'Tech Platforms', 'Scientists']
      },
      {
        title: 'Green Livelihood Programs',
        description: 'Create jobs in environmental monitoring, tree planting, and eco-tourism using satellite data insights.',
        impact: 'High',
        timeframe: '3-5 years',
        stakeholders: ['Labor Ministry', 'Private Sector', 'Communities']
      }
    ]
  }
];

const GLOBAL_IMPACT = [
  {
    icon: Target,
    title: 'SDG Contribution',
    description: 'These solutions directly support UN Sustainable Development Goals 11 (Sustainable Cities), 13 (Climate Action), and 15 (Life on Land).'
  },
  {
    icon: TrendingUp,
    title: 'Scalable Model',
    description: 'Bangladesh solutions can be adapted for other South Asian countries facing similar environmental challenges.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Hub',
    description: 'Position Bangladesh as a leader in climate adaptation and satellite-based environmental monitoring.'
  }
];

const Solutions = () => {
  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">Environmental Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Actionable strategies for a better Bangladesh and a sustainable world,
            <br />powered by NASA Terra satellite insights
          </p>
        </div>

        {/* Global Impact Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {GLOBAL_IMPACT.map((impact, idx) => (
            <Card key={idx} className="glass p-6 text-center space-y-4 hover:scale-105 transition-transform">
              <impact.icon className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-xl font-bold text-foreground">{impact.title}</h3>
              <p className="text-sm text-muted-foreground">{impact.description}</p>
            </Card>
          ))}
        </div>

        {/* Solution Categories */}
        <div className="space-y-8">
          {SOLUTION_CATEGORIES.map((category) => (
            <Card key={category.id} className="glass p-8 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${category.bgColor}`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Satellite-informed solutions for measurable impact
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {category.solutions.map((solution, idx) => (
                  <Card key={idx} className="glass p-6 space-y-4 border border-border/50 hover:border-primary/50 transition-all">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-foreground">{solution.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {solution.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Impact:</span>
                        <Badge 
                          className={`${
                            solution.impact === 'High' 
                              ? 'bg-green-500/20 text-green-500 border-green-500/50' 
                              : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50'
                          } border`}
                        >
                          {solution.impact}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Timeframe:</span>
                        <span className="text-xs font-semibold text-primary">{solution.timeframe}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Key Stakeholders:</span>
                        <div className="flex flex-wrap gap-1">
                          {solution.stakeholders.map((stakeholder, sIdx) => (
                            <Badge 
                              key={sIdx} 
                              variant="outline" 
                              className="text-xs bg-background/50"
                            >
                              {stakeholder}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Implementation Roadmap */}
        <Card className="glass p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <FileText className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-2xl font-bold text-gradient">Implementation Roadmap</h3>
              <p className="text-muted-foreground">A phased approach to environmental transformation</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">Phase 1</div>
                  <div className="text-sm font-semibold text-foreground">Immediate Actions</div>
                  <div className="text-xs text-muted-foreground mb-4">0-12 months</div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Launch fire alert system</li>
                  <li>• Deploy air quality sensors</li>
                  <li>• Start data dashboard</li>
                  <li>• Begin education programs</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">Phase 2</div>
                  <div className="text-sm font-semibold text-foreground">Short-term Projects</div>
                  <div className="text-xs text-muted-foreground mb-4">1-3 years</div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Implement emission standards</li>
                  <li>• Scale green roof program</li>
                  <li>• Expand monitoring network</li>
                  <li>• Train climate ambassadors</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">Phase 3</div>
                  <div className="text-sm font-semibold text-foreground">Medium-term Goals</div>
                  <div className="text-xs text-muted-foreground mb-4">3-5 years</div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Complete urban forestry</li>
                  <li>• Achieve air quality targets</li>
                  <li>• Scale climate agriculture</li>
                  <li>• Create green jobs</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">Phase 4</div>
                  <div className="text-sm font-semibold text-foreground">Long-term Vision</div>
                  <div className="text-xs text-muted-foreground mb-4">5-10 years</div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Complete mangrove restoration</li>
                  <li>• Achieve carbon neutrality</li>
                  <li>• Lead regional cooperation</li>
                  <li>• Export technology solutions</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="glass p-8 text-center space-y-4">
          <Trees className="w-16 h-16 text-accent mx-auto" />
          <h3 className="text-2xl font-bold text-gradient">Together for a Sustainable Future</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These solutions require collaboration between government, communities, private sector, and international partners. 
            By combining NASA Terra satellite data with local action, Bangladesh can become a global model for 
            climate-resilient development.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Badge className="bg-primary/20 text-primary border-primary/50 border px-4 py-2">
              🌍 For Bangladesh
            </Badge>
            <Badge className="bg-accent/20 text-accent border-accent/50 border px-4 py-2">
              🌱 For the World
            </Badge>
            <Badge className="bg-secondary/20 text-secondary border-secondary/50 border px-4 py-2">
              🚀 For the Future
            </Badge>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Solutions;
