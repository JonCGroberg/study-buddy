import { Timestamp, WriteResult } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { app, db } from "./firebase/server";

const unknownUser: User = { id: "0", name: "<unknown>" };
type User = {
    id: string,
    name: string
};

type StudyGroup = {
    course: string,
    name?: string,
    description?: string,
    start: number,
    end: number,
    location: string,
    owner: User,
    buddies: User[],
    max_buddies: number
};

async function serverStudySearch(courses: string[]): Promise<StudyGroup[]> {
    const snapshot = await db.collection("groups")
                             .where("course", "in", courses)
                             .where("end", ">", Timestamp.now()).get();
    return Promise.all(snapshot.docs.map(async (doc: any): Promise<StudyGroup> => 
                await createStudyGroupType(doc.data())));
}

async function serverUserStudySearch(user: string): Promise<StudyGroup[]> {
    const owned = await db.collection("groups")
                             .where("owner", "==", user)
                             .where("end", ">", Timestamp.now()).get();
    const joined = await db.collection("groups")
                             .where("buddies", "array-contains-any", [user]).get();
    return Promise.all([...owned.docs, ...joined.docs].map(
        async (doc: any): Promise<StudyGroup> => await createStudyGroupType(doc.data())));
}

async function createStudyGroupType(doc: any): Promise<StudyGroup> {
    const owner = await getAuth(app).getUser(doc.owner);
    const buddies = await Promise.all(doc.buddies.map(async (buddy: string) => {
        const user = await getAuth(app).getUser(buddy);
        return !user ? unknownUser : { id: user.uid, name: user.displayName };
    }));
    return {
        course: doc.course,
        name: doc.name,
        description: doc.description,
        start: doc.start.toMillis(),
        end: doc.end.toMillis(),
        location: doc.location,
        owner: { id: owner.uid, name: owner.displayName },
        buddies: buddies,
        max_buddies: doc.max_buddies
    }
}

type StudyBooking = {
    owner: string,
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
        owner: booking.owner,
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

export { type User, type StudyGroup, serverStudySearch, serverUserStudySearch, serverStudyBook }
