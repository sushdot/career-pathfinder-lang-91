import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, BookOpen, Users, Sparkles, Zap, Target, Award, MapPin, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <div className="absolute inset-0 bg-primary/5" />
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="p-4 bg-primary rounded-full mx-auto w-fit smooth-transition hover-scale">
              <GraduationCap className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 animate-slide-up">
            Career Guidance Platform
            <span className="block text-3xl md:text-5xl mt-4 text-foreground">
              Shape Your Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-in" style={{ animationDelay: '200ms' }}>
            Discover your perfect career path with our AI-powered guidance system. 
            Take our smart quiz and unlock personalized recommendations for your future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in" style={{ animationDelay: '400ms' }}>
            <Button 
              onClick={() => navigate('/profile')}
              size="lg"
              className="text-lg px-10 py-5 smooth-transition hover-scale bg-primary hover:bg-primary/90"
            >
              <Zap className="w-6 h-6 mr-3" />
              Start Your Journey
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="text-lg px-10 py-5 smooth-transition hover-scale border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Target className="w-6 h-6 mr-3" />
              Explore Features
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-4 pb-20">
        <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Discover Your Future
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock your potential with our innovative career guidance features
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="card-modern p-6 text-center hover-lift animate-slide-up cursor-pointer" 
               style={{ animationDelay: '700ms' }}
               onClick={() => navigate('/profile')}>
            <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 smooth-transition hover-scale">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Smart Quiz</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover your interests and strengths through our intelligent assessment
            </p>
          </div>

          <div className="card-modern p-6 text-center hover-lift animate-slide-up cursor-pointer" 
               style={{ animationDelay: '800ms' }}
               onClick={() => navigate('/colleges')}>
            <div className="bg-secondary p-4 rounded-full w-16 h-16 mx-auto mb-4 smooth-transition hover-scale">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">College Explorer</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Find the best colleges and universities in Jammu & Kashmir
            </p>
          </div>

          <div className="card-modern p-6 text-center hover-lift animate-slide-up cursor-pointer" 
               style={{ animationDelay: '900ms' }}
               onClick={() => navigate('/scholarships')}>
            <div className="bg-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 smooth-transition hover-scale">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-accent mb-3">Scholarships</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover financial aid opportunities for your education
            </p>
          </div>

          <div className="card-modern p-6 text-center hover-lift animate-slide-up cursor-pointer" 
               style={{ animationDelay: '1000ms' }}
               onClick={() => navigate('/courses')}>
            <div className="bg-success p-4 rounded-full w-16 h-16 mx-auto mb-4 smooth-transition hover-scale">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-success mb-3">Career Paths</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Explore diverse career opportunities and courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
