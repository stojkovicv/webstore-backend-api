// Express ruter

const express = require('express')
const router  = express.Router();


router.get('/', (req, res) => {
    res.status(200)
    .json({status:true, msg: 'Show all bootcamps'});
})

router.get('/:id', (req, res) => {
    res.status(200)
    .json({status:true, msg: `Get bootcamp number ${req.params.id}`});
})

router.post('', (req, res) => {
    res.status(200)
    .json({status:true, msg: 'Create new bootcamp'});
})

router.put('/:id', (req, res) => {
    res.status(200)
    .json({status:true, msg: `Update bootcamp number ${req.params.id}`});
})

router.delete('/:id', (req, res) => {
    res.status(200)
    .json({status:true, msg: `Delete bootcamp number ${req.params.id}`});
})

// Export rutera
module.exports = router;
