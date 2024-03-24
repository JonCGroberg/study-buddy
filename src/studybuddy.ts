import { Timestamp, WriteResult } from "firebase-admin/firestore";
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
                await createStudyGroupType(doc, doc.data())));
}

async function serverUserStudySearch(user: string): Promise<StudyGroup[]> {
    const groups = await db.collection("groups")
                             .where("end", ">", Timestamp.now())
                             .where("buddies", "array-contains-any", [user]).get();
    return Promise.all(groups.docs.map(
        async (doc: any): Promise<StudyGroup> => await createStudyGroupType(doc, doc.data())));
}

async function createStudyGroupType(doc: any, data: any): Promise<StudyGroup> {
    const buddies = await Promise.all(data.buddies.map(async (buddy: string) => {
        const user = await getAuth(app).getUser(buddy);
        return !user ? unknownUser : { id: user.uid, name: user.displayName };
    }));
    console.log(data.__name__);
    return {
        id: data.__name__,
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

export { type User, type StudyGroup, serverStudySearch, serverUserStudySearch, serverStudyBook }
