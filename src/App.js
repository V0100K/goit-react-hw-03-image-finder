import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import apiService from "./services/ApiService";
import SearchForm from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import LoaderPreLoader from "./components/Loader";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    pictures: [],
    page: 1,
    query: "",
    largeImage: "",
    imgTags: "",
    error: "",
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchPictures();
    }
    if (this.state.page !== 2 && prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  bigImage = (largeImage = "") => {
    this.setState({ largeImage });
    this.toggleModal();
  };

  fetchPictures = () => {
    const { page, query } = this.state;
    const options = {
      page,
      query,
    };

    this.setState({ isLoading: true });

    apiService(options)
      .then((pictures) => {
        this.setState((prevState) => ({
          pictures: [...prevState.pictures, ...pictures],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error: "Picture not found" }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
        this.setState({ isLoading: false });
      });
  };

  onChangequery = (query) => {
    this.setState({ query: query, page: 1, pictures: [], error: null });
  };

  render() {
    const { pictures, isLoading, error, showModal, largeImage, imgTags } =
      this.state;

    return (
      <div className="App">
        <SearchForm onSubmit={this.onChangequery} />

        {error && <h1>{error}</h1>}

        <ImageGallery pictures={pictures} bigImage={this.bigImage} />
        {isLoading && <LoaderPreLoader />}
        {pictures.length > 11 && !isLoading && (
          <Button onClick={this.fetchPictures} />
        )}

        {showModal && (
          <Modal showModal={this.bigImage}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}
      </div>
    );
  }
}

App.propTypes = {
  pictures: PropTypes.array,
  page: PropTypes.number,
  query: PropTypes.string,
  largeImage: PropTypes.string,
  imgTags: PropTypes.string,
  error: PropTypes.string,
  showModal: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default App;
