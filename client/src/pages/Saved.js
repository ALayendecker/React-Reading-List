import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";

class Saved extends Component {
  state = {
    book: []
  };

  componentDidMount() {
    this.loadBooks();
    // API.getSaved(this.props.match.params.id)
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ book: res.data });
    //   })
    //   .catch(err => console.log(err));
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        console.log(res.data);
        this.setState({
          book: res.data
        });
        // console.log(books.title[0]);
        console.log(this.state.book[0].title);
      })
      .catch(err => console.log(err));
  };

  // Add code to get the book with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  // The book id for this route can be accessed using this.props.match.params.id

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Books you've saved so far.</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            {/* <List>
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
                  </div>
                </ListItem>
              ))}
            </List> */}
            {/* article- deletebtn  */}
            <article>
              <h1>Description</h1>
              {/* <p>{this.state.book[0].author}</p>
              <p>{this.state.book[0].title}</p> */}
            </article>
            {/* <DeleteBtn /> */}
            {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Search</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
