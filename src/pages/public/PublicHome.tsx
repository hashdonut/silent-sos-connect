
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Heart, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

const PublicHome = () => {
  const features = [
    {
      icon: Shield,
      title: "24/7 Emergency Support",
      description: "Immediate access to verified NGOs and emergency responders across Malaysia"
    },
    {
      icon: Users,
      title: "Verified NGO Network",
      description: "Connect with trusted organizations specializing in various crisis situations"
    },
    {
      icon: Heart,
      title: "Community Support",
      description: "Make a difference through donations and volunteer opportunities"
    },
    {
      icon: Phone,
      title: "Silent Alert System",
      description: "Discreet emergency assistance when you can't speak or call for help"
    }
  ];

  const stats = [
    { number: "50+", label: "Verified NGOs" },
    { number: "24/7", label: "Emergency Support" },
    { number: "13", label: "States Covered" },
    { number: "1000+", label: "Lives Helped" }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Safety Network
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> is Here</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            SilentSOS+ connects you with verified NGOs and emergency responders across Malaysia. 
            Get help discreetly when you need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ngos">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Find Help Now
              </Button>
            </Link>
            <Link to="/donate">
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                Support Others
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Help
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive support system ensures help is always within reach
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Banner */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-8 text-center">
            <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-900 mb-2">In Immediate Danger?</h3>
            <p className="text-red-800 mb-4">
              If you're in immediate danger, call emergency services or use our silent alert feature
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Emergency: 999
              </Button>
              <Button size="lg" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                Silent Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      </section> */}

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting help is simple and secure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Find Nearby Help</h3>
            <p className="text-gray-600">
              Browse verified NGOs in your area or let us find the closest support services
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Connect Safely</h3>
            <p className="text-gray-600">
              Reach out through secure channels designed to protect your privacy and safety
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Get Support</h3>
            <p className="text-gray-600">
              Receive immediate assistance from trained professionals who understand your situation
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you need help or want to help others, join our community of support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ngos">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Users className="mr-2 h-5 w-5" />
                  Browse NGOs
                </Button>
              </Link>
              <Link to="/donate">
                <Button size="lg" variant="outline" className="border-white text-blue-600 hover:bg-white/10">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PublicHome;
