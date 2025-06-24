import { useEffect, useState, useMemo } from "react";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Map, Calendar, User } from "lucide-react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface Alert {
  id: string;
  emergency: string;
  location: { _latitude: number; _longitude: number };
  timestamp: Date;
  status: "active" | "resolved";
  userId: string;
  userName: string;
  ngo?: string;
}

const statusColors = {
  active: "bg-red-100 text-red-800",
  resolved: "bg-green-100 text-green-800",
};

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<"All" | "active" | "resolved">("All");

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "", // Already loaded
  // });

  const fetchAlerts = async () => {
    const db = getFirestore(app);
    const alertsSnapshot = await getDocs(collection(db, "sos_alerts"));

    const alertsData: Alert[] = await Promise.all(
      alertsSnapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        let userName = "Unknown User";

        try {
          const userRef = doc(db, "users", data.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            userName = userData.name || "Unnamed";
          }
        } catch (error) {
          console.warn(`User fetch failed for userId ${data.userId}:`, error);
        }

        return {
          id: docSnap.id,
          emergency: data.emergency ?? "Unknown Emergency",
          location: data.location ?? { _latitude: 0, _longitude: 0 },
          timestamp: data.timestamp?.toDate?.() ?? new Date(),
          status: data.status ?? "active",
          userId: data.userId ?? "",
          userName,
          ngo: data.ngo || undefined,
        };
      })
    );

    setAlerts(alertsData);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const filteredAlerts = selectedStatus === "All"
    ? alerts
    : alerts.filter((alert) => alert.status === selectedStatus);

  // Calculate dynamic center
  const mapCenter = useMemo(() => {
    if (filteredAlerts.length === 0) return { lat: 3.139, lng: 101.6869 }; // fallback

    const avgLat =
      filteredAlerts.reduce((sum, alert) => sum + (alert.location._latitude || 0), 0) /
      filteredAlerts.length;
    const avgLng =
      filteredAlerts.reduce((sum, alert) => sum + (alert.location._longitude || 0), 0) /
      filteredAlerts.length;

    return { lat: avgLat, lng: avgLng };
  }, [filteredAlerts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Real-time Alerts</h1>
          <p className="text-gray-600">Monitor and respond to emergency alerts</p>
        </div>

        <div className="flex gap-2">
          {["All", "active", "resolved"].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              onClick={() => setSelectedStatus(status as "All" | "active" | "resolved")}
              className="text-sm capitalize"
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
                    {alert.emergency}
                  </CardTitle>
                  <Badge className={statusColors[alert.status]}>
                    {alert.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="mr-2 h-4 w-4" />
                    {alert.userName}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    {alert.timestamp.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-start text-sm text-gray-600">
                  <Map className="mr-2 h-4 w-4 mt-0.5" />
                  <div>
                    <p>Lat: {alert?.location._latitude?.toFixed(5)}</p>
                    <p>Lng: {alert?.location._longitude?.toFixed(5)}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    View on Map
                  </Button>
                  {alert.status === "active" && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Respond
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map View */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Locations</CardTitle>
            </CardHeader>
            <CardContent>
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "300px" }}
                  center={mapCenter}
                  zoom={11}
                >
                  {filteredAlerts.map((alert) => {
                    const lat = Number(alert.location._latitude);
                    const lng = Number(alert.location._longitude);
                    if (!lat || !lng) return null; // Skip invalid markers

                    return (
                      <Marker
                        key={alert.id}
                        position={{ lat, lng }}
                        title={alert.emergency}
                      />
                    );
                  })}
                </GoogleMap>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
