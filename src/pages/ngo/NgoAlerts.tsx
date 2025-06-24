// Modified NgoAlerts.tsx with helper assignment dropdown for ongoing alerts
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Map, Calendar, Bell } from "lucide-react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";
import { useEffect, useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";

interface Alert {
  id: string;
  emergency: string;
  location: { _latitude: number; _longitude: number };
  timestamp: Date;
  status: "active" | "resolved";
  userId: string;
  userName: string;
  ngo?: string;
  distance?: number;
  assignedHelper?: string;
}

interface Helper {
  id: string;
  name: string;
  currentEmergency?: string;
}

const statusColors = {
  active: "bg-red-100 text-red-800",
  resolved: "bg-green-100 text-green-800",
};

const NgoAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [ngoLocation, setNgoLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [ngoId, setNgoId] = useState<string | null>(null);
  const [routeTo, setRouteTo] = useState<{ lat: number; lng: number } | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [helpers, setHelpers] = useState<Helper[]>([]);

  const db = getFirestore(app);
  const auth = getAuth(app);

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (val: number) => (val * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchNgoInfo = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const ngoSnap = await getDocs(collection(db, "ngos"));
    const ngoDoc = ngoSnap.docs.find((doc) => doc.data().admin === userId);
    if (!ngoDoc) return;
    const data = ngoDoc.data();
    setNgoId(ngoDoc.id);
    if (data.location) {
      setNgoLocation({
        lat: data.location.latitude || data.location._latitude,
        lng: data.location.longitude || data.location._longitude,
      });
    }
  };

  const fetchHelpers = async (ngoIdParam?: string) => {
    const ngoRef = doc(db, "ngos", ngoIdParam ?? ngoId!);
    const ngoDoc = await getDoc(ngoRef);
    const helperIds: string[] = ngoDoc.data()?.helpers ?? [];

    const usersSnap = await getDocs(collection(db, "users"));
    const helperUsers: Helper[] = usersSnap.docs
      .filter((doc) => helperIds.includes(doc.id))
      .map((doc) => ({ id: doc.id, ...doc.data() })) as Helper[];

    setHelpers(helperUsers);
  };

  const fetchAlerts = async () => {
    const alertSnap = await getDocs(collection(db, "sos_alerts"));
    const data: Alert[] = await Promise.all(
      alertSnap.docs.map(async (docSnap) => {
        const data = docSnap.data();
        let userName = "Unknown User";

        try {
          const userRef = doc(db, "users", data.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            userName = userSnap.data().name ?? "Unnamed";
          }
        } catch {}

        const lat = data.location?._latitude ?? 0;
        const lng = data.location?._longitude ?? 0;
        const distance = ngoLocation
          ? getDistance(ngoLocation.lat, ngoLocation.lng, lat, lng)
          : undefined;

        return {
          id: docSnap.id,
          emergency: data.emergency ?? "Unknown",
          location: data.location ?? { _latitude: 0, _longitude: 0 },
          timestamp: data.timestamp?.toDate?.() ?? new Date(),
          status: data.status ?? "active",
          userId: data.userId ?? "",
          userName,
          ngo: data.ngo ?? undefined,
          distance,
          assignedHelper: data.assignedHelper ?? undefined,
        };
      })
    );
    setAlerts(data);
  };

  useEffect(() => {
    fetchNgoInfo();
  }, []);

  useEffect(() => {
    if (ngoLocation && ngoId) {
      fetchAlerts();
      fetchHelpers();
    }
  }, [ngoLocation, ngoId]);

  useEffect(() => {
    if (!routeTo || !ngoLocation) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: ngoLocation,
        destination: routeTo,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) setDirections(result);
      }
    );
  }, [routeTo, ngoLocation]);

  const unassignedAlerts = useMemo(() =>
    alerts.filter((a) => a.status === "active" && !a.ngo).sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)), [alerts]);

  const ongoingAlerts = useMemo(() =>
    alerts.filter((a) => a.status === "active" && a.ngo === ngoId), [alerts, ngoId]);

  const resolvedAlerts = useMemo(() =>
    alerts.filter((a) => a.status === "resolved" && a.ngo === ngoId), [alerts, ngoId]);

  const handleAccept = async (alertId: string) => {
    if (!ngoId) return;
    const alertRef = doc(db, "sos_alerts", alertId);
    await updateDoc(alertRef, { ngo: ngoId });
    fetchAlerts();
  };

  const handleRoute = (lat: number, lng: number) => {
    setRouteTo({ lat, lng });
  };

  const handleAssignHelper = async (alertId: string, helperId: string) => {
    const alertRef = doc(db, "sos_alerts", alertId);
    const helperRef = doc(db, "users", helperId);
    await Promise.all([
      updateDoc(alertRef, { assignedHelper: helperId }),
      updateDoc(helperRef, { currentEmergency: alertId }),
    ]);
    toast.success("Helper assigned successfully");
    fetchAlerts();
    fetchHelpers();
  };

  const renderAlertCard = (alert: Alert, showAccept = false, showAssign = false) => (
    <Card key={alert.id}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-red-500" />
            {alert.emergency}
          </CardTitle>
          <Badge className={statusColors[alert.status]}>{alert.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center"><User className="h-4 w-4 mr-2" />{alert.userName}</div>
        <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" />{alert.timestamp.toLocaleString()}</div>
        <div className="flex items-center"><Map className="h-4 w-4 mr-2" />Lat: {alert.location._latitude?.toFixed(5)}, Lng: {alert.location._longitude?.toFixed(5)}</div>
        {alert.distance !== undefined && <div className="text-xs text-gray-500">~{alert.distance?.toFixed(2)} km away</div>}
        <div className="flex gap-2 pt-2">
          <Button onClick={() => handleRoute(alert.location._latitude, alert.location._longitude)} size="sm" variant="outline">Route</Button>
          {showAccept && <Button onClick={() => handleAccept(alert.id)} size="sm" className="bg-blue-600 text-white">Accept Alert</Button>}
        </div>
        {showAssign && (
          <div className="pt-2">
            <Select onValueChange={(val) => handleAssignHelper(alert.id, val)}>
              <SelectTrigger><SelectValue placeholder="Assign Helper" /></SelectTrigger>
              <SelectContent>
                {helpers
                  .filter((h) => h.currentEmergency !== alert.id && !h.currentEmergency)
                  .map((h) => (
                    <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const mapCenter = ngoLocation ?? { lat: 3.139, lng: 101.6869 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">NGO Alerts</h1>
        <p className="text-gray-600">View and respond to SOS alerts near you.</p>
      </div>

      <Tabs defaultValue="alerts">
        <TabsList>
          <TabsTrigger value="alerts">Nearby Alerts</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <div className="grid gap-4">
            {unassignedAlerts.length === 0 ? (
              <div className="text-center text-gray-500">No unassigned alerts nearby.</div>
            ) : (
              unassignedAlerts.map((a) => renderAlertCard(a, true))
            )}
          </div>
        </TabsContent>

        <TabsContent value="ongoing">
          <div className="grid gap-4">
            {ongoingAlerts.length === 0 ? (
              <div className="text-center text-gray-500">No ongoing alerts assigned to this NGO.</div>
            ) : (
              ongoingAlerts.map((a) => renderAlertCard(a, false, a.assignedHelper !== undefined ? false : true))
            )}
          </div>
        </TabsContent>

        <TabsContent value="resolved">
          <div className="grid gap-4">
            {resolvedAlerts.length === 0 ? (
              <div className="text-center text-gray-500">No resolved alerts for this NGO.</div>
            ) : (
              resolvedAlerts.map((a) => renderAlertCard(a))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {ngoLocation && (
        <div className="mt-6">
          <Card>
            <CardHeader><CardTitle>Map & Route</CardTitle></CardHeader>
            <CardContent>
              <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={mapCenter} zoom={12}>
                <Marker position={ngoLocation} label="NGO" />
                {routeTo && <Marker position={routeTo} label="Target" />}
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NgoAlerts;
