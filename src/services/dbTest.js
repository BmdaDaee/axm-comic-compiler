import { db } from "./firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export async function writeAndReadSmokeTest() {
  // Fixed ID so you can re-run without creating junk
  const ref = doc(db, "projects", "smoke-test");

  const payload = {
    name: "Comic Compiler Smoke Test",
    createdAt: serverTimestamp(),
    note: "If you can read this back, Firestore is working.",
  };

  await setDoc(ref, payload, { merge: true });

  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}