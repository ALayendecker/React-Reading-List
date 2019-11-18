import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: ""
  };

  componentDidMount() {
    // this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({
          books: res.data,
          title: "",
          author: ""
        })
      )
      .catch(err => console.log(err));
  };

  // adding book to db

  saveBookToDB = id => {
    let savedBooks = this.state.books.filter(book => book.id === id);
    savedBooks = savedBooks[0];
    const saveTheBookToDB = {
      title: savedBooks.title,
      authors: savedBooks.authors[0],
      description: savedBooks.description,
      image: savedBooks.imageLinks.smallThumbnail,
      link: savedBooks.previewLink
    };
    console.log("saved book");
    console.log(saveTheBookToDB);
    API.saveBook(saveTheBookToDB)
      // };
      // console.log(test);

      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const googleBookReturn = this.state.title || this.state.author;
    API.googleBooksSearch(googleBookReturn)
      .then(res => {
        const booksArr = [];
        for (let i = 0; i < res.data.items.length; i++) {
          // booksArr.push({});
          // booksArr.push({});
          booksArr[i] = res.data.items[i].volumeInfo;
        }
        console.log(res.data.items[0].volumeInfo);

        this.setState({ books: booksArr });
      })

      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author(s)"
              />
              {/* <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              /> */}
              <FormBtn
                disabled={!(this.state.author || this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <div>
                      <img src={book.imageLinks.smallThumbnail}></img>
                      <Link to={"/books/" + book._id}></Link>
                      <button type="button" className="btn btn-primary m-2">
                        <a href={book.previewLink}>Book Link</a>
                      </button>
                      <h2>
                        {book.title} by {book.authors},
                      </h2>
                      <p>{book.description}</p>
                      {/* <Link to="/books/saved"> */}
                      <SaveBtn
                        // id={book.id}
                        onClick={() => this.saveBookToDB(book.id)}
                      />
                      {/* </Link> */}
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
