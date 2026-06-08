import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import API from '../api/axios.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Profile(){
    const {userId} = useParams()
    const [user,setUser] = useState('')
    const [projects,setProjects] = useState([])
    const [loading,setLoading] = useState(true)
    const [errorMsg,setErrorMsg] = useState(null)
    
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const userRes = await API.get(`auth/users/${userId}`)
                setUser(userRes.data.data)

                const projectRes = await API.get('/project')
                const userProjects = projectRes.data.data.filter(
                    p=>p.userID._id === userId
                )
                setProjects(userProjects)
                setLoading(false)
            }catch(err){
                setErrorMsg(err.message)
                setLoading(false)
            }
        }
        fetchData()
    },[userId])

    if(loading) return <div>Loading...</div>
    if(errorMsg) return <div>{errorMsg}</div>
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 p-6">

        <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur border border-white/10 rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-white">{user?.name}</h1>
            <p className="text-gray-400">{user?.email}</p>
            <p className="text-gray-300 mt-4">{user?.about}</p>
        </div>

        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(p=>(
                    <ProjectCard key={p._id} project={p}/>
                ))}
            </div>
        </div>

        </div>
    )
}
