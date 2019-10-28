// implement your API here
const express = require('express');

const server = express();

// GET to /hubs that returns a list of hubs
server.get('/hubs', (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'failed to get hubs from db'
      });
    });
});

// POST to /hubs
server.post('/hubs', (req, res) => {
  const hubInformation = req.body;

  console.log('hubInformation', hubInformation);

  db.add(hubInformation)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'failed to ADD the hub to the db'
      });
    });
});

// DELETE a hub
server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(count => {
      res.status(200).json({ message: `hub with id ${id} deleted` });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({
        error: 'failed to DELETE hub from db'
      });
    });
});

server.listen(8000, () => console.log('API on port 8000'));
