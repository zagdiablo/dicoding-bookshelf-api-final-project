const { nanoid } = require('nanoid');
const books = require('./books');
const response = require('./responses');

const addBookHanlder = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = readPage === pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    return response(h, 'fail', 'Gagal menambahkan buku. Mohon isi nama buku', null, 400);
  }

  if (readPage > pageCount) {
    return response(h, 'fail', 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', null, 400);
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return response(h, 'success', 'Buku berhasil ditambahkan', { bookId: id }, 201);
  }

  return response(h, 'fail', 'Gagal menambahkan buku. Kesalahan tidak diketahui', null, 400);
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name) {
    const bookByName = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    return response(h, 'success', null, { book: bookByName }, 200);
  }
  if (parseInt(reading, 10) > 0) {
    const bookCurrentlyReading = books.filter((book) => book.reading > 0);
    const b = bookCurrentlyReading.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    return response(h, 'success', null, { books: b }, 200);
  }
  if (parseInt(reading, 10) === 0) {
    const bookNotReading = books.filter((book) => book.reading === false);
    const b = bookNotReading.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    return response(h, 'success', null, { books: b }, 200);
  }
  if (parseInt(finished, 10) > 0) {
    const bookFinished = books.filter((book) => book.finished > 0);
    const b = bookFinished.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    return response(h, 'success', null, { books: b }, 200);
  }
  if (parseInt(finished, 10) === 0) {
    const bookUnfinished = books.filter((book) => book.finished === false);
    const b = bookUnfinished.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    return response(h, 'success', null, { books: b }, 200);
  }

  const filteredBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return response(h, 'success', null, { books: filteredBooks }, 200);
};

const getBookDetailById = (request, h) => {
  const { id } = request.params;
  const requestedBook = books.find((book) => book.id === id);

  if (requestedBook) {
    return response(h, 'success', null, { book: requestedBook }, 200);
  }

  return response(h, 'fail', 'Buku tidak ditemukan', null, 404);
};

const editBookById = (request, h) => {
  const { id } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  if (!name) {
    return response(h, 'fail', 'Gagal memperbarui buku. Mohon isi nama buku', null, 400);
  }

  if (readPage > pageCount) {
    return response(h, 'fail', 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', null, 400);
  }

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return response(h, 'success', 'Buku berhasil diperbarui', null, 200);
  }

  return response(h, 'fail', 'Gagal memperbarui buku. Id tidak ditemukan', null, 404);
};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return response(h, 'success', 'Buku berhasil dihapus', null, 200);
  }

  return response(h, 'fail', 'Buku gagal dihapus. Id tidak ditemukan', null, 404);
};
module.exports = {
  addBookHanlder, getAllBooksHandler, getBookDetailById, editBookById, deleteBookById,
};
