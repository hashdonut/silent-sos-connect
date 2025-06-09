
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Map, 
  Phone, 
  Clock,
  Heart,
  Users,
  Shield,
  Mail,
  Globe,
  MapPin,
  Star,
  Languages
} from "lucide-react";

const PublicNGODetails = () => {
  const { id } = useParams();

  // Mock NGO data - in real app, this would be fetched based on ID
  const ngo = {
    id: 1,
    name: "Women's Aid Organisation (WAO)",
    logo: "🛡️",
    state: "Kuala Lumpur",
    type: "Women's Shelter",
    description: "Supporting women and children affected by violence with comprehensive services including shelter, counseling, and legal aid",
    verified: true,
    services: ["Crisis Support", "Legal Aid", "Counseling", "Emergency Shelter", "Skills Training", "Children's Support"],
    contactNumber: "+603-7956-3488",
    email: "info@wao.org.my",
    website: "https://wao.org.my",
    address: "P.O. Box 493, Jalan Sultan, 46760 Petaling Jaya, Selangor",
    mission: "To create a society free from domestic violence by providing support to women and children who are survivors of abuse.",
    established: "1982",
    staff: "25+ trained professionals",
    languages: ["English", "Bahasa Malaysia", "Mandarin", "Tamil"],
    emergencyHours: "24/7 Crisis Hotline",
    officeHours: "Monday - Friday: 9AM - 5PM",
    emergencyContact: "+603-7956-3488",
    rating: 4.9,
    reviews: 147,
    helpedThisYear: 850,
    successStories: [
      "Provided emergency shelter to 120 women and children",
      "Conducted 500+ counseling sessions",
      "Assisted with 80 legal cases",
      "Trained 200+ community volunteers"
    ],
    currentNeeds: [
      { item: "Baby formula and diapers", urgency: "High" },
      { item: "Women's clothing (all sizes)", urgency: "Medium" },
      { item: "Mobile phones for emergency communication", urgency: "High" },
      { item: "Hygiene products", urgency: "Medium" }
    ]
  };

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
            <div className="flex items-center">
              <div className="text-6xl mr-6">{ngo.logo}</div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{ngo.name}</h1>
                <div className="flex items-center text-lg text-gray-600 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  {ngo.state}, Malaysia
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-blue-100 text-blue-800">{ngo.type}</Badge>
                  {ngo.verified && (
                    <Badge className="bg-green-100 text-green-800 flex items-center">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified NGO
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(ngo.rating) ? 'fill-current' : ''}`} />
                  ))}
                  <span className="ml-2 text-gray-600">{ngo.rating} ({ngo.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Contact
              </Button>
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About & Mission */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-blue-600" />
                About & Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-lg">{ngo.description}</p>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 text-lg">Our Mission</h4>
                <p className="text-blue-800">{ngo.mission}</p>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-600" />
                Services We Provide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ngo.services.map((service, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg border">
                    <Heart className="mr-3 h-5 w-5 text-red-500" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Impact Statistics */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-600" />
                Our Impact This Year
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">{ngo.helpedThisYear}+</div>
                <div className="text-gray-600">Lives Touched</div>
              </div>
              <div className="space-y-3">
                {ngo.successStories.map((story, index) => (
                  <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-green-800">{story}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Needs */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-orange-600" />
                Current Donation Needs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ngo.currentNeeds.map((need, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <span className="font-medium text-orange-900">{need.item}</span>
                    </div>
                    <Badge className={need.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                      {need.urgency} Priority
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/donate">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Help Us Meet These Needs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-red-600">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-600 mb-1">24/7 Crisis Hotline</p>
                <p className="text-2xl font-bold text-red-700">{ngo.emergencyContact}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">General Contact</p>
                <p className="text-lg">{ngo.contactNumber}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-blue-600">{ngo.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Website</p>
                <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {ngo.website}
                </a>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Address</p>
                <p className="text-sm">{ngo.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Organization Details */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Established</p>
                <p className="font-semibold">{ngo.established}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Staff</p>
                <p>{ngo.staff}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Emergency Hours</p>
                <p className="text-sm">{ngo.emergencyHours}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Office Hours</p>
                <p className="text-sm">{ngo.officeHours}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Languages Supported</p>
                <div className="flex flex-wrap gap-1 mt-2">
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
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Phone className="mr-2 h-4 w-4" />
                Call Emergency Line
              </Button>
              <Button className="w-full" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button className="w-full" variant="outline">
                <Map className="mr-2 h-4 w-4" />
                Get Directions
              </Button>
              <Button className="w-full" variant="outline">
                <Globe className="mr-2 h-4 w-4" />
                Visit Website
              </Button>
            </CardContent>
          </Card>

          {/* Safety Note */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-yellow-800">Safety First</h3>
              </div>
              <p className="text-sm text-yellow-700">
                If you're in immediate danger, call 999. This organization is here to support you safely and confidentially.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicNGODetails;
