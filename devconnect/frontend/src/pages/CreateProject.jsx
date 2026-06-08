import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {

    const navigate = useNavigate()
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Skills, setSkills] = useState([])
    const [SelectedSkill, setSelectedSkill] = useState('')
    const [GithubURL, setGithubURL] = useState('')
    const [LiveDemoURL, setLiveDemoURL] = useState('')
    const [Loading, setLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState(null)

    async function HandelSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const token = localStorage.getItem('token')
        try {
            const response = await API.post('/project',
                {
                    title: Title,
                    description: Description,
                    techStack: Skills,
                    githubLink: GithubURL,
                    liveDemo: LiveDemoURL
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setTitle('')
            setDescription('')
            setSkills([])
            setSelectedSkill('')
            setGithubURL('')
            setLiveDemoURL('')
            setLoading(false)
            navigate('/')
        } catch (err) {
            setErrorMsg(err.message);
            setLoading(false)
        }
    }

    function HandelAddSkills() {
        if (SelectedSkill !== "") {
            setSkills([...Skills, SelectedSkill])
            setSelectedSkill('')
        }
    }

    function handelRemoveSkill(skillToRemove) {
        setSkills(Skills.filter(skill => skill !== skillToRemove))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 p-6">
            <form onSubmit={HandelSubmit}
            className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
                <input type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required />
                <textarea
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description">
                </textarea>
                <label htmlFor="">
                    <input type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                        value={SelectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                    />
                    <button 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mt-2"
                    type="button" onClick={HandelAddSkills}>Add</button>
                </label>
                <label className="block text-white mb-3 font-semibold">Selected Skills</label>
                <div className="flex flex-wrap gap-2 mb-4">
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
                >Submit</button>
            </form>
        </div>
    )
}