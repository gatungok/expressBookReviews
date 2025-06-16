const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    // Return the list of books available in the shop
    return res.status(200).json(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        return res.status(200).json(JSON.stringify(book, null, 2));
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = [];
    const keys = Object.keys(books);
    for (const key of keys) {
        if (books[key].author === author) {
            booksByAuthor.push(books[key]);
        }
    }
    if (booksByAuthor.length > 0) {
        return res.status(200).json(JSON.stringify(booksByAuthor, null, 2));
    } else {
        return res.status(404).json({ message: "No books found by this author" });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const booksByTitle = [];
    const keys = Object.keys(books);
    for (const key of keys) {
        if (books[key].title === title) {
            booksByTitle.push(books[key]);
        }
    }
    if (booksByTitle.length > 0) {
        return res.status(200).json(JSON.stringify(booksByTitle, null, 2));
    } else {
        return res.status(404).json({ message: "No books found with this title" });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book && book.reviews) {
        return res.status(200).json(JSON.stringify(book.reviews, null, 2));
    } else {
        return res.status(404).json({ message: "No reviews found for this book" });
    }
});

module.exports.general = public_users;
