exports.status = (req, res) => {  
    res.status(200).send({
        'author': 'Anderson Giusti',
        'description': 'Api TCC', 
        // user: req.userId
    })
}