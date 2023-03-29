import { isAuthenticated } from '../../auth/helper';
import { axiosInstance } from '../../axiosInstance';

export const LoadAllProjects = () => {
    return axiosInstance.get('project/',{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const loadSpecificProject = id => {
    return axiosInstance.get(`project/${id}/`,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const editProjectAPI = (id,data) => {
    return axiosInstance.put(`project/${id}/`,data,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const deleteProjectAPI = (id) => {
    return axiosInstance.delete(`project/${id}/`,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const createProjectUsingData = data => {
    return axiosInstance.post('project/',data,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}


export const taskChat = question => {
    return axiosInstance.get(`project/chat/${question}`, {
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}