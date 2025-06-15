// src/api/auth.tsx
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../contexts/FirebaseContext";

const auth = getAuth(app);
const db = getFirestore(app);

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const docSnap = await getDoc(doc(db, "users", user.uid));
  if (!docSnap.exists()) throw new Error("User record not found in database");

  const data = docSnap.data();
  const firestoreUser = {
    uid: user.uid,
    name: data.name ?? "",
    email: data.email ?? user.email ?? "",
    role: data.role ?? null,
  };

  console.log("User logged in:", firestoreUser);

  return firestoreUser;
};

export const registerUser = async (
    name: string,
    email: string,
    contact: string,
    password: string,
    role: "ordinary" = "ordinary"
) => {
  // Step 1: Register with Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Step 2: Store user info in Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    contact,
    role,
    uid: user.uid,
    createdAt: new Date(),
  });

  return user;
};

export const registerNgoAdmin = async (
    name: string,
    contact: string,
    email: string,
    password: string,
    role: "ngo_admin" = "ngo_admin"
) => {
    // Step 1: Register with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Step 2: Store NGO info in Firestore
    await setDoc(doc(db, "users", user.uid), {
        name,
        contact,
        email,
        role,
        uid: user.uid,
        createdAt: new Date(),
    });
    
    return user;
};
