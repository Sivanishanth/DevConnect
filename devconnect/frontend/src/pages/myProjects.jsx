import { useState, useEffect } from "react";
import API from "../api/axios";
import { jwtDecode } from 'jwt-decode'
import ProjectCard from '../components/ProjectCard.jsx'
import { useNavigate } from "react-router-dom";

export default function MyProject() {
    const [myProject, setMyProject] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const currentUserId = decode.userId

    const handleDelete = async (projectId) => {
        try {
            await API.delete(`/project/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setMyProject(myProject.filter(p => p._id !== projectId))
        } catch (err) {
            setErrorMsg(err.message)
        }
    }

    const navigateToEdit = (projectId) =>{
        navigate(`/edit/${projectId}`)
    }

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await API.get('/project')
                const userProject = response.data.data.filter(
                    p => p.userID._id === currentUserId
                )
                setMyProject(userProject)
                setLoading(false)
            }
            catch (err) {
                setErrorMsg(err.message)
                setLoading(false)
            }
        }
        fetchProject()
    }, [])
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 p-4 md:p-8        ">
            {loading && <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}
            {errorMsg && <div className="min-h-screen flex items-center justify-center text-white">{errorMsg}</div>}
            {myProject.length === 0 && <div>No Project Yet Created... <br /> Create Your First Project...</div>}
            <div className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mb-6">
                <button onClick={() => navigate('/create-projects')}>
                    + New Project
                </button>
                {myProject.map((project) => (
                    <div key={project._id}>
                        <ProjectCard project={project} />

                        <button type="button" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm mr-2" onClick={() => handleDelete(project._id)}>🗑️ Delete</button>
                        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm" onClick={() => navigateToEdit(project._id)}>📝 Edit</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
