import { useEffect, useState } from "react"
import { getUserDetails } from "../../utils/requests"
import { DocumentData } from "firebase/firestore"
import styled from "@emotion/styled"


const Container = styled.div({

})


const ChatHeader = (userId: string) => {
    const [user, setUser] = useState<DocumentData>()

    if (!user) return 

    useEffect(() => {
        const getData = async () => { 
            const data = await getUserDetails(userId)
            setUser(data)
        }
        getData()
    })

    return (
        <Container>
            <img src={user.photoUrl} />
        </Container>
    )
}