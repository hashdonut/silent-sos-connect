import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
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
    password: data.password ?? "",
    contact: data.contact ?? "",
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
  try {
    // Step 1: Register with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Store user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      contact,
      role,
      password,
      uid: user.uid,
      createdAt: new Date(),
    });

    return user;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Email is already in use. Please use a different email.");
    }
    throw error;
  }
};

export const registerNgoAdmin = async (
  name: string,
  contact: string,
  email: string,
  password: string,
  role: "ngo_admin" = "ngo_admin",
  currentAdminEmail: string,
  currentAdminPassword: string
) => {
  try {
    // Save reference to auth before user creation
    const auth = getAuth(app);

    // Step 1: Create new user (auto signs in this user)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Add user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      contact,
      email,
      role,
      password,
      uid: user.uid,
      createdAt: new Date(),
    });

    // Step 3: Re-authenticate the original admin
    await signInWithEmailAndPassword(auth, currentAdminEmail, currentAdminPassword);

    return user;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Email is already in use. Please use a different email.");
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await auth.signOut();
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error("Failed to log out. Please try again.");
  }
}