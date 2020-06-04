const { db } = require('../util/admin');

exports.getAllTodos = (request, response) => {
    db
        .collection('todos')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let todos = [];
            data.forEach((doc) => {
                todos.push({
                    todoId: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                });
            });
            return response.json(todos);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.postOneTodo = (request, response) => {
    if (request.body.body.trim() === '') {
        return response.status(400).json({ body: 'Must be filled' });
    }

    if (request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Please give a name' });
    }

    const newTodoItem = {
        title: request.body.title,
        body: request.body.body,
        createdAt: new Date().toISOString()
    }
    db
        .collection('todos')
        .add(newTodoItem)
        .then((doc) => {
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((err) => {
            response.status(500).json({ error: 'Oops! Something went wrong' });
            console.error(err);
        });
};


exports.editTodo = (request, response) => {
    if (request.body.todoId || request.body.createdAt) {
        response.status(403).json({ message: 'Not allowed to edit' });
    }
    let document = db.collection('todos').doc(`${request.params.todoId}`);
    document.update(request.body)
        .then(() => {
            response.json({ message: 'Updated successfully' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({
                error: err.code
            });
        });
};

exports.deleteTodo = (request, response) => {
    const document = db.doc(`/todos/${request.params.todoId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Never existed' })
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successful!' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};


// exports.getAllTodos = (request, response) => {
//     todos = [
//         {
//             'id': '1',
//             'title': 'greeting',
//             'body': 'Hello Copenhagen'
//         },
//         {
//             'id': '2',
//             'title': 'greeting2',
//             'body': 'Hello Mallorca'
//         }
//     ]
//     return response.json(todos);
// }