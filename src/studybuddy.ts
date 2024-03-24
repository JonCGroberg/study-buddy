import { FieldValue, Timestamp, WriteResult } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { app, db } from "./firebase/server";

const unknownUser: User = { id: "0", name: "<unknown>" };
type User = {
    id: string,
    name: string
};

type StudyGroup = {
    id: string,
    course: string,
    name?: string,
    description?: string,
    start: number,
    end: number,
    location: string,
    buddies: User[],
    max_buddies: number
};

async function serverStudySearch(courses: string[]): Promise<StudyGroup[]> {
    const snapshot = await db.collection("groups")
                             .where("course", "in", courses)
                             .where("end", ">", Timestamp.now()).get();
    return Promise.all(snapshot.docs.map(async (doc: any): Promise<StudyGroup> => 
                await createStudyGroupType(doc.id, doc.data())));
}

async function serverUserStudySearch(user: string): Promise<StudyGroup[]> {
    const snapshot = await db.collection("groups")
                             .where("end", ">", Timestamp.now())
                             .where("buddies", "array-contains-any", [user]).get();
    return Promise.all(snapshot.docs.map(
        async (doc: any): Promise<StudyGroup> => await createStudyGroupType(doc.id, doc.data())));
}

async function createStudyGroupType(docId: string, data: any): Promise<StudyGroup> {
    const buddies = await Promise.all(data.buddies.map(async (buddy: string) => {
        const user = await getAuth(app).getUser(buddy);
        return !user ? unknownUser : { id: user.uid, name: user.displayName };
    }));
    return {
        id: docId,
        course: data.course,
        name: data.name,
        description: data.description,
        start: data.start.toMillis(),
        end: data.end.toMillis(),
        location: data.location,
        buddies: buddies,
        max_buddies: data.max_buddies
    }
}

type StudyBooking = {
    course: string,
    name?: string,
    description?: string,
    start: number,
    end: number, 
    location: string,
    max_buddies: number
};

async function serverStudyBook(booking: StudyBooking): Promise<WriteResult> {
    return await db.collection("groups").doc().set({
        course: booking.course,
        name: booking.name,
        description: booking.description,
        start: booking.start,
        end: booking.end,
        location: booking.location,
        buddies: [],
        max_buddies: booking.max_buddies
    });
}

async function serverStudyLeave(user: string, group: string): Promise<boolean> {
    const ref = db.collection("groups").doc(group);
    await ref.update({
        buddies: FieldValue.arrayRemove(user)
    });

    const doc = await ref.get();
    if(!doc.exists) return false;

    const data = doc.data();
    if(data.buddies.length == 0) await ref.delete();

    return true;
}

async function serverStudyJoin(user: string, group: string): Promise<boolean> {
    const ref = db.collection("groups").doc(group);
    const doc = await ref.get();
    if(!doc.exists) return false;

    const data = doc.data();
    if(data.buddies.length >= data.max_buddies || user in data.buddies) return false;

    await ref.update({
        buddies: FieldValue.arrayUnion(user)
    });

    return true;
}

export { type User, type StudyGroup, serverStudySearch, serverUserStudySearch,
    serverStudyBook, serverStudyLeave, serverStudyJoin }
