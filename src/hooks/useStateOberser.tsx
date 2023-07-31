import { User, onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { auth } from "../components/Auth/Auth"
import { DocumentData } from "firebase/firestore";


export const useStateObserver = () => {
    const [userDetails, setUserDetails] = useState<DocumentData>();
    const [user, setUser] = useState<User | null>()

    onAuthStateChanged(auth, (user_) => setUser(user_))

    

    return user
}