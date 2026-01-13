import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/lib/firebase";

const ADMIN_EMAIL = "shagyeeen@gmail.com";

const Admin = () => {
  const [apologies, setApologies] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Auth check
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
        loadApologies();
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loadApologies = async () => {
    const snap = await getDocs(collection(db, "apologies"));
    setApologies(
      snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    );
  };

  const remove = async (id: string) => {
    await deleteDoc(doc(db, "apologies", id));
    setApologies((p) => p.filter((a) => a.id !== id));
  };

  if (!isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center">
        <button onClick={login} className="px-6 py-3 bg-black text-white rounded">
          Admin Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Admin Control Panel</h1>

      {apologies.map((a) => (
        <div key={a.id} className="border p-4 rounded">
          <p className="mb-2">{a.text}</p>

          <div className="flex gap-6 text-sm">
            <span>❤️ Accept: {a.acceptCount || 0}</span>
            <span>⏭ Skip: {a.skipCount || 0}</span>
          </div>

          <button
            onClick={() => remove(a.id)}
            className="mt-3 text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admin;