const asyncHandler = require('express-async-handler')

const User = require('../models/UserModel')
const Ticket = require('../models/TicketModel')

const getTickets = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json({
        success: true,
        count: tickets.length,
        data: tickets
    })
})

const createTicket = asyncHandler(async(req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({ 
        product, 
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json({
        success: true,
        data: ticket
    })
})

const getSingleTicket = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(401)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorised')
    }

    res.status(200).json(ticket)
})

const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(401)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorised')
    }

    await Ticket.deleteOne()

    res.status(200).json({
        success: true,
        data: {}
    })
})

const updateTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(400)
        throw new Error(`No ticket found with the id ${req.params.id}`)
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorised')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets,
    createTicket,
    getSingleTicket,
    deleteTicket,
    updateTicket
}