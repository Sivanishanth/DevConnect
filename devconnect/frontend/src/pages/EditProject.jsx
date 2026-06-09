import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import API from "../api/axios";


export default function EditProject() {
    const navigate = useNavigate()
    const { projectId } = useParams()
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Skills, setSkills] = useState([])
    const [SelectedSkill, setSelectedSkill] = useState('')
    const [GithubURL, setGithubURL] = useState('')
    const [LiveDemoURL, setLiveDemoURL] = useState('')
    const [Loading, setLoading] = useState(true)
    const [ErrorMsg, setErrorMsg] = useState(null)
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await API.get(`/project/${projectId}`)
                const projects = response.data
                setTitle(projects.title)
                setDescription(projects.description)
                setSkills(projects.techStack)
                setGithubURL(projects.githubLink)
                setLiveDemoURL(projects.liveDemo)
                setLoading(false)
            }
            catch (err) {
                setErrorMsg(err.message)
                setLoading(false)
            }
        }
        fetchProject()
    }, [projectId])
    function HandelAddSkills() {
        if (SelectedSkill !== "") {
            setSkills([...Skills, SelectedSkill])
            setSelectedSkill('')
        }
    }

    function handelRemoveSkill(skillToRemove) {
        setSkills(Skills.filter(skill => skill !== skillToRemove))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {
            const response = await API.put(`/project/${projectId}`, {
                title: Title,
                description: Description,
                techStack: Skills,
                githubLink: GithubURL,
                liveDemoLink: LiveDemoURL
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            navigate('/my-projects')
            setLoading(false)
        } catch (err) {
            setErrorMsg(err.message)
        }
    }
    return (
        <div className="min-h-screen p-4 md:p-8">
            <form onSubmit={handleSubmit} 
            className="max-w-2xl mx-auto"
            >
                <input type="text"
                    placeholder="Title"
                    className=" text-center w-full mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-300"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea placeholder="Description"
                    className="w-full h-32 mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <input type="text"
                    placeholder="Skills"
                    className=" text-center w-full mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-300"
                    value={SelectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                />
                <div className="flex flex-wrap gap-2 mb-4">
                <button type="button" onClick={HandelAddSkills}>Add</button>

                    {
                        Skills.map((skills) => (
                            <div className="inline-block bg-purple-500 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2" key={skills}>
                                <span>{skills}</span>
                                <button type="button" onClick={() => handelRemoveSkill(skills)}>❌</button>
                            </div>
                        ))
                    }
                </div>

                <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    type="url" value={GithubURL} onChange={(e) => setGithubURL(e.target.value)} placeholder="GitHub Link" required />

                <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    type="url" value={LiveDemoURL} onChange={(e) => setLiveDemoURL(e.target.value)} placeholder="Live Demo Link" required />

                <button type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
                >Update</button>
            </form>
        </div>
    )
}

