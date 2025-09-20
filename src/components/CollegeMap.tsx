import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Calendar, GraduationCap } from 'lucide-react';
import collegesData from '@/data/colleges_with_image_id.json';

interface College {
  id: number;
  name: string;
  location: string;
  rating: string;
  reviews: number;
  type: string;
  established: string;
  popular_programs: string[];
  program_duration: string;
  image: string;
}

// Predefined coordinates for common locations in J&K and Ladakh
const locationCoordinates: { [key: string]: [number, number] } = {
  'Srinagar': [74.7973, 34.0837],
  'Jammu': [74.8570, 32.7266],
  'Ganderbal': [75.1416, 34.2306],
  'Kathua': [75.5204, 32.3696],
  'Rajouri': [74.3125, 33.3739],
  'Doda': [75.5467, 33.1392],
  'Kupwara': [74.2547, 34.5236],
  'Poonch': [74.0943, 33.7732],
  'Kargil': [76.1339, 34.5539],
  'Leh': [77.5771, 34.1642],
  'Anantnag': [75.1516, 33.7307],
  'Baramulla': [74.3436, 34.2093],
  'Pulwama': [74.8963, 33.8707],
  'Budgam': [74.7299, 34.0514],
  'Bandipora': [74.6378, 34.4186],
  'Udhampur': [75.1418, 32.9158],
  'Reasi': [74.8360, 33.0839],
  'Ramban': [75.2423, 33.2434],
  'Kishtwar': [75.7683, 33.3119],
  'Shopian': [74.8266, 33.7081]
};

// Extract city from location string
const extractCity = (location: string): string => {
  const parts = location.split(',');
  return parts[0].trim();
};

// Get coordinates for a location
const getCoordinates = (location: string): [number, number] | null => {
  const city = extractCity(location);
  return locationCoordinates[city] || null;
};

const CollegeMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Flatten all colleges from all streams
  const allColleges: College[] = collegesData.flatMap((stream: any) => stream.colleges);

  // Filter colleges based on search term
  const filteredColleges = allColleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.popular_programs.some(program => 
      program.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get colleges with valid coordinates
  const collegesWithCoords = filteredColleges.map(college => ({
    ...college,
    coordinates: getCoordinates(college.location)
  })).filter(college => college.coordinates !== null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [75.0, 33.5], // Centered on J&K region
      zoom: 7,
      pitch: 30,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      // Add markers for each college
      collegesWithCoords.forEach((college) => {
        if (!college.coordinates) return;

        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'college-marker';
        markerElement.innerHTML = `
          <div class="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer border-2 border-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `;

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          className: 'college-popup'
        }).setHTML(`
          <div class="p-3 min-w-[300px]">
            <h3 class="font-semibold text-sm mb-2 line-clamp-2">${college.name}</h3>
            <div class="space-y-1 text-xs text-gray-600">
              <div class="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
                ${college.location}
              </div>
              <div class="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                ${college.rating} (${college.reviews} reviews)
              </div>
              <div class="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7h-3V2h-2v2H8V2H6v2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
                </svg>
                Est. ${college.established}
              </div>
              <div class="mt-2">
                <div class="flex flex-wrap gap-1">
                  ${college.popular_programs.slice(0, 3).map(program => 
                    `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${program}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
          </div>
        `);

        // Add marker to map
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(college.coordinates)
          .setPopup(popup)
          .addTo(map.current!);

        // Click handler
        markerElement.addEventListener('click', () => {
          setSelectedCollege(college);
        });
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, collegesWithCoords]);

  if (!mapboxToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass backdrop-blur-xl border-white/20">
          <CardContent className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">College Map</h2>
              <p className="text-muted-foreground">
                Enter your Mapbox public token to view the college locations map
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Mapbox Public Token</label>
              <Input
                type="text"
                placeholder="pk.ey..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Get your free token at{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 bg-card border-b shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">College Map</h1>
            <Badge variant="secondary">{collegesWithCoords.length} colleges</Badge>
          </div>
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search colleges, locations, or programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Map */}
        <div className="flex-1 relative">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>

        {/* Selected College Details */}
        {selectedCollege && (
          <div className="w-80 bg-card border-l shadow-lg overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-lg leading-tight">{selectedCollege.name}</h2>
                <button
                  onClick={() => setSelectedCollege(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>

              <img 
                src={selectedCollege.image} 
                alt={selectedCollege.name}
                className="w-full h-40 object-cover rounded-lg bg-muted"
              />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedCollege.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{selectedCollege.rating} ({selectedCollege.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Established {selectedCollege.established}</span>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Type</h3>
                  <Badge variant={selectedCollege.type === 'Private' ? 'secondary' : 'outline'}>
                    {selectedCollege.type}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-2">Popular Programs</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedCollege.popular_programs.map((program, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-1">Program Duration</h3>
                  <p className="text-sm text-muted-foreground">{selectedCollege.program_duration}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeMap;