import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (personObj) => {
    const request = axios.post(baseURL, personObj)
    return request.then(response => response.data)
}

const deleteID = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, personObj) => {
    const request = axios.put(`${baseURL}/${id}`, personObj)
    return request.then(response => response.data)
}

export default { getAll, create, deleteID, update }