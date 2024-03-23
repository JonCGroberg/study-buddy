import { Timestamp, WriteResult } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { app, db } from "./firebase/server";

const unknownUser: User = { name: "<unknown>" };
type User = {
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

async function serverStudySearch(course: string): Promise<StudyGroup[]> {
    const snapshot = await db.collection("groups")
                             .where("course", "==", course)
                             .where("end", ">", Timestamp.now()).get();
    return Promise.all(snapshot.docs.map(async (doc: any): Promise<StudyGroup> => 
                await createStudyGroupType(doc.data())));
}

async function createStudyGroupType(doc: any): Promise<StudyGroup> {
    const owner = await getAuth(app).getUser(doc.owner);
    const buddies = await Promise.all(doc.buddies.map(async (buddy: string) => {
        const user = await getAuth(app).getUser(buddy);
        return !user ? unknownUser : { name: user.displayName };
    }));
    return {
        course: doc.course,
        name: doc.name,
        description: doc.description,
        start: doc.start.toMillis(),
        end: doc.end.toMillis(),
        location: doc.location,
        owner: { name: owner.displayName },
        buddies: buddies,
        max_buddies: doc.max_buddies
    }
}

async function serverStudyBook(user: string, course: string, name: string | undefined,
        description: string | undefined, start: Timestamp, end: Timestamp, 
        location: string, max_buddies: number): Promise<WriteResult> {
    return await db.collection("groups").doc().set({
        course, name, description, start, end,
        location, owner: user, buddies: [], max_buddies
    });
}

export { type User, type StudyGroup, serverStudySearch, serverStudyBook }
