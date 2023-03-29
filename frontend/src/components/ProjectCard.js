import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({id,name,iscomplete, end_date}) => {
    var status = "Uncomplete"
    if(iscomplete){
        status = "Complete"
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
            <div class="card">
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                    
                    <p className="card-text text-justify">{status}</p>

                    <p>{end_date}</p>
                    
                    <Link to={`/project/${id}`} className="btn btn-primary mx-auto d-block">Edit</Link>
                </div>
            </div>
        </div>                    
    );
};

export default ProjectCard;