import { Button } from '@/components/ui/button';
import { Satellite, TrendingUp, BookOpen, Brain, Clock } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Hero content */}
      <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
        <div className="animate-float">
          <div className="inline-block p-4 glass rounded-2xl glow mb-6">
            <Satellite className="w-16 h-16 text-primary" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          <span className="text-gradient">Terra Satellite</span>
          <br />
          <span className="text-foreground">Bangladesh Monitor</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Live environmental monitoring using NASA's Terra satellite data
          <br />
          <span className="text-primary font-semibold">5 Instruments • 4 Cities • 25+ Years of Data</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-primary/50 transition-all"
            onClick={() => onNavigate('dashboard')}
          >
            <Satellite className="w-5 h-5 mr-2" />
            Live Dashboard
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="glass border-primary/50 hover:bg-primary/10 text-foreground font-semibold text-lg px-8 py-6 rounded-xl"
            onClick={() => onNavigate('stories')}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            City Stories
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="glass border-accent/50 hover:bg-accent/10 text-foreground font-semibold text-lg px-8 py-6 rounded-xl"
            onClick={() => onNavigate('analysis')}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            City Analysis
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="glass border-secondary/50 hover:bg-secondary/10 text-foreground font-semibold text-lg px-8 py-6 rounded-xl"
            onClick={() => onNavigate('quiz')}
          >
            <Brain className="w-5 h-5 mr-2" />
            Terra Quiz
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="glass border-primary/50 hover:bg-primary/10 text-foreground font-semibold text-lg px-8 py-6 rounded-xl"
            onClick={() => onNavigate('timemachine')}
          >
            <Clock className="w-5 h-5 mr-2" />
            Time Machine
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
          {[
            { value: '5', label: 'Terra Instruments', icon: Satellite },
            { value: '25+', label: 'Years of Data', icon: Clock },
            { value: '4', label: 'BD Cities', icon: TrendingUp },
            { value: 'Live', label: 'Real-time Updates', icon: Brain }
          ].map((stat, idx) => (
            <div key={idx} className="glass p-6 rounded-xl glow animate-pulse-glow" style={{ animationDelay: `${idx * 500}ms` }}>
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
};

export default Hero;
