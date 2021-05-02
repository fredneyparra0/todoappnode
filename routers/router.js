const express = require('express');
const router = express.Router();
const tasks = require('../model/modeltask');


router.get('/', async (req, res) => {
    // const task = await tasks.find();
    
    // res.render('index',{task: task});
    
    res.render('index');
    
    
})

// router.get('/taskget', async (req, res) => {
//     const taskJson = await tasks.find();
//     res.json(taskJson);
// })

router.post('/taskget', (req, res) => {
    const params = req.params;
    console.log(params);
    res.send('yeahh starting')
});

// router.post('/', async (req, res) => {

// });

module.exports = router;