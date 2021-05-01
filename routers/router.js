const express = require('express');
const router = express.Router();
const tasks = require('../model/modeltask');


router.get('/', async (req, res) => {
    const task = await tasks.find();
    
    res.render('index',{task: task});

})

module.exports = router;