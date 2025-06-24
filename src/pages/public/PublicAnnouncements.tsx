import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Heart,
  Users,
  Bell,
  MapPin,
  Clock,
  ExternalLink,
  Filter,
} from "lucide-react";

const PublicAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [ngos, setNgos] = useState<Record<string, DocumentData>>({});
  const [selectedType, setSelectedType] = useState("All");
  const [selectedState, setSelectedState] = useState("All");

  const db = getFirestore(app);

  const malaysianStates = [
    "All", "Kuala Lumpur", "Selangor", "Penang", "Johor", "Perak", "Kedah",
    "Kelantan", "Terengganu", "Pahang", "Negeri Sembilan", "Melaka", "Sabah", "Sarawak"
  ];

  const announcementTypes = ["All", "Training", "Campaign", "Donation", "Support", "Event", "Workshop"];

  const typeColors = {
    General: "bg-gray-100 text-gray-800",
    Training: "bg-blue-100 text-blue-800",
    Campaign: "bg-green-100 text-green-800",
    Donation: "bg-purple-100 text-purple-800",
    Support: "bg-yellow-100 text-yellow-800",
    Event: "bg-pink-100 text-pink-800",
    Workshop: "bg-indigo-100 text-indigo-800",
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Training":
      case "Support":
      case "Workshop":
        return <Users className="h-4 w-4" />;
      case "Campaign":
        return <Bell className="h-4 w-4" />;
      case "Donation":
        return <Heart className="h-4 w-4" />;
      case "Event":
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const parseStateFromAddress = (address: string): string | null => {
    if (!address) return null;
    const matched = malaysianStates.find((state) => address.includes(state));
    return matched || null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const [annSnap, ngoSnap] = await Promise.all([
        getDocs(collection(db, "announcements")),
        getDocs(collection(db, "ngos")),
      ]);

      const ngoMap: Record<string, DocumentData> = {};
      ngoSnap.docs.forEach((doc) => {
        ngoMap[doc.id] = doc.data();
      });

      const enrichedAnnouncements = annSnap.docs.map((doc) => {
        const data = doc.data();
        const ngo = ngoMap[data.ngo];
        const state = parseStateFromAddress(ngo?.address || "");
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate(),
          ngo,
          state,
        };
      });

      setNgos(ngoMap);
      setAnnouncements(enrichedAnnouncements);
    };

    fetchData();
  }, []);

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesType = selectedType === "All" || a.type === selectedType;
    const matchesState = selectedState === "All" || a.state === selectedState;
    return matchesType && matchesState;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Announcements</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover upcoming events, training, and support initiatives from trusted NGOs across Malaysia.
        </p>
      </div>

      {/* Filters */}
      <Card className="border border-blue-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filter Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {announcementTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
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
            <div className="flex items-end">
              <Button 
                onClick={() => {
                  setSelectedType("All");
                  setSelectedState("All");
                }}
                variant="outline"
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-6">
        {filteredAnnouncements.map((a) => (
          <Card
            key={a.id}
            className="hover:shadow-lg transition-shadow border border-blue-100"
          >
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">{a.ngo?.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3" />
                    {a.ngo?.address || "Unknown"}
                  </div>
                </div>
                <Badge className={typeColors[a.type] || "bg-gray-100 text-gray-800"}>
                  {a.type}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mt-4">
                {getTypeIcon(a.type)}
                <CardTitle className="text-lg">{a.title}</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="pt-2 space-y-4 text-gray-700">
              <p>{a.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  {a.timestamp?.toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  {a.timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  {a.address}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No announcements match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicAnnouncements;
