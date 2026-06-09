import { Link } from "react-router"
import API from "../api/axios"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

export default function ProjectCard({ project }) {

    const [likes, setLikes] = useState(project.likes?.length || 0)
    const token = localStorage.getItem('token')

    async function handleLikes(e) {
        e.preventDefault()
        e.stopPropagation()
        try {
            const response = await API.patch(`/project/${project._id}/like`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setLikes(response.data.data.likes.length)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="projectCard  bg-gradient-to-br from-gray-900 via-purple-400/10 to-gray-600 backdrop-blur-md rounded-xl border border-white/10 p-4 mb-4 shadow-xl flex flex-col items-center text-center
                hover:bg-white/10 hover:shadow-purple-100/5 md:p-6"
        >
            <div className="link w-full">
                <Link to={`/project/${project._id}`}>
                    <h2 className="text-xl font-bold text-gray-400 mb-2 md:text-xl">{project.title}</h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                        {
                            (project.techStack || []).map((tech) => (
                                <span key={tech} className="bg-purple-900 text-purple-300 mt-3 px-3 py-1 rounded-full text-xs">
                                    {tech}
                                </span>
                            ))
                        }
                    </div>
                </Link>
                <Link to={`/profile/${project.userID._id}`}>
                    {project.userID?.name}
                </Link>
                <button onClick={handleLikes}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                >❤️{likes}</button>
                <div className="linksDescription flex gap-3 justify-center mt-2 text-purple-300">
                    <a href={project.githubLink} target="_blank">GitHub</a>
                    <a href={project.liveDemo} target="_blank">View Demo</a>
                </div>
            </div>
        </div>
    )
}