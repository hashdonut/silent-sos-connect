import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Users, Calendar, TrendingUp } from "lucide-react";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";

const Index = () => {
  const db = getFirestore(app);
  const [alertsToday, setAlertsToday] = useState(0);
  const [activeNgos, setActiveNgos] = useState(0);
  const [resolvedPercentage, setResolvedPercentage] = useState("0%");
  const [pendingResponses, setPendingResponses] = useState(0);
  const [recentAlerts, setRecentAlerts] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchStats = async () => {
      const alertsSnap = await getDocs(collection(db, "sos_alerts"));
      const ngosSnap = await getDocs(collection(db, "ngos"));

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let todayCount = 0;
      let pending = 0;
      let resolved = 0;
      const recent: any[] = [];

      alertsSnap.docs.forEach((doc) => {
        const data = doc.data();
        const time = data.timestamp?.toDate?.() ?? new Date();

        if (time >= today) todayCount++;
        if (data.status === "active") pending++;
        if (data.status === "resolved") resolved++;

        recent.push({
          id: doc.id,
          type: data.emergency,
          location: data.location?.address || "Unknown",
          time: time.toLocaleString(),
          status: data.status === "resolved" ? "Resolved" : data.ngo ? "Responded" : "Pending",
        });
      });

      const total = resolved + pending;
      const resolvedPct = total > 0 ? `${Math.round((resolved / total) * 100)}%` : "0%";

      setAlertsToday(todayCount);
      setActiveNgos(ngosSnap.size);
      setPendingResponses(pending);
      setResolvedPercentage(resolvedPct);
      setRecentAlerts(recent.slice(0, 5));
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Alerts Today",
      value: alertsToday.toString(),
      change: "+N/A",
      icon: Bell,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Active NGOs",
      value: activeNgos.toString(),
      change: "+N/A",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Resolved Cases",
      value: resolvedPercentage,
      change: "+N/A",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Responses",
      value: pendingResponses.toString(),
      change: "-N/A",
      icon: Calendar,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to SilentSOS+ Admin</h1>
        <p className="text-blue-100">
          Monitor emergency alerts and manage NGO partnerships to help those in need.
        </p>
      </div>

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
                  <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
