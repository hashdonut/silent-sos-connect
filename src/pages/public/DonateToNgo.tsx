import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { app } from "@/contexts/FirebaseContext";
import { getAuth } from "firebase/auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const paymentMethods = ["Card", "Touch 'n Go", "Bank Transfer"];

const DonateToNgo = () => {
  const { ngoId } = useParams();
  const [searchParams] = useSearchParams();
  const announcementId = searchParams.get("announcement") || null;

  const db = getFirestore(app);
  const auth = getAuth(app);

  const navigate = useNavigate();

  const [ngo, setNgo] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchNgo = async () => {
      if (!ngoId) return;
      const docRef = doc(db, "ngos", ngoId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setNgo(snap.data());
      }
    };

    fetchNgo();
  }, [ngoId]);

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({ title: "Error", description: "Please enter a valid amount and login first." });
      return;
    }

    setIsSubmitting(true);

    try {
      const donation = {
        amount: Number(amount),
        ngo: ngoId,
        user: user.uid,
        remarks,
        announcement: announcementId || null,
        timestamp: new Date(),
        paymentMethod,
      };

      console.log("Submitting donation:", donation);

      const docRef = await addDoc(collection(db, "donations"), donation);

      // Optionally link to announcement.donation array
      if (announcementId) {
        const annRef = doc(db, "announcements", announcementId);
        await updateDoc(annRef, {
          donation: arrayUnion({
            amount: Number(amount),
            user: user.uid,
          }),
        });
      }

      // Add donation ID to user's donations
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            donations: arrayUnion(docRef.id),
            });
        // Optionally update NGO's total donations

      toast({ title: "Success", description: "Donation recorded." });

      // Reset
      setAmount("");
      setRemarks("");
      setPaymentMethod("Card");

      // redirect to /
        navigate("/");
    } catch (err) {
      console.error("Donation error:", err);
      toast({ title: "Error", description: "Could not submit donation." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!ngo) return <p className="text-center text-gray-600 mt-10">Loading NGO info...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700">
            Donate to {ngo.name}
          </CardTitle>
          <p className="text-gray-600 text-sm mt-1">
            Thank you for supporting this NGO’s cause.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amount">Donation Amount (RM)</Label>
            <Input
              id="amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 50"
            />
          </div>

          <div>
            <Label htmlFor="remarks">Remarks (optional)</Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="You can include a message or reason"
            />
          </div>

          <div>
            <Label htmlFor="method">Payment Method</Label>
            <select
              id="method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Processing..." : "Donate Now"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonateToNgo;
