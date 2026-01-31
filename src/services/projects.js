import { db } from "./firebase";
import { collection, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export async function createProject({ id, name }) {
  const ref = doc(collection(db, "projects"), id);

  const payload = {
    name,
    canonVaultRef: "axm-universe-canon-vault",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(ref, payload, { merge: true });
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}