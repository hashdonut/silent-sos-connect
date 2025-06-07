
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  Heart, 
  Users, 
  Bell,
  Plus,
  Edit
} from "lucide-react";

const Announcements = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "General",
    priority: "Normal",
  });

  const announcements = [
    {
      id: 1,
      title: "Emergency Response Training Workshop",
      content: "Join us for a comprehensive training session on emergency response procedures. Learn how to effectively handle crisis situations and support survivors.",
      type: "Training",
      priority: "High",
      author: "WAO Malaysia",
      date: "2024-01-15",
      time: "10:00 AM",
      location: "KL Community Center",
      attendees: 45,
    },
    {
      id: 2,
      title: "Mental Health Awareness Campaign",
      content: "This month we're focusing on mental health awareness. Resources and support groups are available for those in need.",
      type: "Campaign",
      priority: "Normal",
      author: "Befrienders KL",
      date: "2024-01-14",
      time: "All Day",
      location: "Online",
      attendees: 156,
    },
    {
      id: 3,
      title: "Donation Drive for Women's Shelter",
      content: "We urgently need donations of clothing, food, and household items for our women's shelter. Every contribution makes a difference.",
      type: "Donation",
      priority: "Urgent",
      author: "AWAM",
      date: "2024-01-13",
      time: "9:00 AM - 6:00 PM",
      location: "Multiple Locations",
      attendees: 89,
    },
    {
      id: 4,
      title: "Support Group Meeting",
      content: "Weekly support group meeting for survivors and their families. A safe space to share experiences and receive emotional support.",
      type: "Support",
      priority: "Normal",
      author: "Shelter Home",
      date: "2024-01-12",
      time: "7:00 PM",
      location: "Community Hall",
      attendees: 23,
    },
  ];

  const typeColors = {
    General: "bg-gray-100 text-gray-800",
    Training: "bg-blue-100 text-blue-800",
    Campaign: "bg-green-100 text-green-800",
    Donation: "bg-purple-100 text-purple-800",
    Support: "bg-yellow-100 text-yellow-800",
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
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const handleCreateAnnouncement = () => {
    // In a real app, this would submit to an API
    console.log("Creating announcement:", newAnnouncement);
    setIsCreating(false);
    setNewAnnouncement({ title: "", content: "", type: "General", priority: "Normal" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NGO Announcements</h1>
          <p className="text-gray-600">Share updates, events, and important information</p>
        </div>
        
        <Button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>

      {/* Create Announcement Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                placeholder="Enter announcement title"
              />
            </div>
            
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                placeholder="Enter announcement content"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={newAnnouncement.type}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="General">General</option>
                  <option value="Training">Training</option>
                  <option value="Campaign">Campaign</option>
                  <option value="Donation">Donation</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCreateAnnouncement}>
                Create Announcement
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Announcements</p>
                <p className="text-2xl font-bold">{announcements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold">313</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Urgent Posts</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(announcement.type)}
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={typeColors[announcement.type as keyof typeof typeColors]}>
                      {announcement.type}
                    </Badge>
                    <Badge className={priorityColors[announcement.priority as keyof typeof priorityColors]}>
                      {announcement.priority}
                    </Badge>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-700">{announcement.content}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Author:</span> {announcement.author}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {announcement.date}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {announcement.time}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {announcement.location}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="mr-1 h-4 w-4" />
                  {announcement.attendees} people reached
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
