const express = require('express');
const router = express.Router();

const { getTickets, 
        createTicket,
        getSingleTicket,
        deleteTicket,
        updateTicket
    } = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
      .get(protect, getTickets)
      .post(protect, createTicket)

router.route('/:id')
      .get(protect, getSingleTicket)
      .delete(protect, deleteTicket)

router.route('/:id/update')
      .put(protect, updateTicket)

module.exports = router;
