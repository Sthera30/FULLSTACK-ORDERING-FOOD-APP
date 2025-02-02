import React, { useState } from 'react'
import '../css/verifyOtp.css'
import { useUserContext } from '../context/userContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function VerifyOtp() {

    const { user } = useUserContext()

    const [data, setData] = useState({ otp: '', email: `${user?.email}` })

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const {otp, email} = data

        try {

            const { data } = await axios.post("https://fullstack-ordering-food-app-backend.vercel.app/verify", { otp, email })

            if (data.error) {
                toast.error(data.error)
            }

            else {
                toast.success("otp verified!")
                localStorage.setItem("isVerified", user?.isVerified)
                navigate("/")
                location.reload()

            }



        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='verify-container'>


            <div className='verification'>

                <span>Email Verification</span>
                <p>We have sent a code to your email address</p>

                <form onSubmit={handle_submit}>

                    <div className='button-co'>
                        <input type="number" placeholder='Enter Your Code' onChange={(e) => setData({ ...data, otp: e.target.value })} />
                        <input type='hidden' placeholder='Enter your email' value={user?.email} />
                        <button type='submit'>Verify Code</button>
                    </div>

                </form>

            </div>


        </div>
    )
}

export default VerifyOtp
