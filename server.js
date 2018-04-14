'use strict'

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

const conString = 'postgres://localhost:5432/books_app';
const client = new pg.Client(conString);

app.get('/books', (req, res) => {
  client.query(`
  SELECT * FROM books_app;
  `)
    .then(function(result) {
      res.send(result.rows);
    })
    .catch(function(err) {
      console.error(err)
    })
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

// function loadBooks() {
//   client.query('SELECT COUNT(*) FROM books_app')
//     .then(result => {
//       if(!parseInt(result.rows[0].count)) {
//         fs.readFile('./books.json', 'utf8', (err, fd) => {
//           JSON.parse(fd).forEach(ele => {
//             client.query(`
//               INSERT INTO
//               books(title, author, isbn, image_url, description)
//               VALUES ($1, $2, $3, $4, $5);
//             `,
//             [ele.title, ele.author, ele.isbn, ele.image_url, ele.description]
//             )
//           })
//         })
//       }
//     })
// }

// //DATABASE LOADER
// function loadDB() {
//   client.query(`
//     CREATE TABLE IF NOT EXISTS books (
//       book_id SERIAL PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       author VARCHAR(255) NOT NULL,
//       isbn VARCHAR (255) NOT NULL,
//       image_url VARCHAR(20) NOT NULL,
//       description TEXT NOT NULL);`
//   )
//     .then(() => {
//       loadBooks();
//     })
//     .catch(err => {
//       console.error(err);
//     });
// }