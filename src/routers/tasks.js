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

router.get('/', auth, async (req,res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)  
    } catch (error) {
        res.status(500).send(error)
    } 
})

router.get('/:id', auth, async (req,res) => {
    try {
        //const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
        if(!task) return res.status(404).send('Task not found')
        res.send(task)   
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/:id', auth, async (req,res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdated = updates.every(update => allowedUpdates.includes(update))
    
    if(!isValidUpdated) return res.status(400).send('Invalid update')

    try {
        //const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
        if(!task) return res.status(404).send('Task not found')
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete('/:id', auth, async (req,res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!task) return res.status(404).send('Task not found')
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router