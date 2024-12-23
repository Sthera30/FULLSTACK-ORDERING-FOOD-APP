import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext()


export function UserContextProvider({ children }) {


    const [user, setUser] = useState(null)


    async function get_user_info() {

        try {

            const res = await axios.get(`http://localhost:8090/getUser`, { withCredentials: true })

            if (res.data.success) {
                setUser(res.data.data.user)
            }

            else {
                setUser(null)
            }

        } catch (error) {
            console.log(error);

        }

    }


    useEffect(() => {

            get_user_info()

    }, [user])


    return (
        <UserContext.Provider value={{ user, setUser }}>

            {children}

        </UserContext.Provider>
    )


}

export function useUserContext() {

    return useContext(UserContext)

}