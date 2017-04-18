const express = require('express');
const router = express.Router();

const { STRIPE_SECRET_KEY } = process.env;
const stripe  = require('stripe')(STRIPE_SECRET_KEY);

// POST /payments/charge
router.post('/', (req, res) => {
    const {
        stripeToken:source,
        amount,
        currency='usd',
        description='',
        metadata={}
    } = req.body;

    stripe.charges.create({
        source,
        amount,
        currency,
        description,
        metadata
    }, (err, charge) => {
        if(err){
            return res.json({
                error: true,
                message: err
            });
        }

        res.json({
            token: auth.sign({
                amount,
                description,
                currency,
                metadata
            })

        });
    });

});

module.exports =  router;