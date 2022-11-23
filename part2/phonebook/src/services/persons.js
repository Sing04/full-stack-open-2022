import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const phonebookService = {
    create
}

export default phonebookService