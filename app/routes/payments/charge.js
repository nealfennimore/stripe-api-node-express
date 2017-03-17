const express = require('express');
const router = express.Router();

const { STRIPE_SECRET_KEY } = process.env;
const stripe  = require('stripe')(STRIPE_SECRET_KEY);

// POST /payments/charge
router.post('/', (req, res) => {
    const {
        stripeToken,
        amount,
        description
    } = req.body;

    stripe.charges.create({
        amount,
        description,
        currency: 'usd',
        source: stripeToken,
    }, (err, charge) => {
        if(err){
            return res.json({
                error: true,
                message: err
            });
        }

        res.json({
            success: true
        });
    });

});

module.exports =  router;