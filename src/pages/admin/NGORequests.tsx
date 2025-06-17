import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { app } from "@/contexts/FirebaseContext";
import { useToast } from "@/components/ui/use-toast";
import { approveNGO, rejectNGO } from "@/api/ngo";
import { useAuth } from "@/contexts/AuthContext";

type NGORequest = {
  id: string;
  ngo_contact: string;
  ngo_name: string;
  ngo_email: string;
  personal_contact: string;
  personal_name: string;
  personal_email: string;
  website: string;
  verification_document: string;
  address: string;
  place_id: string;
  description: string;
  password: string;
};

const NGORequests = () => {
  const { user } = useAuth();
  console.log("Current user:", user);
  const [requests, setRequests] = useState<NGORequest[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, "ngo_requests"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NGORequest));
      console.log("Fetched NGO requests:", data);
      setRequests(data);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (request: NGORequest) => {
    if (!user || !user.email || !user.password) {
      toast({ title: "Error", description: "User not authenticated", variant: "destructive" });
      return;
    }

    console.log("Approving request:", request);
    console.log("Current user:", user);
    // try {
    //   await approveNGO(request.id, user.email, user.password);
    //   setRequests(prev => prev.filter(r => r.id !== request.id));
    //   toast({ title: "Approved", description: `${request.ngo_name} has been approved.` });
    // } catch (error) {
    //   console.error("Approval failed", error);
    //   toast({ title: "Error", description: "Failed to approve request", variant: "destructive" });
    // }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectNGO(id); // Reuse helper
      setRequests(prev => prev.filter(r => r.id !== id));
      toast({ title: "Rejected", description: `Request has been rejected.` });
    } catch (error) {
      console.error("Rejection failed", error);
      toast({ title: "Error", description: "Failed to reject request", variant: "destructive" });
    }
  };

  if (loading) return <p className="p-6 text-center text-gray-600">Loading requests...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">NGO Registration Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-600">No pending requests.</p>
      ) : (
        requests.map((req) => (
          <Card key={req.id} className="mb-6">
            <CardHeader>
              <CardTitle>{req.ngo_name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><strong>NGO Contact:</strong> {req.ngo_contact}</div>
              <div><strong>NGO Email:</strong> {req.ngo_email}</div>
              <div><strong>Website:</strong> {req.website}</div>
              <div><strong>Address:</strong> {req.address}</div>
              <div><strong>Description:</strong> {req.description}</div>
              <div><strong>Place ID:</strong> {req.place_id}</div>
              <div><strong>Personal Name:</strong> {req.personal_name}</div>
              <div><strong>Personal Email:</strong> {req.personal_email}</div>
              <div><strong>Personal Contact:</strong> {req.personal_contact}</div>
              <div>
                <strong>Verification Document:</strong>{" "}
                <a href={req.verification_document} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  View
                </a>
              </div>

              <div className="flex gap-2 mt-4">
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(req)}>Approve</Button>
                <Button variant="destructive" onClick={() => handleReject(req.id)}>Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default NGORequests;
