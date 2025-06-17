import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./FirebaseContext";

// Define the shape of your Firestore user document
type Role = "admin" | "ngo" | "ordinary" | "ngo_admin" | null;

type FirestoreUser = {
  uid: string;
  name: string;
  email: string;
  role: Role;
  contact?: string;
  password?: string;
};

type AuthContextType = {
  user: FirestoreUser | null;
  isAuthenticated: boolean;
  role: Role;
  loading: boolean;
  login: (user: FirestoreUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirestoreUser | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const firestoreUser: FirestoreUser = {
            uid: firebaseUser.uid,
            name: data.name ?? "",
            email: data.email ?? firebaseUser.email ?? "",
            role: data.role as Role ?? null,
            password: data.password ?? "",
            contact: data.contact ?? "",
          };

          setUser(firestoreUser);
          console.log("User logged in:", firestoreUser);
          setRole(firestoreUser.role);
        } else {
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (firestoreUser: FirestoreUser) => {
    setUser(firestoreUser);
    setRole(firestoreUser.role);
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
