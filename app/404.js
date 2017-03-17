module.exports = (req, res)=>{
    res.status(404);

    // respond with json
    if (req.accepts('json')) {
        return res.send({
            error: true,
            message: 'Not found'
        });
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
};