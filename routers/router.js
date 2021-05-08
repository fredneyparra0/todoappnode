const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const tasks = require('../model/modeltask');

router.get('/', async (req, res) => {
    const listTasks = await tasks.find();
    res.render('index',{task: listTasks});
})

router.post('/taskget', async (req, res) => {
    console.log(req.body)
    // const { task, check } = req.body;
    // console.log(task);
    // console.log(check);
    // try {
    //     const taskSave = new tasks(body)
    //     await taskSave.save()
    //     res.redirect('/')
    // } catch (error) {
        //     console.log('error', error)
        // }
    res.redirect('/')
});

router.get('/updatetask/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const compareTask = await tasks.findOne({_id : id})
        compareTask.check ? compareTask.check = false : compareTask.check = true; 
        await tasks.findByIdAndUpdate(
            id, compareTask, { useFindAndModify: false }
        )
        const findBD = await tasks.find();
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
});

router.get('/deletetask/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await tasks.findByIdAndDelete({ _id: id });
        res.redirect('/');
    } catch (error) {
        console.log(error)
    }
});

router.get('/deletecompleted', async (req, res) => {
    const tasksCompletedBD = await tasks.deleteMany({"check" : true });
    console.log(tasksCompletedBD)
    res.redirect('/')
})

module.exports = router;