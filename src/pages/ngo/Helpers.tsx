import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

const Helpers = () => {
  const [helpers, setHelpers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ngoId, setNgoId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const db = getFirestore(app);
  const auth = getAuth(app);

  // Fetch NGO ID for current admin
  const fetchNgoId = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const ngoSnap = await getDocs(collection(db, "ngos"));
    const ngoDoc = ngoSnap.docs.find((doc) => doc.data().admin === uid);
    if (ngoDoc) {
      setNgoId(ngoDoc.id);
      return ngoDoc.id;
    }
  };

  // Fetch all helpers in the NGO
  const fetchHelpers = async (ngoIdParam?: string) => {
    const currentNgoId = ngoIdParam ?? ngoId;
    if (!currentNgoId) return;

    const ngoDoc = await getDoc(doc(db, "ngos", currentNgoId));
    const helperIds: string[] = ngoDoc.data()?.helpers ?? [];

    const usersSnap = await getDocs(collection(db, "users"));
    const helperUsers: User[] = usersSnap.docs
      .filter((doc) => helperIds.includes(doc.id))
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

    setHelpers(helperUsers);
  };

  useEffect(() => {
    fetchNgoId().then((id) => {
      if (id) fetchHelpers(id);
    });
  }, []);

  const handleAddHelper = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password || !ngoId) {
      toast.error("Please fill in all fields.");
      return;
    }

    const currentUser = auth.currentUser;
    const currentEmail = currentUser?.email;
    const currentToken = await currentUser?.getIdToken(true);
    const currentPassword = prompt("Please re-enter your password to confirm:");

    if (!currentEmail || !currentPassword) {
      toast.error("Admin credentials required to proceed.");
      return;
    }

    try {
      // Step 1: Create helper user (will sign in as helper)
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const helperId = cred.user.uid;

      // Step 2: Add helper user to Firestore
      await setDoc(doc(db, "users", helperId), {
        name,
        email,
        role: "ngo_helper",
        ngo: ngoId,
      });

      // Step 3: Update NGO helpers list
      await updateDoc(doc(db, "ngos", ngoId), {
        helpers: [...helpers.map((h) => h.id), helperId],
      });

      // Step 4: Re-authenticate as admin
      await signInWithEmailAndPassword(auth, currentEmail, currentPassword);

      toast.success("Helper added successfully.");
      setForm({ name: "", email: "", password: "" });
      setIsOpen(false);
      fetchHelpers();
    } catch (error: any) {
      toast.error("Failed to add helper: " + error.message);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">NGO Helpers</h1>
          <p className="text-gray-600">Manage your NGO helper accounts.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add New Helper</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Helper</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <Button onClick={handleAddHelper} className="w-full">
                Create Helper
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">ID</th>
            </tr>
          </thead>
          <tbody>
            {helpers.map((helper) => (
              <tr key={helper.id} className="border-t">
                <td className="p-3">{helper.name}</td>
                <td className="p-3">{helper.email}</td>
                <td className="p-3 text-xs text-gray-500">{helper.id}</td>
              </tr>
            ))}
            {helpers.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No helpers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Helpers;
