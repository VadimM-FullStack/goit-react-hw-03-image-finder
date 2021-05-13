import React, { Component } from "react";
import ImagesApi from "./services/images-api";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./index.module.css";

const imagesApi = new ImagesApi();
class App extends Component {
  state = {
    showModal: false,
    searchQuery: "",
    currentPage: 1,
    imagesArray: [],
    largeImageURL: "",
    isLoading: false,
    error: false,
    errorMsg: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    if (this.state.searchQuery === query) return;
    this.setState({
      searchQuery: query,
      currentPage: 1,
      imagesArray: [],
      largeImageURL: "",
      error: false,
    });
  };

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };
    this.setState({ isLoading: true, error: false });

    imagesApi
      .fetchImages(options)
      .then(newImagesArray => {
        this.setState(prevState => ({
          imagesArray: [...prevState.imagesArray, ...newImagesArray],
          currentPage: prevState.currentPage + 1,
        }));
        if (currentPage > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch(error => {
        this.setState({ error: true, errorMsg: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
        if (this.state.nextPage > 2)
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
      });
  };

  onThumbClick = event => {
    this.setState({
      showModal: true,
      largeImageURL: event.target.dataset.largeimageurl,
    });
  };

  openModal = event => {
    const { imagesArray } = this.state;
    const currentId = Number(event.target.getAttribute("id"));
    const modalImageURL = imagesArray.find(
      image => image.id === currentId,
    ).largeImageURL;
    this.setState({
      showModal: true,
      largeImageURL: modalImageURL,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: "" });
  };

  render() {
    const {
      searchQuery,
      imagesArray,
      isLoading,
      showModal,
      largeImageURL,
      error,
      errorMsg,
    } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery
          imagesArray={imagesArray}
          onThumbClick={this.onThumbClick}
          isLoading={isLoading}
        />
        {isLoading && (
          <div className={styles.Loader}>
            <Loader
              type="Circles"
              color="#3f51d5"
              height={90}
              width={90}
              timeout={3000}
            />
          </div>
        )}
        {error && (
          <>
            <p className={styles.ErrorMessage}>Oops, something went wrong...</p>
            <p className={styles.ErrorMessage}>{errorMsg}</p>
          </>
        )}
        {imagesArray.length > 0 && !error && (
          <Button onClick={this.fetchImages}>Load more</Button>
        )}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={searchQuery} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
