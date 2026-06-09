import { useState, useEffect } from "react"
import API from '../api/axios.jsx'
import ProjectCard from "../components/ProjectCard.jsx"

export default function Home() {
    const [searchTitle, setSearchTitle] = useState("")
    const [searchSkills, setSearchSkills] = useState([])
    const [filterInput, setFilterInput] = useState("")
    const [project, setProject] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('/project')
                setProject(response.data.data)
                setLoading(false)
            }
            catch (err) {
                setErrorMessage(err)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleAddFilter = () => {
        if (filterInput !== "") {
            setSearchSkills([...searchSkills, filterInput])
            setFilterInput('')
        }
    }

    const handleRemoveSkill = (skillToRemove) => {
        setSearchSkills(searchSkills.filter(input => input !== skillToRemove))
    }

    const filteredProjects = project.filter(p => {
        const searchtitle = searchTitle.toLowerCase()
        const titleMatch = p.title.toLowerCase().includes(searchtitle)
        const skillMatch = searchSkills.length === 0 || p.techStack.some(tech => searchSkills.includes(tech.toLowerCase()))
        return titleMatch && skillMatch
    })



    if (loading) { return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div> }

    if (errorMessage) { return <div className="min-h-screen flex items-center justify-center text-white">{errorMessage}</div> }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
            {/* Search Section - Full width */}
            <div className="w-full max-w-2xl mx-auto p-3 md:p-6 flex flex-col gap-3">
                <form className="flex flex-col gap-2">
                    <input type="text"
                        placeholder="Title"
                        className="text-center w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-300 text-sm md:text-base"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <input type="text"
                        placeholder="Skill Required"
                        className="text-center w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-300 text-sm md:text-base"
                        value={filterInput}
                        onChange={(e) => setFilterInput(e.target.value)}
                    />
                </form>
                <button onClick={handleAddFilter}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto text-sm md:text-base"
                >Add</button>

                <div className="flex flex-wrap gap-2">
                    {searchSkills.map((skills) => (
                        <div key={skills} className="flex items-center gap-2 bg-purple-600 px-3 py-1 rounded-lg">
                            <span className="text-white text-sm">{skills}</span>
                            <button onClick={() => handleRemoveSkill(skills)} className="text-white hover:text-gray-300">❌</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Grid - Below search */}
            <h1 className="pageTitle text-center text-2xl md:text-3xl text-purple-400 font-bold mt-6 md:mt-8">
                Projects
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 p-3 md:p-6">
                {filteredProjects.map((item) => (
                    <ProjectCard key={item._id} project={item} />
                ))}
            </div>
        </div>
    )
}