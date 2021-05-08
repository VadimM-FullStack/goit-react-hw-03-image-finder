import axios from "axios";
import { Component } from "react";
import PropTypes from "prop-types";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "20677562-9c517eaf9134a4d9aa45dfdde";

class ImagesApi extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
  };

  fetchImages = ({ searchQuery, currentPage }) => {
    return axios
      .get(
        `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&per_page=12&image_type=photo&orientation=horizontal`,
      )
      .then(responce => responce.data.hits);
  };
}
export default ImagesApi;
