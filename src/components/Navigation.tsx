import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";
import { 
  GraduationCap, 
  Menu, 
  Home, 
  User, 
  BookOpen, 
  Award, 
  MapPin, 
  HelpCircle,
  LogOut,
  ChevronDown
} from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { userData, clearUserData } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.profile'), path: '/profile', icon: User },
    { name: t('nav.quiz'), path: '/quiz', icon: HelpCircle },
    { name: t('nav.courses'), path: '/courses', icon: BookOpen },
    { name: t('nav.colleges'), path: '/colleges', icon: MapPin },
    { name: t('nav.scholarships'), path: '/scholarships', icon: Award },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    clearUserData();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover-scale smooth-transition" 
            onClick={() => handleNavigation('/')}
          >
            <div className="p-2 bg-primary rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">
              Career Guide
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className="smooth-transition hover-scale"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-20 h-9 border-0 bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="hi">हि</SelectItem>
                <SelectItem value="ks">کٲشُر</SelectItem>
                <SelectItem value="ur">اردو</SelectItem>
              </SelectContent>
            </Select>

            {/* User Menu */}
            {userData ? (
              <div className="hidden sm:flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  {userData.name}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('/dashboard')}
                  className="smooth-transition hover-scale"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="smooth-transition hover-scale text-destructive hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => handleNavigation('/auth')}
                className="hidden sm:flex smooth-transition hover-scale"
              >
                {t('nav.login')}
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center gap-3 pb-6 border-b">
                    <div className="p-2 bg-primary rounded-lg">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-primary">
                      Career Guide
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 py-6 space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.path}
                          variant={isActive(item.path) ? "default" : "ghost"}
                          size="sm"
                          onClick={() => handleNavigation(item.path)}
                          className="w-full justify-start smooth-transition"
                        >
                          <Icon className="h-4 w-4 mr-3" />
                          {item.name}
                        </Button>
                      );
                    })}
                  </div>

                  {/* Mobile User Actions */}
                  <div className="border-t pt-4 space-y-2">
                    {userData ? (
                      <>
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          Signed in as <span className="font-medium">{userData.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleNavigation('/dashboard')}
                          className="w-full justify-start"
                        >
                          <User className="h-4 w-4 mr-3" />
                          Dashboard
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          className="w-full justify-start text-destructive hover:text-destructive"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          {t('nav.logout')}
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleNavigation('/auth')}
                        className="w-full"
                      >
                        {t('nav.login')}
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;