const Router = require("express").Router();

const PublicationModel = require("../../database/publication");


/*
Route               /publications
Description         get all publications
Access              PUBLIC
Parameters          NONE
Method              GET
*/

Router.get("/", (req, res) => {
    return res.json({ publications: database.publications });
  });

  /*
Route               /publication/update/book
Description         update/add new book to a publication
Access              PUBLIC
Parameters          isbn
Method              put
*/

Router.put("/update/book/:isbn", (req, res) => {
    //update the pubications database
    database.publications.forEach((publication) => {
      if(publication.id === req.body.publId)  {
      return publication.books.push(req.params.isbn);
      }
    });
  
    //update the book database
    database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn) {
        book.publication = req.body.publId;
        return;
      }
    });
  
    return res.json({ 
      books: database.books,
      publications: database.publications,
      message: "Successfully updated publication",
    });
  });

  
/*
Route               /publication/delete/book
Description         delete a book from publication
Access              PUBLIC
Parameters          isbn, publication id
Method              DELETE
*/

Router.delete("/delete/book/:isbn/:pubId", (req, res) => {
    //update publications database
    database.publications.forEach((publication) => {
      if(publication.id === parseInt(req.params.pubId)) {
        const newBooksList = publication.books.filter(
          (book) => book !== req.params.isbn
        );
  
        publication.books = newBooksList;
        return;
      }
    });
  
    //update book database
    database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn){
        book.publication = 0; //no publication available
        return;
      }
    });
  
    return res.json({
      books: database.books, 
      publications: database.publications,
    })
  });

  module.exports = Router;