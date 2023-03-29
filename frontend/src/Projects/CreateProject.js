import React,{useState} from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import ProjectGrid from '../components/ProjectGrid';
import { createProjectUsingData } from './helper';
import { toast } from 'react-toastify';

const CreateProject = () => {
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        complete: "",
        end_date: "",
    })

    const [edit, setEdit] = useState(false);

    const history = useHistory();

    const handleInputChange = name => 
        e => {
            if(name == 'complete'){
                if(!projectData.complete){
                    setProjectData({...projectData, [name]: true});
                }
                else{
                    setProjectData({...projectData, [name]: false});
                }
            }
            else{
                setProjectData({...projectData, [name]: e.target.value});
            }
            setEdit(true);
        }

    const createNewProject = (e) => {
        e.preventDefault();
        const formData = new FormData;

        for (const name in projectData) {
            formData.append(name,projectData[name]);
        }
        
        createProjectUsingData(formData)
            .then(resp => {
                history.push("/");
                toast("New project created successfully!",{
                    type: "success"
                })
            })
            .catch(err => {
                console.log("Some error occured");
                toast("Something went wrong!",{
                    type: "error"
                })
            })
    }

    return (
        <div>
            <Header />
            <ProjectGrid 
                handleInputChange={handleInputChange} 
                name ={projectData.name} 
                description={projectData.description}
                complete ={projectData.complete}
                end_date = {projectData.end_date}
                edit={edit}
                createNewProject={createNewProject}
            />
        </div>
    );
};

export default CreateProject;