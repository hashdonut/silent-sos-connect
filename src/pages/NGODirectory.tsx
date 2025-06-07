
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Map, Bell, Heart } from "lucide-react";

const NGODirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const ngos = [
    {
      id: 1,
      name: "Women's Aid Organisation (WAO)",
      logo: "🛡️",
      region: "Kuala Lumpur",
      type: "Women's Shelter",
      description: "Supporting women and children affected by violence",
      verified: true,
      services: ["Crisis Support", "Legal Aid", "Counseling"],
      contactNumber: "+603-7956-3488",
    },
    {
      id: 2,
      name: "Befrienders KL",
      logo: "🤝",
      region: "Kuala Lumpur",
      type: "Mental Health",
      description: "24/7 emotional support and suicide prevention",
      verified: true,
      services: ["Crisis Hotline", "Emotional Support", "Suicide Prevention"],
      contactNumber: "+603-7627-2929",
    },
    {
      id: 3,
      name: "Shelter Home for Children",
      logo: "🏠",
      region: "Selangor",
      type: "Child Protection",
      description: "Safe haven for children in need of protection",
      verified: true,
      services: ["Shelter", "Education", "Rehabilitation"],
      contactNumber: "+603-5510-3651",
    },
    {
      id: 4,
      name: "AWAM (All Women's Action Society)",
      logo: "💪",
      region: "Petaling Jaya",
      type: "Women's Rights",
      description: "Advocating for gender equality and women's rights",
      verified: true,
      services: ["Legal Support", "Advocacy", "Training"],
      contactNumber: "+603-7877-0224",
    },
    {
      id: 5,
      name: "Persatuan Kesedaran Komuniti Selangor",
      logo: "🌟",
      region: "Selangor",
      type: "Community Support",
      description: "Community awareness and support programs",
      verified: false,
      services: ["Community Programs", "Awareness", "Support Groups"],
      contactNumber: "+603-5566-1234",
    },
  ];

  const ngoTypes = ["All", "Women's Shelter", "Mental Health", "Child Protection", "Women's Rights", "Community Support"];

  const filteredNGOs = ngos.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ngo.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || ngo.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">NGO Directory</h1>
        <p className="text-gray-600">Verified NGOs and emergency responders in Malaysia</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search NGOs by name or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {ngoTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className="text-sm"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
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
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold">{ngos.filter(ngo => ngo.verified).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Map className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Regions</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold">127</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NGO Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNGOs.map((ngo) => (
          <Card key={ngo.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{ngo.logo}</div>
                  <div>
                    <CardTitle className="text-lg">{ngo.name}</CardTitle>
                    <p className="text-sm text-gray-600">{ngo.region}</p>
                  </div>
                </div>
                {ngo.verified && (
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
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
                  {ngo.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>📞 {ngo.contactNumber}</p>
              </div>
              
              <Link to={`/ngo/${ngo.id}`}>
                <Button className="w-full" variant="outline">
                  More Info
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNGOs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No NGOs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default NGODirectory;
