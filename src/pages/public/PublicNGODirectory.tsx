import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users, Map, Bell, Shield, Phone, MapPin,
} from "lucide-react";

import {
  collection,
  getDocs,
  getFirestore,
  DocumentData,
} from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";

const db = getFirestore(app);

const PublicNGODirectory = () => {
  const [ngos, setNgos] = useState<DocumentData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const malaysianStates = [
    "All", "Kuala Lumpur", "Selangor", "Pulau Pinang", "Johor", "Perak", "Kedah",
    "Kelantan", "Terengganu", "Pahang", "Negeri Sembilan", "Melaka", "Sabah", "Sarawak"
  ];

  const ngoTypes = [
    "All", "Women's Shelter", "Mental Health", "Child Protection",
    "Women's Rights", "Community Support", "Domestic Violence", "Crisis Support"
  ];

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "ngos"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNgos(data);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      }
    };

    fetchNGOs();
  }, []);

  const filteredNGOs = ngos.filter((ngo) => {
    const matchesSearch = ngo.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ngo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === "All" || ngo.address?.toLowerCase().includes(selectedState.toLowerCase());
    const matchesType = selectedType === "All" || ngo.services?.includes(selectedType);
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

      {/* Filters */}
      <Card className="border-blue-100">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search NGOs or services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {malaysianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {/* <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {ngoTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select> */}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total NGOs</p>
              <p className="text-2xl font-bold">{ngos.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 flex items-center">
            <Shield className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-2xl font-bold">{ngos.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 flex items-center">
            <Map className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">States Covered</p>
              <p className="text-2xl font-bold">
                {new Set(ngos.map(n => n.address?.split(", ").slice(-2)[0])).size}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardContent className="p-4 flex items-center">
            <Bell className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Contactable NGOs</p>
              <p className="text-2xl font-bold">{ngos.filter(n => n.contact).length}</p>
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
                <div>
                  <CardTitle className="text-lg">{ngo.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {ngo.address || "No address provided"}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 flex items-center">
                  <Shield className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{ngo.description}</p>
              {Array.isArray(ngo.services) && ngo.services.length > 0 && (
                <>
                  <p className="text-sm font-medium text-gray-700">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {ngo.services.slice(0, 3).map((service: string, index: number) => (
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
                </>
              )}
              {ngo.contact && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{ngo.contact}</span>
                </div>
              )}
              <div className="flex gap-2">
                <Link to={`/ngo/${ngo.id}`} className="flex-1">
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </Link>
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
    </div>
  );
};

export default PublicNGODirectory;
