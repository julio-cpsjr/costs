import Message from "../layout/Message"
import {useLocation} from 'react-router-dom'
import styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../project/ProjectCard"
import {useState, useEffect} from 'react'
import Loading from "../layout/Loading"

function Projects (){
    
    const [Projects, setProjects] = useState([])
    const [RemoveLoading, setRemoveLoading] = useState(false)
    const [ProjectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }
    
    useEffect(()=>{
        setTimeout(()=>{
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((data)=> {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err)=> console.log(err))
        }, 3000)
       
    },[])
    
    function removeProject(id){
       
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp)=> resp.json())
        .then(()=> {
            setProjects(Projects.filter((project)=> project.id !== id))
            setProjectMessage('Projeto removido com sucesso')
        })
        .catch((err)=> console.log(err))


    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
               <h1>Meus Projetos</h1>
               <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            { message && 
                (<Message type="sucess" msg={message}/>)
            }
            { ProjectMessage && 
                (<Message type="sucess" msg={ProjectMessage}/>)
            }
            <Container customClass="start">
                {Projects.length > 0 && Projects.map((project)=> (
                    < ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                    />
                ))}
                {!RemoveLoading && <Loading/>}
                {RemoveLoading && Projects.length === 0 && (
                    <p>Não ha projetos cadastrados!</p>
                )}
            </Container>
        </div>
        
    )
}

export default Projects