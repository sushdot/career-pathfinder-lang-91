import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Search, Award, Calendar, MapPin, DollarSign, ExternalLink } from "lucide-react";
import { useState } from "react";

const scholarshipsData = [
  {
    id: 1,
    name: "J&K Merit Scholarship",
    provider: "J&K Government",
    amount: "₹50,000/year",
    eligibility: "Class 12th passed with 85%+",
    deadline: "2024-12-31",
    category: "Merit Based",
    region: "Jammu & Kashmir",
    description: "Scholarship for meritorious students from J&K pursuing higher education.",
    link: "#"
  },
  {
    id: 2,
    name: "National Scholarship Portal",
    provider: "Government of India",
    amount: "₹25,000/year",
    eligibility: "Minority community students",
    deadline: "2024-11-15",
    category: "Minority",
    region: "All India",
    description: "Pre-matric and post-matric scholarship for minority students.",
    link: "#"
  },
  {
    id: 3,
    name: "INSPIRE Scholarship",
    provider: "DST, Government of India",
    amount: "₹80,000/year",
    eligibility: "Top 1% in Class 12th (Science)",
    deadline: "2024-10-30",
    category: "Science",
    region: "All India",
    description: "For students pursuing higher education in Natural and Basic Sciences.",
    link: "#"
  },
  {
    id: 4,
    name: "Begum Hazrat Mahal Scholarship",
    provider: "Maulana Azad Education Foundation",
    amount: "₹12,000/year",
    eligibility: "Minority girls students",
    deadline: "2024-12-15",
    category: "Girls Education",
    region: "All India",
    description: "Scholarship for girls from minority communities.",
    link: "#"
  },
  {
    id: 5,
    name: "Kashmir University Merit Scholarship",
    provider: "University of Kashmir",
    amount: "₹30,000/year",
    eligibility: "University topper in each stream",
    deadline: "2024-09-30",
    category: "University Specific",
    region: "Kashmir",
    description: "For outstanding students admitted to University of Kashmir.",
    link: "#"
  },
  {
    id: 6,
    name: "Jammu University Excellence Award",
    provider: "University of Jammu",
    amount: "₹40,000/year",
    eligibility: "First class graduates",
    deadline: "2024-11-30",
    category: "University Specific",
    region: "Jammu",
    description: "Excellence scholarship for post-graduate programs.",
    link: "#"
  }
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");

  const filteredScholarships = scholarshipsData.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || scholarship.category === categoryFilter;
    const matchesRegion = regionFilter === "all" || scholarship.region === regionFilter;
    
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const categories = [...new Set(scholarshipsData.map(s => s.category))];
  const regions = [...new Set(scholarshipsData.map(s => s.region))];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-20 pb-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="p-4 bg-primary rounded-full mx-auto w-fit mb-6">
            <Award className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">
            Scholarship Opportunities
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover financial aid and scholarship opportunities to support your educational journey
          </p>
        </div>

        {/* Filters */}
        <Card className="card-modern p-6 mb-8 animate-slide-up">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Search Scholarships</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or provider..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input-modern"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="input-modern">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Region</label>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="input-modern">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Scholarships Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredScholarships.map((scholarship, index) => (
            <Card 
              key={scholarship.id} 
              className="card-modern p-6 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">{scholarship.name}</h3>
                  <p className="text-muted-foreground mb-2">{scholarship.provider}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {scholarship.category}
                </Badge>
              </div>

              <p className="text-foreground mb-4 leading-relaxed">{scholarship.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 text-success mr-2" />
                  <span className="font-semibold text-success">{scholarship.amount}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">{scholarship.eligibility}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-warning mr-2" />
                  <span className="text-warning">Deadline: {scholarship.deadline}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">{scholarship.region}</span>
                </div>
              </div>

              <Button className="w-full smooth-transition hover-scale">
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
            </Card>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-muted rounded-full mx-auto w-fit mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;