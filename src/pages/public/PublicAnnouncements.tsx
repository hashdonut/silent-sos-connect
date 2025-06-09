
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Filter
} from "lucide-react";

const PublicAnnouncements = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedState, setSelectedState] = useState("All");

  const malaysianStates = [
    "All", "Kuala Lumpur", "Selangor", "Penang", "Johor", "Perak", "Kedah",
    "Kelantan", "Terengganu", "Pahang", "Negeri Sembilan", "Melaka", "Sabah", "Sarawak"
  ];

  const announcementTypes = ["All", "Training", "Campaign", "Donation", "Support", "Event", "Workshop"];

  const announcements = [
    {
      id: 1,
      title: "Emergency Response Training Workshop",
      content: "Join us for a comprehensive training session on emergency response procedures. Learn how to effectively handle crisis situations and support survivors. Open to all community members.",
      type: "Training",
      priority: "High",
      author: "Women's Aid Organisation (WAO)",
      authorLogo: "🛡️",
      date: "2024-01-20",
      time: "10:00 AM - 4:00 PM",
      location: "KL Community Center, Jalan Sultan",
      state: "Kuala Lumpur",
      attendees: 45,
      maxAttendees: 60,
      isPublic: true,
      registrationLink: "#",
      tags: ["Emergency Response", "Community Training", "Crisis Support"]
    },
    {
      id: 2,
      title: "Mental Health Awareness Campaign",
      content: "This month we're focusing on mental health awareness. Join our campaign to break the stigma and promote mental wellness. Resources and support groups are available for those in need.",
      type: "Campaign",
      priority: "Normal",
      author: "Befrienders KL",
      authorLogo: "🤝",
      date: "2024-01-15",
      time: "All Month",
      location: "Online & Community Centers",
      state: "Kuala Lumpur",
      attendees: 256,
      maxAttendees: null,
      isPublic: true,
      registrationLink: "#",
      tags: ["Mental Health", "Awareness", "Community Support"]
    },
    {
      id: 3,
      title: "Urgent: Donation Drive for Women's Shelter",
      content: "We urgently need donations of clothing, food, and household items for our women's shelter. Due to increased demand, we are running low on essential supplies. Every contribution makes a difference.",
      type: "Donation",
      priority: "Urgent",
      author: "AWAM (All Women's Action Society)",
      authorLogo: "💪",
      date: "2024-01-10",
      time: "9:00 AM - 6:00 PM",
      location: "Multiple Collection Points",
      state: "Selangor",
      attendees: 89,
      maxAttendees: null,
      isPublic: true,
      registrationLink: "#",
      tags: ["Urgent Donation", "Women's Shelter", "Essential Supplies"]
    },
    {
      id: 4,
      title: "Support Group Meeting for Survivors",
      content: "Weekly support group meeting for survivors and their families. A safe space to share experiences and receive emotional support from trained facilitators and peers.",
      type: "Support",
      priority: "Normal",
      author: "Shelter Home for Children",
      authorLogo: "🏠",
      date: "2024-01-18",
      time: "7:00 PM - 9:00 PM",
      location: "Community Hall, Section 14",
      state: "Selangor",
      attendees: 23,
      maxAttendees: 30,
      isPublic: true,
      registrationLink: "#",
      tags: ["Support Group", "Survivors", "Safe Space"]
    },
    {
      id: 5,
      title: "Self-Defense Workshop for Women",
      content: "Learn basic self-defense techniques in a supportive environment. This workshop is designed to build confidence and provide practical safety skills for women of all ages.",
      type: "Workshop",
      priority: "High",
      author: "Persatuan Kebajikan Wanita Penang",
      authorLogo: "🌸",
      date: "2024-01-25",
      time: "2:00 PM - 5:00 PM",
      location: "Penang Community Center",
      state: "Penang",
      attendees: 34,
      maxAttendees: 40,
      isPublic: true,
      registrationLink: "#",
      tags: ["Self-Defense", "Women's Safety", "Empowerment"]
    },
    {
      id: 6,
      title: "Mental Health First Aid Certification",
      content: "Become certified in Mental Health First Aid and learn how to provide initial support to someone experiencing a mental health crisis. Certificate provided upon completion.",
      type: "Training",
      priority: "Normal",
      author: "Mental Health Association of Johor",
      authorLogo: "🧠",
      date: "2024-01-28",
      time: "9:00 AM - 5:00 PM",
      location: "JB Training Center",
      state: "Johor",
      attendees: 15,
      maxAttendees: 25,
      isPublic: true,
      registrationLink: "#",
      tags: ["Mental Health", "Certification", "First Aid"]
    }
  ];

  const typeColors = {
    Training: "bg-blue-100 text-blue-800",
    Campaign: "bg-green-100 text-green-800",
    Donation: "bg-purple-100 text-purple-800",
    Support: "bg-yellow-100 text-yellow-800",
    Event: "bg-pink-100 text-pink-800",
    Workshop: "bg-indigo-100 text-indigo-800",
  };

  const priorityColors = {
    Normal: "bg-gray-100 text-gray-800",
    High: "bg-orange-100 text-orange-800",
    Urgent: "bg-red-100 text-red-800",
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Training":
        return <Users className="h-4 w-4" />;
      case "Campaign":
        return <Bell className="h-4 w-4" />;
      case "Donation":
        return <Heart className="h-4 w-4" />;
      case "Support":
        return <Users className="h-4 w-4" />;
      case "Workshop":
        return <Users className="h-4 w-4" />;
      case "Event":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesType = selectedType === "All" || announcement.type === selectedType;
    const matchesState = selectedState === "All" || announcement.state === selectedState;
    return matchesType && matchesState;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Announcements</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest events, training sessions, and support opportunities from our verified NGO partners
        </p>
      </div>

      {/* Filters */}
      <Card className="border-blue-100">
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold">{announcements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-100">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold">{announcements.reduce((sum, a) => sum + a.attendees, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-red-100">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Urgent Items</p>
                <p className="text-2xl font-bold">{announcements.filter(a => a.priority === "Urgent").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">States Covered</p>
                <p className="text-2xl font-bold">{new Set(announcements.map(a => a.state)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-lg transition-shadow border-blue-100">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{announcement.authorLogo}</div>
                    <div>
                      <p className="text-sm text-gray-600">{announcement.author}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {announcement.state}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(announcement.type)}
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={typeColors[announcement.type as keyof typeof typeColors]}>
                      {announcement.type}
                    </Badge>
                    <Badge className={priorityColors[announcement.priority as keyof typeof priorityColors]}>
                      {announcement.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-700">{announcement.content}</p>
              
              <div className="flex flex-wrap gap-2">
                {announcement.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p>{announcement.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p>{announcement.time}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{announcement.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p>
                      {announcement.attendees}
                      {announcement.maxAttendees && ` / ${announcement.maxAttendees}`}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Register Now
                </Button>
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Heart className="mr-2 h-4 w-4" />
                  Support This Cause
                </Button>
                <Button variant="outline" className="border-gray-200">
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No announcements found matching your filters.</p>
          <p className="text-gray-400">Try adjusting your search criteria.</p>
        </div>
      )}

      {/* Subscribe Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <Bell className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to get notified about new announcements, emergency alerts, and volunteer opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicAnnouncements;
