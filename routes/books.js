'use strict';

const express = require('express')
const knex = require('../knex')
const router = express.Router()

// YOUR CODE HERE

//GET
router.get('/books', (req, res, next) => {
  knex('books')
    .select(
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    )
    .orderBy('title', 'ASC')
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      next(err)
    })
})


//GET ID
router.get('/books/:id', (req, res, next) => {
  const id = req.params.id

  knex('books')
    .select(
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    )
    .orderBy('id')
    .where('id', id)
    .then((items) => {
      if (items.length < 1) {
        res.sendStatus(404)
      }
      res.json(items[0])
    })
})


//POST
router.post('/books', (req, res, next) => {
  knex('books')
    .insert({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
    }, '*')
    .then(book => {
      const obj = {
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        genre: book[0].genre,
        description: book[0].description,
        coverUrl: book[0].cover_url
      }
      res.send(obj)
    })
    .catch((err) => {
      next(err)
    })
})

//PATCH
router.patch('/books/:id', (req, res, next) => {
  const id = req.params.id;
  let obj

  knex('books')
  .update({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
    }, '*')
    .where('id', id)
    .then((book) => {
      obj = {
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        genre: book[0].genre,
        description: book[0].description,
        coverUrl: book[0].cover_url
      }
      res.send(obj)
    })
    .catch((err) => {
      next(err)
    })

})

//DELETE
router.delete('/books/:id', (req, res, next) => {

})


module.exports = router;
