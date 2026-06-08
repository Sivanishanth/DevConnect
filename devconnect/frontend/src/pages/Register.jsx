import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios.jsx'
import Input from '../components/LoginRegisterStyle.jsx'

export default function Register() {

    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const register = await API.post('/auth/register', {
                userName: userName,
                name: name,
                password: password,
                email: email
            })
            localStorage.setItem('token', register.data.token)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700">
                <h1 className="text-3xl font-bold text-purple-400 text-center mb-8">DevConnect</h1>
                <form onSubmit={handleSubmit}>
                    <Input type="text"
                        id="userName"
                        placeholder="User Name"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <Input type="text"
                        id="Name"
                        placeholder="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input type="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Input type="email"
                        id="email"
                        placeholder='E-mail'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <button type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
                    >Register</button>

                </form>
                <p className="text-center mt-4 text-gray-400">
                    <Link className="text-purple-400" to='/login'>Login Here</Link>
                </p>
            </div>
        </div>
    )
}