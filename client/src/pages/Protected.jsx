import { useUserContext } from "../context/userContext.jsx";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from "react";

function Protected({ children }) {


   const { user, setUser } = useUserContext()
    const navigate = useNavigate()

    const getUser = async () => {

        try {

            const res = await axios.get("http://localhost:8090/getUser", {withCredentials: true} )

            if (res.data.success) {
                setUser(res.data.data.user)
            }

            else {
                setUser(null)
                return navigate("/login")
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {

        if (!user) {
            getUser()
        }

    }, [user])

    if(!user){
        navigate("/login")
        return null
    }

    return children


}

export default Protected