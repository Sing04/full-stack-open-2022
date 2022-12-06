import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.status)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

const phonebookService = {
    getAll,
    create,
    deletePerson,
    update
}

export default phonebookService