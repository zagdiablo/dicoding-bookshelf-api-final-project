const {
  addBookHanlder, getAllBooksHandler, getBookDetailById, editBookById, deleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'post',
    path: '/books',
    handler: addBookHanlder,
  },
  {
    method: 'get',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'get',
    path: '/books/{id}',
    handler: getBookDetailById,
  },
  {
    method: 'put',
    path: '/books/{id}',
    handler: editBookById,
  },
  {
    method: 'delete',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];
module.exports = routes;
