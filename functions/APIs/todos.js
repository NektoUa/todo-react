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