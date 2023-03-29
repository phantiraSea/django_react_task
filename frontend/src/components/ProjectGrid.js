import React,{useState} from 'react';


const ProjectGrid = ({name,description,complete,end_date,handleInputChange,editProject,deleteProject,edit,createNewProject}) => {

    return (
        <div className="container py-5">
            <form onSubmit={e => e.preventDefault()}>
                <div className="ml-auto" style={{textAlign: "right"}}>
                    {
                        editProject && (<button disabled={!edit} 
                        onClick={editProject}
                        className="btn btn-success">Save</button>)
                    }
                    {
                        deleteProject && (
                            <button 
                            onClick={deleteProject}
                            className="btn btn-danger">Delete</button>
                        )
                    }         
                </div>
                <div className="form-row my-2">
                    <div className="col">
                        <label>Project name</label>
                        <input type="text" placeholder="Enter project name" 
                            value={name}
                            onChange={handleInputChange('name')}
                            className="form-control" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="form-group col-md-6 col-sm-12">
                        <label>Description</label>
                        <textarea 
                        style={{height: "300px"}}
                        value={description}
                        onChange={handleInputChange('description')}
                        className="form-control" placeholder="Enter project description"></textarea>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <div className="form-row my-2">
                            <label>End Date</label>
                            <input 
                            value={end_date}
                            onChange={handleInputChange('end_date')}
                            type="date" placeholder="Select End date" className="form-control" />
                        </div>
                        <div className="form-row my-2">
                            <input type="checkbox" 
                            value="complete"
                            onChange={handleInputChange('complete')}
                            checked={complete}
                            />
                            <label>Complete</label>
                        </div>
                    </div>
                </div>
                {
                    createNewProject && (
                        <div className="form-group">
                            <button 
                            disabled={!name || !description || !end_date}
                            onClick={createNewProject}
                            className="btn btn-primary d-block form-control">Create</button>
                        </div>
                    )
                }
            </form>
        </div>
    );
};

export default ProjectGrid;