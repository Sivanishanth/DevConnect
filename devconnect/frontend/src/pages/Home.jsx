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

    const handleRemoveSkill = (skillToRemove)=>{
        setSearchSkills(searchSkills.filter(input => input !== skillToRemove))
    }

    const filteredProjects = project.filter(p=>{
        const searchtitle = searchTitle.toLowerCase()
        const titleMatch = p.title.toLowerCase().includes(searchtitle)
        const skillMatch = searchSkills.length === 0 || p.techStack.some(tech=> searchSkills.includes(tech.toLowerCase()))
        return titleMatch && skillMatch
    })

    if (loading) { return <div>Loading...</div> }

    if (errorMessage) { return <div>{errorMessage}</div> }
    return (
        <div className="homePage">
            <div className="flex flex-col gap-2 justify-around m-5">
                <form>
                    <input type="text"
                        placeholder="Title"
                        className=" text-center w-90 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-300"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <input type="text"
                        placeholder="Skill Required"
                        className="text-center w-90 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-300"
                        value={filterInput}
                        onChange={(e) => setFilterInput(e.target.value)}
                    />
                </form>
                <button onClick={handleAddFilter} className=""
                >Add</button>
                {
                    searchSkills.map((skills) => (
                        <div key={skills}>
                            <span>{skills}</span>
                            <button onClick={() => handleRemoveSkill(skills)}>❌</button>
                        </div>
                    ))
                }
            </div>
            <h1 className="pageTitle">
                Project
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {filteredProjects.map((item) => (
                    <ProjectCard key={item._id} project={item} />
                ))}

            </div>
        </div>
    )
}