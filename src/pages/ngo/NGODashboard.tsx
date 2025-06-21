import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface NGO {
  id: string;
  name: string;
  email: string;
  contact: string;
  website?: string;
  address: string;
  description?: string;
}

const NGODashboard = () => {
  const { user } = useAuth(); // Should return { uid, email } or similar
  const [ngo, setNgo] = useState<NGO | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNGO = async () => {
    if (!user) return;

    const db = getFirestore(app);
    const q = query(collection(db, "ngos"), where("admin", "==", user.uid));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();
      setNgo({
        id: docSnap.id,
        name: data.name,
        email: data.email,
        contact: data.contact,
        website: data.website,
        address: data.address,
        description: data.description,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNGO();
  }, [user]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>

      {loading ? (
        <Card>
          <CardContent className="space-y-3 p-6">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ) : ngo ? (
        <Card>
          <CardHeader>
            <CardTitle>{ngo.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base">{ngo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="text-base">{ngo.contact}</p>
            </div>
            {ngo.website && (
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <a href={ngo.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {ngo.website}
                </a>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-base">{ngo.address}</p>
            </div>
            {ngo.description && (
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-base">{ngo.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="text-gray-600 italic">No NGO profile found for this account.</div>
      )}
    </div>
  );
};

export default NGODashboard;
