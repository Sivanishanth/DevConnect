import {BrowserRouter , Routes , Route , useLocation} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Navbar from './components/Navbar.jsx'
import SingleProject from './pages/SingleProject.jsx'
import MyProject from './pages/myProjects.jsx'
import CreateProject from './pages/CreateProject.jsx'
import Profile from './pages/Profile.jsx'
import EditProject from './pages/EditProject.jsx'
// import './App.css'

function App() {
  const location = useLocation()

  const hideNav = 
  location.pathname === '/login' || 
  location.pathname === '/register'
  return (
    <>
    {!hideNav && <Navbar/>}
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/project/:id' element={<SingleProject/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='/my-projects' element={<MyProject/>}/>
        <Route path='/create-project' element={<CreateProject/>}/>
        <Route path='/edit/:projectId' element={<EditProject/>}/>
    </Routes>
    </>
  )
}

export default App
