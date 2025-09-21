import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, BookOpen, Target, ArrowRight } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    interests: "",
    region: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user data (you can implement localStorage or context here)
    localStorage.setItem('userProfile', JSON.stringify(formData));
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl pt-8 pb-16">
        <div className="text-center mb-8 animate-fade-in">
          <div className="p-4 bg-primary rounded-full mx-auto w-fit mb-4">
            <User className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">Create Your Profile</h1>
          <p className="text-muted-foreground text-lg">
            Tell us about yourself to get personalized career recommendations
          </p>
        </div>

        <Card className="card-modern p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-semibold">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-modern h-12 text-lg"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class" className="text-lg font-semibold">Current Class</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, class: value })}>
                <SelectTrigger className="input-modern h-12 text-lg">
                  <SelectValue placeholder="Select your class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10th">10th Grade</SelectItem>
                  <SelectItem value="11th">11th Grade</SelectItem>
                  <SelectItem value="12th">12th Grade</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="postgraduate">Post Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region" className="text-lg font-semibold">Region</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, region: value })}>
                <SelectTrigger className="input-modern h-12 text-lg">
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jammu">Jammu</SelectItem>
                  <SelectItem value="kashmir">Kashmir</SelectItem>
                  <SelectItem value="ladakh">Ladakh</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests" className="text-lg font-semibold">Your Interests</Label>
              <Textarea
                id="interests"
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                className="input-modern min-h-24 text-lg resize-none"
                placeholder="Tell us about your hobbies, subjects you enjoy, or career aspirations..."
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-lg py-6 smooth-transition hover-scale"
              disabled={!formData.name || !formData.class || !formData.region}
            >
              <Target className="w-6 h-6 mr-3" />
              Continue to Quiz
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </form>
        </Card>

        <div className="mt-8 text-center animate-slide-in">
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Profile Setup</span>
            </div>
            <div className="w-8 h-px bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-border rounded-full"></div>
              <span>Aptitude Test</span>
            </div>
            <div className="w-8 h-px bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-border rounded-full"></div>
              <span>Results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;