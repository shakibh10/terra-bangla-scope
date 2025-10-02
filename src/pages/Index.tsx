import { useState } from 'react';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import CityStories from '@/components/CityStories';
import CityAnalysis from '@/components/CityAnalysis';
import TerraQuiz from '@/components/TerraQuiz';
import TimeMachine from '@/components/TimeMachine';
import Solutions from '@/components/Solutions';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse delay-500" />
      </div>

      <Hero onNavigate={setActiveSection} />
      
      <main className="relative z-10">
        {activeSection === 'dashboard' && <Dashboard />}
        {activeSection === 'stories' && <CityStories />}
        {activeSection === 'analysis' && <CityAnalysis />}
        {activeSection === 'quiz' && <TerraQuiz />}
        {activeSection === 'timemachine' && <TimeMachine />}
        {activeSection === 'solutions' && <Solutions />}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
