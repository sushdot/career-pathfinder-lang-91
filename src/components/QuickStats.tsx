import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Award, MapPin } from "lucide-react";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const QuickStats = () => {
  const stats: StatItem[] = [
    {
      title: "Students Guided",
      value: "12,450+",
      change: "+15.3%",
      icon: <Users className="h-5 w-5" />,
      color: "text-primary"
    },
    {
      title: "Career Paths",
      value: "150+",
      change: "+8.2%",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-secondary"
    },
    {
      title: "Scholarships",
      value: "85+",
      change: "+12.1%",
      icon: <Award className="h-5 w-5" />,
      color: "text-accent"
    },
    {
      title: "Colleges",
      value: "200+",
      change: "+5.4%",
      icon: <MapPin className="h-5 w-5" />,
      color: "text-success"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="card-modern hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-xs text-success font-medium">
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;