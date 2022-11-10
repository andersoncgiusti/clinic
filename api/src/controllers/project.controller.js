module.exports = {
    project: (req, res) => {
        res.status(200).send({
            'Login': 'Logado', 
            // user: req.userId
        })
    }
}
    

