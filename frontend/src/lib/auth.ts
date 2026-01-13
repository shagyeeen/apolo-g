import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_EMAIL = "YOUR_ADMIN_EMAIL@gmail.com";

export const loginAdmin = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  if (result.user.email !== ADMIN_EMAIL) {
    await auth.signOut();
    alert("Not authorized");
    return false;
  }

  return true;
};