import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {jwtDecode} from 'jwt-decode'

export default function Navbar() {
    const { isLoggedIn, logOut } = useAuth()
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const currentUserId = decoded.userId
    return (
        <div className='navContainer 
        flex items-center justify-between p-5 bg-gray-900 border-b border-gray-400 text-black sticky top-0 z-50'>
            <div 
            className="logoTitle text-3xl text-purple-400 font-bold
            ">
                devConnect
            </div>
            <div className="navLinks 
            flex items-center gap-6 font-medium text-gray-300
            ">
                {isLoggedIn ? (
                    <>
                        <Link to='/'
                         className="text-purple-400 hover:text-purple-300 text-sm mr-4"
                        >Home</Link>
                        <Link to='/my-project'
                        className="text-purple-400 hover:text-purple-300 text-sm"
                        >MyProject</Link>
                        <Link to={`/profile/${currentUserId}`}>👤</Link>
                        <button onClick={logOut}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/login' className='text-purple-400 hover:text-white border border-purple-400 px-4 py-2 rounded-lg'>Login</Link>
                        <Link to='/register' className='text-purple-400 hover:text-white border border-purple-400 px-4 py-2 rounded-lg'>Register</Link>
                    </>
                )}
            </div>
        </div>
    )
}