
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Users, Calendar, TrendingUp } from "lucide-react";

const Index = () => {
  // Mock data for statistics
  const stats = [
    {
      title: "Total Alerts Today",
      value: "23",
      change: "+12%",
      icon: Bell,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Active NGOs",
      value: "156",
      change: "+3%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Resolved Cases",
      value: "89%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Responses",
      value: "7",
      change: "-2",
      icon: Calendar,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "Silent Alert",
      location: "Kuala Lumpur",
      time: "2 minutes ago",
      status: "Pending",
    },
    {
      id: 2,
      type: "Emergency Call",
      location: "Petaling Jaya",
      time: "5 minutes ago",
      status: "Responded",
    },
    {
      id: 3,
      type: "Silent Alert",
      location: "Shah Alam",
      time: "12 minutes ago",
      status: "Resolved",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-red-100 text-red-800";
      case "Responded":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to SilentSOS+ Admin</h1>
        <p className="text-blue-100">
          Monitor emergency alerts and manage NGO partnerships to help those in need.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change} from yesterday</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{alert.type}</p>
                    <p className="text-sm text-gray-600">{alert.location}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <Badge className={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-500">
                  Real-time emergency locations will be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
