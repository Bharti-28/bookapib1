const Router = require("express").Router();

const AuthorModel = require("../../database/author");


/*
Route               /authors
Description         get all authors
Access              PUBLIC
Parameters          NONE
Method              GET
*/

Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
  });
  
  /*
  Route               /authors
  Description         get a list of authors based on a book's ISBN
  Access              PUBLIC
  Parameters          isbn
  Method              GET
  */
  
  Router.get("/:isbn", (req, res) => {
    const getSpecificAuthors = database.authors.filter((author) =>
      author.books.includes(req.params.isbn)
  );
  
      if (getSpecificAuthors.length === 0){
      return res.json({
        error: `No author found for the book ${req.params.category}`,
    });
  }
  
     return res.json({ authors: getSpecificAuthors });
  });

  /*
Route               /author/new
Description         add new author
Access              PUBLIC
Parameters          NONE
Method              post
*/

Router.post("/new", (req, res) => {
    const { newAuthor } = req.body;
  
    AuthorModel.create(newAuthor);
  
    return res.json({ message: "author was added!" });
  });
  

  module.exports = Router;
  