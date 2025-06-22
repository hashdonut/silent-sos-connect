import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@/contexts/FirebaseContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar } from "lucide-react";

const typeColors: Record<string, string> = {
  General: "bg-gray-100 text-gray-800",
  Training: "bg-blue-100 text-blue-800",
  Campaign: "bg-green-100 text-green-800",
  Donation: "bg-purple-100 text-purple-800",
  Support: "bg-yellow-100 text-yellow-800",
  Event: "bg-pink-100 text-pink-800",
  Workshop: "bg-indigo-100 text-indigo-800",
};

const urgencyColor = (urgency: string) => {
  switch (urgency) {
    case "Critical":
      return "bg-red-100 text-red-800";
    case "High":
      return "bg-orange-100 text-orange-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const crisisTypes = [
  "Domestic Violence", "Mental Health", "Child Protection", 
  "Homelessness", "Women's Rights", "Crisis Support", "Emergency Relief"
];

const NgoAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    type: "General",
    address: "",
    target: {
      amount: "",
      crisis: "",
      urgency: "",
      deadline: ""
    }
  });

  const db = getFirestore(app);
  const auth = getAuth(app);
  const [ngoId, setNgoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNgoIdAndAnnouncements = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const ngoSnap = await getDocs(collection(db, "ngos"));
      const ngoDoc = ngoSnap.docs.find((doc) => doc.data().admin === userId);
      if (!ngoDoc) return;

      const id = ngoDoc.id;
      setNgoId(id);
      await fetchAnnouncements(id);
    };

    fetchNgoIdAndAnnouncements();
  }, []);

  const fetchAnnouncements = async (ngoId: string) => {
    const q = query(collection(db, "announcements"), where("ngo", "==", ngoId));
    const snap = await getDocs(q);
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAnnouncements(data);
  };

  const handleCreateAnnouncement = async () => {
    if (!ngoId || !newAnnouncement.title || !newAnnouncement.description) return;

    const docRef = await addDoc(collection(db, "announcements"), {
      title: newAnnouncement.title,
      description: newAnnouncement.description,
      address: newAnnouncement.address,
      type: newAnnouncement.type,
      ngo: ngoId,
      timestamp: Timestamp.now(),
      target: newAnnouncement.type === "Donation" ? {
        amount: newAnnouncement.target.amount,
        crisis: newAnnouncement.target.crisis,
        urgency: newAnnouncement.target.urgency,
        deadline: newAnnouncement.target.deadline
      } : null
    });

    await updateDoc(docRef, { id: docRef.id });

    setNewAnnouncement({
      title: "",
      description: "",
      type: "General",
      address: "",
      target: {
        amount: "",
        crisis: "",
        urgency: "",
        deadline: ""
      }
    });

    setIsCreating(false);
    fetchAnnouncements(ngoId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NGO Announcements</h1>
          <p className="text-gray-600">Share updates, events, and important information</p>
        </div>

        <Button onClick={() => setIsCreating(!isCreating)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>

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
                placeholder="Enter title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newAnnouncement.description}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
                placeholder="Enter announcement description"
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={newAnnouncement.type}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                {Object.keys(typeColors).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newAnnouncement.address}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, address: e.target.value })}
                placeholder="Enter location/address"
              />
            </div>

            {newAnnouncement.type === "Donation" && (
              <>
                <div>
                  <Label htmlFor="crisis">Crisis Type</Label>
                  <select
                    id="crisis"
                    value={newAnnouncement.target.crisis}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: { ...newAnnouncement.target, crisis: e.target.value } })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select a crisis type</option>
                    {crisisTypes.map((crisis) => (
                      <option key={crisis} value={crisis}>{crisis}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="urgency">Urgency</Label>
                  <select
                    id="urgency"
                    value={newAnnouncement.target.urgency}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: { ...newAnnouncement.target, urgency: e.target.value } })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select urgency level</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="text"
                    value={newAnnouncement.target.deadline}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: { ...newAnnouncement.target, deadline: e.target.value } })}
                    placeholder="e.g., 3 days, 1 week"
                  />
                </div>

                <div>
                  <Label htmlFor="amount">Target Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newAnnouncement.target.amount}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target: { ...newAnnouncement.target, amount: e.target.value } })}
                    placeholder="Enter target amount"
                  />
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={handleCreateAnnouncement}>Create Announcement</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{announcement.title}</CardTitle>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <Badge className={typeColors[announcement.type] || "bg-gray-100 text-gray-800"}>
                      {announcement.type}
                    </Badge>
                    {announcement.type === "Donation" && announcement.target && (
                      <>
                        <Badge className={urgencyColor(announcement.target.urgency || "")}>
                          {announcement.target.urgency}
                        </Badge>
                        <Badge variant="outline">{announcement.target.crisis}</Badge>
                        <span className="text-sm text-gray-600">
                          Target: RM {announcement.target.amount}
                        </span>
                        <span className="text-sm text-gray-600">
                          Deadline: {announcement.target.deadline}
                        </span>
                      </>
                    )}
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {announcement.timestamp?.toDate?.().toLocaleString?.()}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-700">
              <p>{announcement.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Location:</strong> {announcement.address}
              </p>
            </CardContent>
          </Card>
        ))}

        {announcements.length === 0 && (
          <p className="text-center text-gray-500">No announcements found.</p>
        )}
      </div>
    </div>
  );
};

export default NgoAnnouncements;
