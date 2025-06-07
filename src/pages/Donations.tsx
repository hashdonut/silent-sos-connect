
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  CreditCard, 
  Users, 
  TrendingUp,
  Gift,
  Shield
} from "lucide-react";

const Donations = () => {
  const donationMethods = [
    {
      name: "Stripe",
      description: "Secure online payments with credit/debit cards",
      icon: "💳",
      features: ["Instant processing", "International cards", "Secure encryption"],
      supported: true,
    },
    {
      name: "ToyyibPay",
      description: "Malaysian payment gateway supporting local banks",
      icon: "🏦",
      features: ["FPX support", "Local banks", "Islamic compliant"],
      supported: true,
    },
    {
      name: "PayPal",
      description: "Global payment platform",
      icon: "🌐",
      features: ["International reach", "Buyer protection", "Easy setup"],
      supported: false,
    },
  ];

  const donationStats = [
    {
      title: "Total Donations",
      value: "RM 45,230",
      change: "+15%",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Monthly Donors",
      value: "234",
      change: "+8%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "NGOs Supported",
      value: "12",
      change: "+2",
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "+0.5%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const beneficiaryNGOs = [
    {
      name: "Women's Aid Organisation",
      description: "Supporting women and children affected by violence",
      raised: "RM 12,450",
      goal: "RM 20,000",
      percentage: 62,
      urgency: "High",
    },
    {
      name: "Befrienders KL",
      description: "24/7 emotional support and suicide prevention",
      raised: "RM 8,920",
      goal: "RM 15,000",
      percentage: 59,
      urgency: "Medium",
    },
    {
      name: "Shelter Home for Children",
      description: "Safe haven for children in need of protection",
      raised: "RM 15,680",
      goal: "RM 25,000",
      percentage: 63,
      urgency: "High",
    },
    {
      name: "AWAM",
      description: "Advocating for gender equality and women's rights",
      raised: "RM 8,180",
      goal: "RM 12,000",
      percentage: 68,
      urgency: "Low",
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Support Our NGO Partners</h1>
        <p className="text-purple-100">
          Help us continue providing essential services to those in need. Every donation makes a difference.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {donationStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donation Methods */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {donationMethods.map((method, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    method.supported ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <h4 className="font-semibold">{method.name}</h4>
                    </div>
                    {method.supported ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Coming Soon</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                  
                  <div className="space-y-1">
                    {method.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center text-xs text-gray-500">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Heart className="mr-2 h-4 w-4" />
                  Donate Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NGO Beneficiaries */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5" />
                NGO Beneficiaries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {beneficiaryNGOs.map((ngo, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{ngo.name}</h4>
                      <p className="text-sm text-gray-600">{ngo.description}</p>
                    </div>
                    <Badge className={getUrgencyColor(ngo.urgency)}>
                      {ngo.urgency} Priority
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{ngo.raised} of {ngo.goal}</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${ngo.percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{ngo.percentage}% funded</span>
                      <Button size="sm" variant="outline">
                        Donate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            How Your Donations Help
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Emergency Support</h3>
              <p className="text-sm text-gray-600">
                Immediate assistance for those in crisis situations, including shelter, food, and emergency counseling.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Training & Education</h3>
              <p className="text-sm text-gray-600">
                Funding workshops, training programs, and educational resources for both staff and community members.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Long-term Programs</h3>
              <p className="text-sm text-gray-600">
                Supporting sustainable programs that create lasting positive change in communities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transparency */}
      <Card className="bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-900">Transparency & Trust</h3>
          </div>
          <p className="text-blue-800 mb-4">
            We believe in complete transparency. All donations are tracked and reported monthly, 
            showing exactly how funds are allocated and the impact they create.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="font-semibold text-blue-900">95%</p>
              <p className="text-blue-700">Goes directly to programs</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-blue-900">3%</p>
              <p className="text-blue-700">Administrative costs</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-blue-900">2%</p>
              <p className="text-blue-700">Platform maintenance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Donations;
