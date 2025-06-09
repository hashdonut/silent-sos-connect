
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Map, Bell, Heart, Shield, Phone, MapPin } from "lucide-react";

const PublicNGODirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const malaysianStates = [
    "All", "Kuala Lumpur", "Selangor", "Penang", "Johor", "Perak", "Kedah",
    "Kelantan", "Terengganu", "Pahang", "Negeri Sembilan", "Melaka", "Sabah", "Sarawak"
  ];

  const ngoTypes = [
    "All", "Women's Shelter", "Mental Health", "Child Protection", 
    "Women's Rights", "Community Support", "Domestic Violence", "Crisis Support"
  ];

  const ngos = [
    {
      id: 1,
      name: "Women's Aid Organisation (WAO)",
      logo: "🛡️",
      state: "Kuala Lumpur",
      type: "Women's Shelter",
      description: "Supporting women and children affected by violence with shelter, counseling, and legal aid",
      verified: true,
      services: ["Crisis Support", "Legal Aid", "Counseling", "Emergency Shelter"],
      contactNumber: "+603-7956-3488",
      emergencyHours: "24/7",
      languages: ["English", "Bahasa Malaysia", "Mandarin"],
      established: "1982",
      rating: 4.9
    },
    {
      id: 2,
      name: "Befrienders KL",
      logo: "🤝",
      state: "Kuala Lumpur",
      type: "Mental Health",
      description: "24/7 emotional support and suicide prevention services for those in crisis",
      verified: true,
      services: ["Crisis Hotline", "Emotional Support", "Suicide Prevention"],
      contactNumber: "+603-7627-2929",
      emergencyHours: "24/7",
      languages: ["English", "Bahasa Malaysia", "Mandarin", "Tamil"],
      established: "1970",
      rating: 4.8
    },
    {
      id: 3,
      name: "Shelter Home for Children",
      logo: "🏠",
      state: "Selangor",
      type: "Child Protection",
      description: "Safe haven for children in need of protection, education, and rehabilitation",
      verified: true,
      services: ["Shelter", "Education", "Rehabilitation", "Family Support"],
      contactNumber: "+603-5510-3651",
      emergencyHours: "24/7",
      languages: ["English", "Bahasa Malaysia"],
      established: "1995",
      rating: 4.7
    },
    {
      id: 4,
      name: "AWAM (All Women's Action Society)",
      logo: "💪",
      state: "Selangor",
      type: "Women's Rights",
      description: "Advocating for gender equality and women's rights through legal support and training",
      verified: true,
      services: ["Legal Support", "Advocacy", "Training", "Awareness Programs"],
      contactNumber: "+603-7877-0224",
      emergencyHours: "9AM - 5PM",
      languages: ["English", "Bahasa Malaysia"],
      established: "1985",
      rating: 4.6
    },
    {
      id: 5,
      name: "Persatuan Kebajikan Wanita Penang",
      logo: "🌸",
      state: "Penang",
      type: "Women's Shelter",
      description: "Supporting women and families affected by domestic violence with comprehensive services",
      verified: true,
      services: ["Shelter", "Counseling", "Legal Aid", "Skills Training"],
      contactNumber: "+604-229-3352",
      emergencyHours: "24/7",
      languages: ["English", "Bahasa Malaysia", "Hokkien"],
      established: "1993",
      rating: 4.5
    },
    {
      id: 6,
      name: "Mental Health Association of Johor",
      logo: "🧠",
      state: "Johor",
      type: "Mental Health",
      description: "Mental health support and rehabilitation services for individuals and families",
      verified: true,
      services: ["Counseling", "Therapy", "Support Groups", "Crisis Intervention"],
      contactNumber: "+607-331-2002",
      emergencyHours: "9AM - 9PM",
      languages: ["English", "Bahasa Malaysia", "Mandarin"],
      established: "1988",
      rating: 4.4
    }
  ];

  const filteredNGOs = ngos.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === "All" || ngo.state === selectedState;
    const matchesType = selectedType === "All" || ngo.type === selectedType;
    return matchesSearch && matchesState && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Verified NGO Directory</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find trusted organizations across Malaysia ready to help in your time of need
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="border-blue-100">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search NGOs or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {malaysianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {ngoTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total NGOs</p>
                <p className="text-2xl font-bold">{ngos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-100">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold">{ngos.filter(ngo => ngo.verified).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Map className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">States Covered</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-red-100">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">24/7 Support</p>
                <p className="text-2xl font-bold">{ngos.filter(ngo => ngo.emergencyHours === "24/7").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NGO Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNGOs.map((ngo) => (
          <Card key={ngo.id} className="hover:shadow-lg transition-shadow border-blue-100">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{ngo.logo}</div>
                  <div>
                    <CardTitle className="text-lg">{ngo.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {ngo.state}
                    </div>
                  </div>
                </div>
                {ngo.verified && (
                  <Badge className="bg-green-100 text-green-800 flex items-center">
                    <Shield className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Badge variant="outline" className="text-xs">
                {ngo.type}
              </Badge>
              
              <p className="text-sm text-gray-600">{ngo.description}</p>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                <div className="flex flex-wrap gap-1">
                  {ngo.services.slice(0, 3).map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {ngo.services.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{ngo.services.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium">Emergency Hours</p>
                  <p>{ngo.emergencyHours}</p>
                </div>
                <div>
                  <p className="font-medium">Established</p>
                  <p>{ngo.established}</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{ngo.contactNumber}</span>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/ngo/${ngo.id}`} className="flex-1">
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </Link>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNGOs.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No NGOs found matching your criteria.</p>
          <p className="text-gray-400">Try adjusting your search terms or filters.</p>
        </div>
      )}

      {/* Emergency Section */}
      <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <CardContent className="p-8 text-center">
          <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-900 mb-2">Need Immediate Help?</h3>
          <p className="text-red-800 mb-4">
            If you're in immediate danger or need urgent assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Call 999 (Emergency)
            </Button>
            <Button size="lg" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
              Talian Kasih: 15999
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicNGODirectory;
