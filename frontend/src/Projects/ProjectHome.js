import React,{useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { isLead, isStaff } from '../auth/helper';
import Header from '../components/Header';
import Loader from '../components/Loader';
import ProjectCard from '../components/ProjectCard';
import { LoadAllProjects, taskChat } from './helper';
import {toast} from 'react-toastify';


const ProjectHome = () => {

    const [projects, setProjects] = useState([]);
    const [initvalue, setinitvalue] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const loadAll = () => {
        setIsLoading(true);
        LoadAllProjects()
            .then(resp => {
                setinitvalue(resp.data);
                setProjects(resp.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                toast("Something went wrong",{
                    type: "error"
                })
            })
    }

    useEffect(() => {
        loadAll();
        
    },[]);

    const handleComplete = () => {
        var completedTasks = initvalue.filter((task) => task.complete);
        setProjects(completedTasks);
    }

    const handleUncomplete = () => {
        var uncompletedTasks = initvalue.filter((task) => task.complete == false);
        setProjects(uncompletedTasks);
    }

    const handleAll = () => {
        setProjects(initvalue);
    }

    const [question, setquestion] = useState('');

    const handleChange = (e) => {
            setquestion(e.target.value);
        }
    
    const [answers, setanswer] = useState([]);

    const handleFormSubmit = e => {
        e.preventDefault();
        taskChat(question)
            .then(resp => {
                setanswer(answers => [resp.data.answer, ...answers])
            })
            .catch(err => {
                setIsLoading(false);
                toast("Something went wrong",{
                    type: "error"
                })
            })
        setquestion('');
    } 


    return (
        <>
            <Header />
            <div className="container">
                <div className="my-3" style={{textAlign: "center"}}>
                    <button 
                        onClick={() => history.push("/create/project")}
                        className="btn btn-success">Create
                    </button>
                    
                    <button 
                        onClick={handleComplete}
                        className="btn btn-success">Complete
                    </button>

                    <button 
                        onClick={handleUncomplete}
                        className="btn btn-success">UnComplete
                    </button>

                    <button 
                        onClick={handleAll}
                        className="btn btn-success">All
                    </button>
                </div>
                <div className="row py-5">                    
                    {
                        isLoading ? (
                            <div className="text-center">
                                <Loader />
                            </div>
                        ) 
                        : 
                        (
                            projects.map(project => (
                                <ProjectCard key={project.id} 
                                    id={project.id} 
                                    name={project.name} 
                                    iscomplete={project.complete}
                                    end_date={project.end_date}/>
                            ))
                        )
                        
                    }
                    <div className="my-3">
                    <p>Chat</p>
                        <form onSubmit={handleFormSubmit}>
                            <textarea value={question} onChange={handleChange}
                                        placeholder="Please ask me about your tasks." />
                            <input type="submit" value="Submit" />
                        </form>  
                    </div>
                    <p>Ans</p>
                    {
                        answers.map(answer => (
                            <p>{answer}</p>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default ProjectHome;