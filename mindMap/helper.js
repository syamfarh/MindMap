import {
	collection,
	addDoc,
	setDoc,
	deleteDoc,
	doc,
	updateDoc,
	getDoc,
	query,
	where,
	getDocs,
	limit,
	orderBy,
	arrayUnion,
	arrayRemove,
	increment,
} from "firebase/firestore";
import {firestore, auth} from "./firebase-setup";

export async function createJournal(entry) {
	const docRef = await addDoc(collection(firestore, "entry"), {
		name: entry.name,
		description: entry.description,
		date: entry.date,
        userId: entry.userId,
	});

	console.log("entry written with ID: ", docRef.id);
}

export function getDiariesQueue() {
	const q = query(
		collection(firestore, "entry"),
		where("userId", "==", auth.currentUser.uid),
	);
	return q;
}
