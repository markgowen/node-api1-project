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
        error: 'The users information could not be retrieved.'
      });
    });
});

// Get to /users that returns a user by id
server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
        return;
      }
      res.status(200).json(user);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: `The user information could not be retrieved.`
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
    .then(id => {
      console.log(id.id);
      db.findById(id.id).then(user => {
        res.status(201).json(user);
      });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'There was an error while saving the user to the database'
      });
    });
});

// UPDATE a user
server.put('/users/:id', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      errorMessage: 'Please provide name and bio for the user'
    });
    return;
  }
  const user = req.body;
  const id = req.params.id;

  db.update(id, user)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
        return;
      }
      db.findById(id).then(user => {
        res.status(200).json(user);
      });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'The user information could not be modified.'
      });
    });
});

// DELETE a user
server.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(count => {
      if (!count) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
        return;
      }
      res.status(200).json({ message: `user with id ${id} deleted` });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'The user could not be removed'
      });
    });
});

server.listen(8000, () => console.log('API on port 8000'));
