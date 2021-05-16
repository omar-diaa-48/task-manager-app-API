const express = require('express');
const { update } = require('../models/task');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router()

router.post('/' , auth, async (req,res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    task.save()
        .then((task) => res.status(201).send(task))
        .catch((error) => res.status(400).send(error))
})

router.get('/', async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)  
    } catch (error) {
        res.status(500).send(error)
    } 
})

router.get('/:id', async (req,res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task) return res.status(404).send('Task not found')
        res.send(task)   
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/:id', async (req,res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdated = updates.every(update => allowedUpdates.includes(update))
    
    if(!isValidUpdated) return res.status(400).send('Invalid update')

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        if(!task) return res.status(404).send('Task not found')
        res.send(task)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send('Task not found')
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router