import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Users, Bell, Plus } from "lucide-react";

const typeColors: Record<string, string> = {
  General: "bg-gray-100 text-gray-800",
  Training: "bg-blue-100 text-blue-800",
  Campaign: "bg-green-100 text-green-800",
  Donation: "bg-purple-100 text-purple-800",
  Support: "bg-yellow-100 text-yellow-800",
  Event: "bg-pink-100 text-pink-800",
  Workshop: "bg-indigo-100 text-indigo-800",
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

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [ngos, setNgos] = useState<Record<string, DocumentData>>({});

  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      const [announcementSnap, ngoSnap] = await Promise.all([
        getDocs(collection(db, "announcements")),
        getDocs(collection(db, "ngos")),
      ]);

      const ngoMap: Record<string, DocumentData> = {};
      ngoSnap.docs.forEach((doc) => {
        ngoMap[doc.id] = doc.data();
      });
      setNgos(ngoMap);

      const announcementsWithNgo = announcementSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        ngoDetails: ngoMap[doc.data().ngo] || null,
      }));
      setAnnouncements(announcementsWithNgo);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Announcements</h1>
          <p className="text-gray-600">Monitor announcements from all NGOs</p>
        </div>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">No announcements found.</p>
        ) : (
          announcements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(announcement.type)}
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Badge className={typeColors[announcement.type] || "bg-gray-100 text-gray-800"}>
                        {announcement.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {announcement.timestamp?.toDate?.().toLocaleString?.()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 text-gray-700">
                <p>{announcement.description}</p>
                <p className="text-sm">
                  <strong>Location:</strong> {announcement.address}
                </p>
                {announcement.ngoDetails && (
                  <p className="text-sm text-gray-600">
                    <strong>NGO:</strong> {announcement.ngoDetails.name}
                    {announcement.ngoDetails.contact && (
                      <span className="ml-2">
                        <strong>Contact:</strong> {announcement.ngoDetails.contact}
                      </span>
                    )}
                    {announcement.ngoDetails.email && (
                      <span className="ml-2">
                        <strong>Email:</strong> {announcement.ngoDetails.email}
                      </span>
                    )}
                  </p>
                )}

              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
