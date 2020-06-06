const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth')

const {
    getAllTodos
    postOneTodo
    editTodo
    deleteTodo
} = require('./APIs/todos')

const {
    loginUser
    signUpUser
    uploadProfilePhoto
} = require('./APIs/users')

app.post('/todos', postOneTodo);
app.get('/todos', getAllTodos);
app.put('/todo/:todoId', editTodo);
app.delete('/todo/:todoId', deleteTodo);

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);

exports.api = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
