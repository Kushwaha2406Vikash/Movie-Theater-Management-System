const express = require('express');
const { createPaymentIntent, handleWebhook } = require('../controllers/paymentController');

const router = express.Router();

// Create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Handle Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;