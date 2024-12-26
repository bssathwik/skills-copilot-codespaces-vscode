// Create web server
// 1. Create an express app
// 2. Create a route for GET /comments
// 3. Create a route for POST /comments
// 4. Create a route for DELETE /comments/:id

// 1. Create an express app
const express = require('express');
const app = express();
app.use(express.json());

// 2. Create a route for GET /comments
const comments = [
    { id: 1, author: 'John', content: 'Hello World!' },
    { id: 2, author: 'Jane', content: 'Nice to meet you!' }
];

app.get('/comments', (req, res) => {
    res.json(comments);
});

// 3. Create a route for POST /comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.json(comment);
});

// 4. Create a route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        comments.splice(index, 1);
        res.json({ id });
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// curl -X GET http://localhost:3000/comments
// curl -X POST -H "Content-Type: application/json" -d '{"author":"Tom","content":"Good morning!"}' http://localhost:3000/comments
// curl -X DELETE http://localhost:3000/comments/1