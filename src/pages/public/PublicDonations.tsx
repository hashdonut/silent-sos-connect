
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const PublicDonations = () => {
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCrisis, setSelectedCrisis] = useState("All");
  const [donationType, setDonationType] = useState("Both");

  const malaysianStates = [
    "All", "Kuala Lumpur", "Selangor", "Penang", "Johor", "Perak", "Kedah",
    "Kelantan", "Terengganu", "Pahang", "Negeri Sembilan", "Melaka", "Sabah", "Sarawak"
  ];

  const crisisTypes = [
    "All", "Domestic Violence", "Mental Health", "Child Protection", 
    "Homelessness", "Women's Rights", "Crisis Support", "Emergency Relief"
  ];

  const donationStats = [
    {
      title: "Total Donations",
      value: "RM 145,230",
      change: "+25%",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Active Donors",
      value: "1,234",
      change: "+18%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "NGOs Supported",
      value: "52",
      change: "+12",
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Lives Impacted",
      value: "8,500+",
      change: "+30%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const urgentNeeds = [
    {
      ngo: "Women's Aid Organisation",
      state: "Kuala Lumpur",
      crisis: "Domestic Violence",
      type: "Material",
      items: ["Baby formula", "Diapers", "Mobile phones", "Hygiene products"],
      urgency: "Critical",
      deadline: "3 days",
      description: "Emergency supplies needed for new shelter residents"
    },
    {
      ngo: "Befrienders KL",
      state: "Kuala Lumpur", 
      crisis: "Mental Health",
      type: "Monetary",
      amount: "RM 15,000",
      urgency: "High",
      deadline: "1 week",
      description: "Funding for crisis intervention training program"
    },
    {
      ngo: "Shelter Home for Children",
      state: "Selangor",
      crisis: "Child Protection",
      type: "Material",
      items: ["School supplies", "Clothing", "Books", "Toys"],
      urgency: "Medium",
      deadline: "2 weeks",
      description: "Back-to-school support for 30 children"
    },
    {
      ngo: "Persatuan Kebajikan Penang",
      state: "Penang",
      crisis: "Domestic Violence",
      type: "Both",
      items: ["Women's clothing", "Personal care items"],
      amount: "RM 8,000",
      urgency: "High",
      deadline: "5 days",
      description: "Complete support package for domestic violence survivors"
    }
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

  const filteredNeeds = urgentNeeds.filter(need => {
    const matchesState = selectedState === "All" || need.state === selectedState;
    const matchesCrisis = selectedCrisis === "All" || need.crisis === selectedCrisis;
    const matchesType = donationType === "Both" || need.type === donationType || need.type === "Both";
    return matchesState && matchesCrisis && matchesType;
  });

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
        {donationStats.map((stat, index) => (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Crisis Type</label>
              <select
                value={selectedCrisis}
                onChange={(e) => setSelectedCrisis(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {crisisTypes.map((crisis) => (
                  <option key={crisis} value={crisis}>{crisis}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Donation Type</label>
              <select
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="Both">Both</option>
                <option value="Monetary">Money</option>
                <option value="Material">Items</option>
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
                    <CardTitle className="text-lg text-blue-900">{need.ngo}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {need.state}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getUrgencyColor(need.urgency)}>
                      {need.urgency}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {need.crisis}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700">{need.description}</p>
                
                {need.type === "Material" || need.type === "Both" ? (
                  <div>
                    <p className="font-medium text-gray-900 mb-2 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Items Needed:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {need.items?.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
                
                {need.type === "Monetary" || need.type === "Both" ? (
                  <div>
                    <p className="font-medium text-gray-900 mb-1 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Funding Goal:
                    </p>
                    <p className="text-2xl font-bold text-green-600">{need.amount}</p>
                  </div>
                ) : null}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Deadline: {need.deadline}</span>
                  <span>Type: {need.type}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Heart className="mr-2 h-4 w-4" />
                    Donate Now
                  </Button>
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredNeeds.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No urgent needs found matching your filters.</p>
          <p className="text-gray-400">Try adjusting your search criteria.</p>
        </div>
      )}

      {/* Payment Methods */}
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Secure Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-3xl mb-3">{method.icon}</div>
                  <h4 className="font-semibold mb-2">{method.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <p>Fee: {method.fee}</p>
                    <p>Processing: {method.processing}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trust & Security */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-8">
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Your Donation is Safe & Transparent</h3>
            <p className="text-blue-800 mb-6 max-w-3xl mx-auto">
              All donations are processed securely and tracked transparently. We provide regular updates 
              on how your contribution is making a difference in the lives of those who need it most.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                <div className="text-blue-700">Goes directly to NGOs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                <div className="text-blue-700">Verified organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
                <div className="text-blue-700">Donor support</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Call to Action */}
      <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Every Donation Saves Lives</h2>
          <p className="text-xl text-red-100 mb-6">
            Your contribution today could be the lifeline someone needs tomorrow
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
            <Heart className="mr-2 h-5 w-5" />
            Start Donating Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicDonations;
