import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Map, CheckCircle } from "lucide-react";

import {
  getFirestore,
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";

interface NGO {
  id: string;
  name: string;
  contact: string;
  email: string;
  website: string;
  verification_document?: string;
  address: string;
  description: string;
  admin: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

const NGODirectory = () => {
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNGOs = async () => {
    const db = getFirestore(app);
    const ngoCollection = collection(db, "ngos");

    try {
      const snapshot = await getDocs(ngoCollection);
      const data = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
      })) as NGO[];
      setNgos(data);
    } catch (error) {
      console.error("Error fetching NGOs:", error);
    }
  };

  useEffect(() => {
    fetchNGOs();
  }, []);

  const filteredNGOs = ngos.filter((ngo) =>
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ngo.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">NGO Directory</h1>
        <p className="text-gray-600">Verified NGOs and emergency responders in Malaysia</p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search NGOs by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold">
                  {ngos.filter((ngo) => ngo.verification_document).length}
                </p>
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
                <p className="text-2xl font-bold">
                  {[...new Set(ngos.map((ngo) => ngo.address))].length}
                </p>
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
                <div>
                  <CardTitle className="text-lg">{ngo.name}</CardTitle>
                  <p className="text-sm text-gray-600">{ngo.address}</p>
                </div>
                {ngo.verification_document && (
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{ngo.description}</p>

              <div className="text-sm text-gray-600 space-y-1">
                <p>📞 {ngo.contact}</p>
                <p>📧 {ngo.email}</p>
                {ngo.website && (
                  <p>
                    🔗{" "}
                    <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                      Visit Website
                    </a>
                  </p>
                )}
              </div>

              <Link to={`/admin/ngo/${ngo.id}`}>
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
