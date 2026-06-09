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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 p-3 md:p-6">
            <form onSubmit={HandelSubmit}
                className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-purple-400 mb-6 text-center">Create Project</h1>
                
                <input type="text"
                    className="w-full mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm md:text-base"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Project Title"
                    required />
                
                <textarea
                    className="w-full mb-4 h-32 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm md:text-base resize-none"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Project Description"
                    required>
                </textarea>
                
                <div className="mb-4">
                    <label className="block text-white mb-2 font-semibold text-sm md:text-base">Add Skills</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input type="text"
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm md:text-base"
                            value={SelectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                            placeholder="e.g., React, Node.js"
                        />
                        <button
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium text-sm md:text-base w-full sm:w-auto transition"
                            type="button" 
                            onClick={HandelAddSkills}>
                            Add Skill
                        </button>
                    </div>
                </div>

                {Skills.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-white mb-3 font-semibold text-sm md:text-base">Selected Skills</label>
                        <div className="flex flex-wrap gap-2">
                            {Skills.map((skill) => (
                                <div key={skill} className="flex items-center gap-2 bg-purple-600 px-3 py-2 rounded-lg text-xs md:text-sm whitespace-nowrap">
                                    <span className="truncate">{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => handelRemoveSkill(skill)}
                                        className="hover:text-gray-200 ml-1 font-bold"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <input
                    className="w-full mb-4 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm md:text-base"
                    type="url" 
                    value={GithubURL} 
                    onChange={(e) => setGithubURL(e.target.value)} 
                    placeholder="GitHub Link" 
                    required />

                <input
                    className="w-full mb-6 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm md:text-base"
                    type="url" 
                    value={LiveDemoURL} 
                    onChange={(e) => setLiveDemoURL(e.target.value)} 
                    placeholder="Live Demo Link" 
                    required />

                {ErrorMsg && <div className="text-red-500 mb-4 text-sm">{ErrorMsg}</div>}

                <button type="submit"
                    disabled={Loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition text-sm md:text-base"
                >
                    {Loading ? 'Submitting...' : 'Submit Project'}
                </button>
            </form>
        </div>
    )
}