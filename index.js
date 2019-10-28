// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// GET to /users that returns a list of users
server.get('/users', (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'failed to GET users from db'
      });
    });
});

// Get to /users that returns a user by id
server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: `failed to GET user with ${id} from db`
      });
    });
});

// POST to /users
server.post('/users', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      errorMessage: 'Please provide name and bio for the user'
    });
    return;
  }
  const user = req.body;

  console.log('user', user);

  db.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'There was an error while saving the user to the database'
      });
    });
});

// UPDATE a user
server.put('/users', (req, res) => {});

// DELETE a user
server.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(count => {
      res.status(200).json({ message: `user with id ${id} deleted` });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'failed to DELETE user from db'
      });
    });
});

server.listen(8000, () => console.log('API on port 8000'));
