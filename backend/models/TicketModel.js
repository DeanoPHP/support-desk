const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad']
    },
    description: {
        type: String,
        required: [true, 'Please Enter a description of the issue']
    },
    status: {
        type: String,
        enum: ['new', 'Open', 'closed'],
        default: 'new'
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Ticket', ticketSchema)