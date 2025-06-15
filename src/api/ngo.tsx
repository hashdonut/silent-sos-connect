// src/api/ngo.ts
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { app } from "../contexts/FirebaseContext";

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
}) => {
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
    });

    return docRef.id;
};
