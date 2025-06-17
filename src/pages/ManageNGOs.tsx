import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, X, Shield } from "lucide-react";
import { approveNGO, rejectNGO } from "@/api/ngo";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const ManageNGOs = () => {
    const { user } = useAuth();
    console.log("Current user:", user);
  const [tab, setTab] = useState("requests");
  const [requests, setRequests] = useState<any[]>([]);
  const [ngos, setNGOs] = useState<any[]>([]);
  const [rejected, setRejected] = useState<any[]>([]);
  const db = getFirestore(app);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, "ngo_requests"));
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(doc => !doc.status || doc.status !== "rejected"); // Only pending
      setRequests(data);
    };

    const fetchNGOs = async () => {
      const snapshot = await getDocs(collection(db, "ngos"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNGOs(data);
    };

    const fetchRejected = async () => {
      const snapshot = await getDocs(collection(db, "ngo_requests"));
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(doc => doc.status === "rejected");
      setRejected(data);
    };

    fetchRequests();
    fetchNGOs();
    fetchRejected();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveNGO(id, user?.email || "", user?.password || "");
      setRequests(prev => prev.filter(r => r.id !== id));
      toast({
        title: "Approved",
        description: "NGO has been approved successfully.",
      });
    } catch (error) {
      console.error("Failed to approve NGO:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectNGO(id);
      setRequests(prev => prev.filter(r => r.id !== id));
      toast({
        title: "Rejected",
        description: "NGO request has been rejected.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Failed to reject NGO:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">NGO Management</h1>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="requests">NGO Requests</TabsTrigger>
          <TabsTrigger value="ngos">NGO List</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Requests</TabsTrigger>
        </TabsList>

        {/* NGO Requests Tab */}
        <TabsContent value="requests">
          <div className="space-y-4">
            {requests.map((req) => (
              <Card key={req.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{req.ngo_name}</h3>
                      <p className="text-gray-500 text-sm">{req.address}</p>
                      <p className="text-sm">
                        <strong>NGO Contact:</strong> {req.ngo_contact} | {req.ngo_email}
                      </p>
                      <p className="text-sm">
                        <strong>Personal Contact:</strong> {req.personal_name} ({req.personal_email}, {req.personal_contact})
                      </p>
                      <p className="text-sm"><strong>Website:</strong> {req.website}</p>
                      <a
                        href={req.verification_document}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Verification Document
                      </a>
                      <p className="text-sm text-gray-700 mt-2">{req.description}</p>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(req.id)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(req.id)}
                      >
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {requests.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No pending NGO registration requests.
            </div>
          )}
        </TabsContent>

        {/* NGOs Tab */}
        <TabsContent value="ngos">
          <div className="space-y-4">
            {ngos.map((ngo) => (
              <Card key={ngo.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        {ngo.name}
                        <Badge className="bg-green-100 text-green-800 flex items-center">
                          <Shield className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      </h3>
                      <p className="text-sm text-gray-600">{ngo.address}</p>
                      <p className="text-sm"><strong>Email:</strong> {ngo.email}</p>
                      <p className="text-sm"><strong>Contact:</strong> {ngo.contact}</p>
                      <p className="text-sm"><strong>Website:</strong> {ngo.website}</p>
                      <a
                        href={ngo.verification_document}
                        className="text-blue-500 underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Verification Document
                      </a>
                      <p className="text-sm text-gray-700 mt-2">{ngo.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {ngos.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No NGOs found.
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected">
          <div className="space-y-4">
            {rejected.map((req) => (
              <Card key={req.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-red-600">{req.ngo_name}</h3>
                    <p className="text-gray-500 text-sm">{req.address}</p>
                    <p className="text-sm">
                      <strong>NGO Contact:</strong> {req.ngo_contact} | {req.ngo_email}
                    </p>
                    <p className="text-sm">
                      <strong>Personal Contact:</strong> {req.personal_name} ({req.personal_email}, {req.personal_contact})
                    </p>
                    <p className="text-sm"><strong>Website:</strong> {req.website}</p>
                    <a
                      href={req.verification_document}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Verification Document
                    </a>
                    <p className="text-sm text-gray-700 mt-2">{req.description}</p>
                    <Badge className="bg-red-100 text-red-800 mt-2">Rejected</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {rejected.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No rejected NGO requests.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageNGOs;
