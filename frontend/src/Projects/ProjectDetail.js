import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import ProjectGrid from '../components/ProjectGrid';
import { editProjectAPI, loadSpecificProject, deleteProjectAPI } from './helper';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const ProjectDetail = ({match}) => {
    const [projectData, setProjectData] = useState({
        name: '',
        description: "",
        complete: "",
        end_date: "",
    })

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
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
    
    const editProject = () => {
        const project_id = match.params?.id;
        const formData = new FormData;

        for (const name in projectData) {
            formData.append(name,projectData[name]);
        }
        
        editProjectAPI(project_id,formData)
            .then(resp => {
                setEdit(false);
                toast("Project edited successfully!",{
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

    const deleteProject = () => {
        const project_id = match.params?.id;
        deleteProjectAPI(project_id)
            .then(resp => {
                if (resp.status=== 204) {
                    toast("Project deleted successfully!",{
                        type: "success"
                    })
                    history.push('/');
                }
            })
            .catch(err => {
                console.log("Something went wront");
                toast("Something went wrong!",{
                    type: "error"
                })
            })
    }

    useEffect(() => {
        setLoading(true);
        const project_id = match.params?.id;
        loadSpecificProject(project_id)
            .then(resp => {
                setLoading(false);
                setProjectData({
                    name: resp.data?.name,
                    complete: resp.data?.complete,
                    end_date: resp.data?.end_date,
                    description: resp.data?.description
                })
            })
            .catch(err => {
                setLoading(false);
                setError(true);
                history.push("/not-found/");
                toast("Some error",{
                    type: "error"
                })
            })
    }, [])

    return (
        <div>
            <Header />
            {
                loading? (
                    <div className="text-center">
                        <Loader />
                    </div>
                ):
                (
                <ProjectGrid 
                    handleInputChange={handleInputChange} 
                    editProject={editProject}
                    deleteProject={deleteProject}
                    name ={projectData.name} 
                    description={projectData.description}
                    complete ={projectData.complete}
                    end_date = {projectData.end_date}
                    edit={edit}
                />
                )
            }
        </div>
    );
};

export default ProjectDetail;
