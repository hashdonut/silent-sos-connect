import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  DocumentData
} from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";

import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Map,
  Phone,
  Heart,
  Shield,
  Mail,
  Globe,
  MapPin
} from "lucide-react";

const db = getFirestore(app);

const NGODetails = () => {
  const { id } = useParams();
  const [ngo, setNgo] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNGO = async () => {
      try {
        const ngoRef = doc(collection(db, "ngos"), id);
        const ngoSnap = await getDoc(ngoRef);

        if (ngoSnap.exists()) {
          setNgo(ngoSnap.data());
        } else {
          setNgo(null);
        }
      } catch (error) {
        console.error("Failed to fetch NGO:", error);
        setNgo(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNGO();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8 text-lg">Loading NGO details...</div>;
  }

  if (!ngo) {
    return (
      <div className="text-center p-8 text-lg text-red-600">
        NGO not found. Please check the URL or return to the directory.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back Button */}
      <Link to="/ngos">
        <Button variant="outline" className="mb-4 border-blue-200 text-blue-700 hover:bg-blue-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>
      </Link>

      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{ngo.name}</h1>
              <div className="flex items-center text-lg text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                {ngo.address || "Address not provided"}
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-blue-100 text-blue-800">NGO</Badge>
                <Badge className="bg-green-100 text-green-800 flex items-center">
                  <Shield className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              </div>
            </div>
            {/* <div className="flex flex-col gap-3">
              <Link to={`/donate/${id}`}>
                <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>
              </Link>
            </div> */}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-blue-600" />
                About This NGO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-lg">{ngo.description || "No description provided."}</p>
            </CardContent>
          </Card>

          {/* Services */}
          {Array.isArray(ngo.services) && ngo.services.length > 0 && (
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-600" />
                  Services Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ngo.services.map((service: string, index: number) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg border">
                      <Heart className="mr-3 h-5 w-5 text-red-500" />
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ngo.contact && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="text-lg">{ngo.contact}</p>
                </div>
              )}

              {ngo.email && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-blue-600">{ngo.email}</p>
                </div>
              )}

              {ngo.website && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Website</p>
                  <a
                    href={ngo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {ngo.website}
                  </a>
                </div>
              )}

              {ngo.address && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Address</p>
                  <p className="text-sm">{ngo.address}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ngo.email && (
                <a href={`mailto:${ngo.email}`}>
                  <Button className="w-full" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </a>
              )}
              {ngo.address && (
                <Button className="w-full" variant="outline">
                  <Map className="mr-2 h-4 w-4" />
                  Get Directions
                </Button>
              )}
              {ngo.website && (
                <a href={ngo.website} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="outline">
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Website
                  </Button>
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NGODetails;
