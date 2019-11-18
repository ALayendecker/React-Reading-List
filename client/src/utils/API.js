import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getSaved: function() {
    return axios.post("/api/books/saved");
  },

  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.get("/api/books/", bookData);
  },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },

  googleBooksSearch: function(query) {
    console.log(query);
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query);
  }
};
