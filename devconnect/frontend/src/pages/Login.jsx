import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import API from '../api/axios.jsx'
import {useAuth} from '../context/AuthContext.jsx'
import Input from '../components/LoginRegisterStyle.jsx'

export default function Login() {
    const {login} = useAuth()
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await API.post('/auth/login', {
                userName: userName,
                password: password
            })
            login(response.data.token)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-3 md:p-5">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700">
                <h1 className="text-3xl font-bold text-purple-400 text-center mb-8">DevConnect</h1>
                <form onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg md:rounded-2xl p-4 md:p-8 w-full max-w-sm md:max-w-md border border-gray-700"
                >
                    <Input
                        type="text"
                        id="userName"
                        placeholder="User Name"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)} />

                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 md:py-3 rounded-lg text-sm md:text-base font-medium"
                    >Login</button>
                    <p className="text-center mt-4 text-gray-400">
                        <Link className="text-center mt-4 text-xs md:text-sm text-gray-400" to='/register'>Register Here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}