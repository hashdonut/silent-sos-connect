// src/api/ngo.ts
import { getFirestore, collection, addDoc, Timestamp, deleteDoc, doc, getDoc, setDoc, GeoPoint } from "firebase/firestore";
import { app } from "../contexts/FirebaseContext";
import { registerNgoAdmin } from "./auth";

const db = getFirestore(app);

export const registerNGO = async ({
    ngo_name,
    ngo_contact,
    ngo_email,
    personal_name,
    personal_contact,
    personal_email,
    website,
    verification_document,
    address,
    description,
    password,
    location,
}: {
    ngo_name: string;
    ngo_contact: string;
    ngo_email: string;
    personal_name: string;
    personal_contact: string;
    personal_email: string;
    website: string;
    verification_document: string;
    address: string;
    description: string;
    password: string;
    location: { lat: number; lng: number };
}) => {
    console.log("Registering NGO with data:", {
      ngo_name,
      ngo_contact,
      ngo_email,
      personal_name,
      personal_contact,
      personal_email,
      website,
      verification_document,
      address,
      description,
      password,
      location,
    });

    const docRef = await addDoc(collection(db, "ngo_requests"), {
        ngo_name,
        ngo_contact,
        ngo_email,
        personal_name,
        personal_contact,
        personal_email,
        website,
        verification_document,
        address,
        description,
        password,
        status: "pending",
        submittedAt: Timestamp.now(),
        location: location ? new GeoPoint(location.lat, location.lng) : null,
    });

    return docRef.id;
};

export const approveNGO = async (id: string, admin_email: string, admin_password: string) => {
  const requestRef = doc(db, "ngo_requests", id);
  const requestSnap = await getDoc(requestRef);

  if (!requestSnap.exists()) {
    throw new Error("NGO request not found");
  }

  const data = requestSnap.data();

  // Step 1: Register the user as NGO Admin
  const user = await registerNgoAdmin(
    data.personal_name,
    data.personal_contact,
    data.personal_email,
    data.password,
    "ngo_admin",
    admin_email,
    admin_password
  );

  // Step 2: Store the NGO in the "ngos" collection
  const ngoRef = doc(collection(db, "ngos"));
  await setDoc(ngoRef, {
    name: data.ngo_name,
    contact: data.ngo_contact,
    email: data.ngo_email,
    website: data.website,
    verification_document: data.verification_document,
    address: data.address,
    description: data.description,
    location: data.location,
    admin: user.uid,
    createdAt: new Date(),
  });

  // Step 3: Delete the original request
  await deleteDoc(requestRef);
};

export const rejectNGO = async (id: string) => {
  const requestRef = doc(db, "ngo_requests", id);
  const requestSnap = await getDoc(requestRef);

  if (!requestSnap.exists()) {
    throw new Error("NGO request not found");
  }
  // append status to req document
  await setDoc(requestRef, { status: "rejected" }, { merge: true });
  return id;
}