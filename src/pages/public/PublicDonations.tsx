import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  CreditCard, 
  Users, 
  TrendingUp,
  Gift,
  Shield,
  MapPin,
  Filter,
  Package
} from "lucide-react";
import { app } from "@/contexts/FirebaseContext";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);

const PublicDonations = () => {
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCrisis, setSelectedCrisis] = useState("All");
  const [donationType, setDonationType] = useState("Both");

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [donationStats, setDonationStats] = useState({
    totalAmount: 0,
    activeDonors: 0,
    ngosSupported: 0,
    impacted: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch donation announcements
      const announcementsRef = collection(db, "announcements");
      const q = query(announcementsRef, where("type", "==", "Donation"));
      const querySnapshot = await getDocs(q);
      const result: any[] = [];

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const ngoSnap = await getDoc(doc(db, "ngos", data.ngo));
        const ngoData = ngoSnap.exists() ? ngoSnap.data() : null;

        if (ngoData) {
          result.push({
            id: docSnap.id,
            ...data,
            ngoName: ngoData.name,
            ngoState: ngoData.address,
            ngoId: data.ngo
          });
        }
      }

      setAnnouncements(result);
    };

    const fetchDonationStats = async () => {
      const donationsSnap = await getDocs(collection(db, "donations"));
      const donations = donationsSnap.docs.map(doc => doc.data());

      const totalAmount = donations.reduce((sum, d: any) => sum + (d.amount || 0), 0);
      const uniqueDonors = new Set(donations.map((d: any) => d.user)).size;
      const supportedNGOs = new Set(donations.map((d: any) => d.ngo)).size;

      setDonationStats({
        totalAmount,
        activeDonors: uniqueDonors,
        ngosSupported: supportedNGOs,
        impacted: 5000 + Math.floor(totalAmount / 20) // rough estimate
      });
    };

    fetchData();
    fetchDonationStats();
  }, []);

  const filteredNeeds = announcements.filter((a) => {
    const matchesState = selectedState === "All" || a.ngoState.includes(selectedState);
    const matchesCrisis = selectedCrisis === "All" || a.target?.crisis.includes(selectedCrisis);
    return matchesState && matchesCrisis;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const malaysianStates = [
    "All", "Kuala Lumpur", "Selangor", "Pulau Pinang", "Johor", "Perak", "Kedah",
    "Kelantan", "Terengganu", "Pahang", "Negeri Sembilan", "Melaka", "Sabah", "Sarawak"
  ];

  const crisisTypes = [
    "All", "Domestic Violence", "Mental Health", "Child Protection", 
    "Homelessness", "Women's Rights", "Crisis Support", "Emergency Relief"
  ];

  const paymentMethods = [
    {
      name: "Online Banking",
      description: "FPX and major Malaysian banks",
      icon: "🏦",
      fee: "No fees",
      processing: "Instant"
    },
    {
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: "💳",
      fee: "2.9% + RM 0.50",
      processing: "Instant"
    },
    {
      name: "TNG eWallet",
      description: "Touch 'n Go digital payments",
      icon: "📱",
      fee: "No fees",
      processing: "Instant"
    },
    {
      name: "GrabPay",
      description: "Grab's digital wallet",
      icon: "🚗",
      fee: "No fees",
      processing: "Instant"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our NGO Partners</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your donations directly support verified NGOs helping those in crisis across Malaysia. 
          Every contribution makes a real difference.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Donations",
            value: `RM ${donationStats.totalAmount.toLocaleString()}`,
            change: "+25%",
            icon: Heart,
            color: "text-red-600",
            bgColor: "bg-red-100",
          },
          {
            title: "Active Donors",
            value: donationStats.activeDonors,
            change: "+18%",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
          },
          {
            title: "NGOs Supported",
            value: donationStats.ngosSupported,
            change: "+12",
            icon: Gift,
            color: "text-green-600",
            bgColor: "bg-green-100",
          },
          {
            title: "Lives Impacted",
            value: `${donationStats.impacted}+`,
            change: "+30%",
            icon: TrendingUp,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
          }
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change} this month</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filter Donation Needs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full p-2 border rounded-md">
                {malaysianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crisis Type</label>
              <select value={selectedCrisis} onChange={(e) => setSelectedCrisis(e.target.value)} className="w-full p-2 border rounded-md">
                {crisisTypes.map((crisis) => (
                  <option key={crisis} value={crisis}>{crisis}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => {
                  setSelectedState("All");
                  setSelectedCrisis("All");
                  setDonationType("Both");
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

      {/* Urgent Needs */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Urgent Needs</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNeeds.map((need, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-blue-100">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-blue-900">{need.ngoName}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {need.ngoState}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getUrgencyColor(need.target?.urgency || "Medium")}>
                      {need.target?.urgency || "Medium"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {need.title}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{need.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Deadline: {need.target?.deadline || "N/A"}</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => navigate(`/donate/${need.ngoId}`)}>
                  <Heart className="mr-2 h-4 w-4" />
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredNeeds.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No urgent needs found matching your filters.</p>
            <p className="text-gray-400">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicDonations;
