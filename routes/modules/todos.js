const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => { return res.render('detail', { todo: todo.toJSON() }) })
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const userId = req.user.id

  return Todo.findOne({ where: {UserId: userId, id} })
    .then((todo) => { res.render('edit', { todo: todo.toJSON() }) })
    .catch(error => { console.log(error) })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  const userId = req.user.id
  console.log(req.body)
  return Todo.findOne({ where: { UserId: userId, id } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})
module.exports = router