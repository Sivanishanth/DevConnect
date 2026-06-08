import { useState,useEffect } from "react"
import API from '../api/axios.jsx'
import { useParams } from "react-router-dom"

export default function SingleProject(){
    const [ project,setProject ] = useState({})
    const [ loading,setLoading ] = useState(true)
    const [ errorSMS,setErrorSMS ] = useState(null)
    const {id} = useParams()
    useEffect(()=>{
        const fetchProject = async ()=>{
            try{
                const response = await API.get(`/project/${id}`)
                setProject(response.data)
                setLoading(false)
            }
            catch(err){
                setErrorSMS(err.message)
                setLoading(false)
            }
        }
        fetchProject()
    },[id])
    if(loading){return <div>Loading</div>}
    if(errorSMS){return <div>{errorSMS}</div>}
    return(
        <div className="flex flex-col m-5 p-6">
            <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-gray-300">{project.description}</p>
            <div className="m-2">
                {
                   ( project.techStack || [] ).map((tech)=>(
                    <span className="bg-purple-900 text-purple-300 m-1 px-3 py-1 rounded-full text-xs" key={tech}>{tech}</span>
                   ))
                }
            </div>
            <h3 className="m-1">{project.userID?.name}</h3>
            <div className="links m-1 flex justify-center gap-2">
                <a href={project.githubLink} className="text-purple-400 hover:text-purple-600">GitHub</a>
                <a href={project.liveDemo} className="text-purple-400 hover:text-purple-600">Live</a>
            </div>
            <button>❤️{project.likes?.length || 0}</button>
        </div>
    )
}