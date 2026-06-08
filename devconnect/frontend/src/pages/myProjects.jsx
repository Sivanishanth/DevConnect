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
        <div className="myProjectPage">
            {loading && <div>Loading...</div>}
            {errorMsg && <div className="text-red-500">{errorMsg}</div>}
            {myProject.length === 0 && <div>No Project Yet Created... <br /> Create Your First Project...</div>}
            <div className="">
                <button onClick={() => navigate('/create-project')}>
                    + New Project
                </button>
                {myProject.map((project) => (
                    <div key={project._id}>
                        <ProjectCard project={project} />

                        <button type="button" onClick={() => handleDelete(project._id)}>🗑️ Delete</button>
                        <button type="button" onClick={() => navigateToEdit(project._id)}>📝 Edit</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
