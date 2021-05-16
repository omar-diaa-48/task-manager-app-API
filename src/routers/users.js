const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        user.tokens = user.tokens.concat({token})
        await user.save()
        res.send({user, token})
    } catch (error) {
        res.status(400).send('Cant login')
    }
})

router.post('/signup', (req,res) => {
    const user = new User(req.body)
    user.save()
        .then(() => res.redirect(307, '/users/login'))
        .catch(error => res.status(400).send(error))
})

router.post('/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send('Error logging out')
    }
})

router.get('/me', auth, async (req,res) => {
    res.send(req.user)
})

router.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user)return res.status(404).send('User not found')
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidUpdated = updates.every(update => allowedUpdates.includes(update))

    if(!isValidUpdated) return res.status(400).send('Invalid Updates!')

    try {
        const user = await User.findById(req.params.id)
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        if(!user) return res.status(404).send('User not found')
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send('Task not found')
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router