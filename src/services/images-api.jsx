import axios from "axios";
import { Component } from "react";
import PropTypes from "prop-types";

class ImagesApi extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
  };

  fetchImages = ({ searchQuery, currentPage }) => {
    return axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=20677562-9c517eaf9134a4d9aa45dfdde&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(responce => responce.data.hits);
  };
}
export default ImagesApi;
