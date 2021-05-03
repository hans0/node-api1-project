// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();
server.use(express.json());

// POST 	/api/users 	Creates a user using the information sent inside the request body.
server.post('/api/users', async (req, res) => {
  try {
    const userFromClient = req.body;
    if (!userFromClient.name || !userFromClient.bio){
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const newUser = await Users.insert(req.body);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    })
  }
});

// GET 	/api/users 	Returns an array users.
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "The users information could not be retrieved"
      });
    });
});

// GET 	/api/users/:id 	Returns the user object with the specified id.
server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).json({ 
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
    })
  }
});

// DELETE 	/api/users/:id 	Removes the user with the specified id and returns the deleted user.
// server.delete('/api/users')

// PUT 	/api/users/:id 	Updates the user with the specified id using data from the request body. Returns the modified user



module.exports = server; // EXPORT YOUR SERVER instead of {}
