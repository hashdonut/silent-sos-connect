
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Map, Calendar, User } from "lucide-react";

const Alerts = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const alerts = [
    {
      id: 1,
      type: "Silent Alert",
      user: "User #4521",
      location: "Kuala Lumpur, Jalan Bukit Bintang",
      coordinates: "3.1478, 101.7013",
      time: "2024-01-15 14:30:22",
      status: "Pending",
      priority: "High",
      description: "Emergency assistance required",
    },
    {
      id: 2,
      type: "Emergency Call",
      user: "User #4522",
      location: "Petaling Jaya, SS2",
      coordinates: "3.1133, 101.6284",
      time: "2024-01-15 14:25:15",
      status: "Responded",
      priority: "Critical",
      description: "Domestic violence incident",
    },
    {
      id: 3,
      type: "Silent Alert",
      user: "User #4523",
      location: "Shah Alam, Section 14",
      coordinates: "3.0733, 101.5185",
      time: "2024-01-15 14:20:08",
      status: "Resolved",
      priority: "Medium",
      description: "Safety concern resolved",
    },
    {
      id: 4,
      type: "Panic Button",
      user: "User #4524",
      location: "Subang Jaya, SS15",
      coordinates: "3.0478, 101.5841",
      time: "2024-01-15 14:15:45",
      status: "Pending",
      priority: "Critical",
      description: "Immediate assistance needed",
    },
  ];

  const statusColors = {
    Pending: "bg-red-100 text-red-800",
    Responded: "bg-yellow-100 text-yellow-800",
    Resolved: "bg-green-100 text-green-800",
  };

  const priorityColors = {
    Low: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-orange-100 text-orange-800",
    Critical: "bg-red-100 text-red-800",
  };

  const filteredAlerts = selectedStatus === "All" 
    ? alerts 
    : alerts.filter(alert => alert.status === selectedStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Real-time Alerts</h1>
          <p className="text-gray-600">Monitor and respond to emergency alerts</p>
        </div>
        
        <div className="flex gap-2">
          {["All", "Pending", "Responded", "Resolved"].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              onClick={() => setSelectedStatus(status)}
              className="text-sm"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-red-500" />
                    {alert.type}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className={priorityColors[alert.priority as keyof typeof priorityColors]}>
                      {alert.priority}
                    </Badge>
                    <Badge className={statusColors[alert.status as keyof typeof statusColors]}>
                      {alert.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="mr-2 h-4 w-4" />
                    {alert.user}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    {alert.time}
                  </div>
                </div>
                
                <div className="flex items-start text-sm text-gray-600">
                  <Map className="mr-2 h-4 w-4 mt-0.5" />
                  <div>
                    <p>{alert.location}</p>
                    <p className="text-xs text-gray-500">{alert.coordinates}</p>
                  </div>
                </div>
                
                <p className="text-sm">{alert.description}</p>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    View on Map
                  </Button>
                  {alert.status === "Pending" && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Respond
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map and Statistics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-xs text-gray-500">
                    Emergency locations displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Alerts</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Silent Alerts</span>
                <span className="font-semibold">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Emergency Calls</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Response Rate</span>
                <span className="font-semibold text-green-600">89%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
