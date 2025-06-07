
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Map, 
  Bell, 
  Calendar, 
  Heart,
  Users,
  Shield
} from "lucide-react";

const NGODetails = () => {
  const { id } = useParams();

  // Mock NGO data - in real app, this would be fetched based on ID
  const ngo = {
    id: 1,
    name: "Women's Aid Organisation (WAO)",
    logo: "🛡️",
    region: "Kuala Lumpur",
    type: "Women's Shelter",
    description: "Supporting women and children affected by violence",
    verified: true,
    services: ["Crisis Support", "Legal Aid", "Counseling", "Emergency Shelter"],
    contactNumber: "+603-7956-3488",
    email: "info@wao.org.my",
    website: "https://wao.org.my",
    address: "P.O. Box 493, Jalan Sultan, 46760 Petaling Jaya, Selangor",
    mission: "To create a society free from domestic violence by providing support to women and children who are survivors of abuse.",
    established: "1982",
    staff: "25+ trained professionals",
    languages: ["English", "Bahasa Malaysia", "Mandarin", "Tamil"],
    operatingHours: "24/7 Crisis Hotline, Office: 9AM - 5PM",
    emergencyContact: "+603-7956-3488",
    recentActivity: [
      {
        type: "Emergency Response",
        description: "Responded to domestic violence case in Petaling Jaya",
        time: "2 hours ago",
      },
      {
        type: "Workshop",
        description: "Conducted awareness workshop at local community center",
        time: "1 day ago",
      },
      {
        type: "Support Session",
        description: "Group counseling session for survivors",
        time: "2 days ago",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/ngo-directory">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>
      </Link>

      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="text-5xl mr-4">{ngo.logo}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{ngo.name}</h1>
                <p className="text-lg text-gray-600">{ngo.region}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-800">{ngo.type}</Badge>
                  {ngo.verified && (
                    <Badge className="bg-green-100 text-green-800 flex items-center">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="bg-red-600 hover:bg-red-700">
                Emergency Contact
              </Button>
              <Button variant="outline">
                Visit Website
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mission & Description */}
          <Card>
            <CardHeader>
              <CardTitle>Mission & About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{ngo.description}</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Our Mission</h4>
                <p className="text-blue-800">{ngo.mission}</p>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services Provided</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ngo.services.map((service, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Heart className="mr-3 h-5 w-5 text-red-500" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ngo.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <Bell className="mr-3 h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{activity.type}</p>
                      <p className="text-gray-600">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">Emergency Hotline</p>
                <p className="text-lg font-semibold text-red-600">{ngo.emergencyContact}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">General Contact</p>
                <p>{ngo.contactNumber}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-blue-600">{ngo.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Website</p>
                <p className="text-blue-600">{ngo.website}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Address</p>
                <p className="text-sm">{ngo.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Organization Details */}
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">Established</p>
                <p>{ngo.established}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Staff</p>
                <p>{ngo.staff}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Operating Hours</p>
                <p className="text-sm">{ngo.operatingHours}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Languages Supported</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ngo.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="destructive">
                Emergency Contact
              </Button>
              <Button className="w-full" variant="outline">
                <Map className="mr-2 h-4 w-4" />
                View Location
              </Button>
              <Button className="w-full" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NGODetails;
