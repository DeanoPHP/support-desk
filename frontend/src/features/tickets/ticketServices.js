import axios from "axios";

const API_URL = '/api/v1/ticket/'

// Create new ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.post(API_URL, ticketData, config)
    return response.data
}

const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
        
    const response = await axios.get(API_URL, config)
    return response.data
}

const getTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
        
    const response = await axios.get(API_URL + ticketId, config)
    return response.data
}

const closeTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
        
    const response = await axios.put(`${API_URL}/${ticketId}/update`, {status: 'closed'}, config)
    return response.data
}

const ticketServices = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket
}

export default ticketServices