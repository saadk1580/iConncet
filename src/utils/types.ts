import firebase from 'firebase/firestore'

export type User = {
    displayName: string,
    photoURL: string,
    email: string,
    uid: string
}

export type Message = {
    text: string,
    createdAt: firebase.FieldValue,
    imageUrl?: string,
    name: string,
    profilePicture?: string
}