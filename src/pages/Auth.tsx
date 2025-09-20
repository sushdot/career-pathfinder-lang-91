import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  username: string;
  email: string;
  password: string;
  region: string;
}

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginForm>();
  const signupForm = useForm<SignupForm>();

  const handleLogin = (data: LoginForm) => {
    console.log("Login:", data);
    toast.success("Login successful!");
    navigate('/dashboard');
  };

  const handleSignup = (data: SignupForm) => {
    console.log("Signup:", data);
    toast.success("Account created successfully!");
    navigate('/dashboard');
  };

  const regions = [
    "North America",
    "Europe",
    "Asia Pacific", 
    "Latin America",
    "Middle East & Africa",
    "India",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Card className="w-full max-w-md card-glass backdrop-blur-xl animate-fade-in relative z-10">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="p-6 bg-gradient-to-br from-primary to-primary-light rounded-3xl shadow-glow hover-scale">
              {isLogin ? (
                <LogIn className="h-10 w-10 text-white" />
              ) : (
                <UserPlus className="h-10 w-10 text-white" />
              )}
            </div>
          </div>
          
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight gradient-text animate-slide-up">
              {isLogin ? "Welcome back" : "Join EduConnect"}
            </h1>
            <p className="text-lg text-muted-foreground font-medium animate-slide-up" style={{ animationDelay: '100ms' }}>
              {isLogin 
                ? "Continue your educational journey" 
                : "Start your path to success"
              }
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          {isLogin ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  rules={{ 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="animate-slide-in" style={{ animationDelay: '200ms' }}>
                      <FormLabel className="text-base font-semibold">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email address" 
                          type="email"
                          className="h-14 input-modern text-base"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  rules={{ 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="animate-slide-in" style={{ animationDelay: '300ms' }}>
                      <FormLabel className="text-base font-semibold">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Enter your password" 
                            type={showPassword ? "text" : "password"}
                            className="h-14 input-modern text-base pr-14"
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-4 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-14 text-lg font-semibold btn-gradient hover-scale animate-slide-in" style={{ animationDelay: '400ms' }}>
                  Sign In
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-6">
                <FormField
                  control={signupForm.control}
                  name="username"
                  rules={{ 
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="animate-slide-in" style={{ animationDelay: '200ms' }}>
                      <FormLabel className="text-base font-semibold">Username</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Choose your username" 
                          className="h-14 input-modern text-base"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="email"
                  rules={{ 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="animate-slide-in" style={{ animationDelay: '300ms' }}>
                      <FormLabel className="text-base font-semibold">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email address" 
                          type="email"
                          className="h-14 input-modern text-base"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="password"
                  rules={{ 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="animate-slide-in" style={{ animationDelay: '400ms' }}>
                      <FormLabel className="text-base font-semibold">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Create a strong password" 
                            type={showPassword ? "text" : "password"}
                            className="h-14 input-modern text-base pr-14"
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-4 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="region"
                  rules={{ required: "Please select your region" }}
                  render={({ field }) => (
                    <FormItem className="animate-slide-in" style={{ animationDelay: '500ms' }}>
                      <FormLabel className="text-base font-semibold">Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 input-modern text-base">
                            <SelectValue placeholder="Choose your region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region.toLowerCase().replace(/\s+/g, '-')}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-14 text-lg font-semibold btn-gradient hover-scale animate-slide-in" style={{ animationDelay: '600ms' }}>
                  Create Account
                </Button>
              </form>
            </Form>
          )}

          <div className="text-center animate-slide-in" style={{ animationDelay: '700ms' }}>
            <p className="text-base text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              {" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-lg text-primary hover:text-primary/80 hover-scale"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create account" : "Sign in"}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;