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

export async function deleteJournal(id) {
	try {
		await deleteDoc(doc(firestore, "entry", id));
		console.log("Document deleted with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function editJournal(id, updateField) {
	try {
		const docRef = doc(firestore, "entry", id);
		await updateDoc(docRef, updateField);
		console.log("Document updated with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export function getJournalQueue() {
	const q = query(
		collection(firestore, "entry"),
		where("userId", "==", auth.currentUser.uid),
		orderBy("date","desc"),
	);
	return q;
}
