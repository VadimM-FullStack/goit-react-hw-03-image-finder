import axios from "axios";
import { Component } from "react";
import PropTypes from "prop-types";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "20677562-9c517eaf9134a4d9aa45dfdde";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: "photo",
  orientation: "horizontal",
  per_page: 12,
};

class ImagesApi extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
  };

  fetchImages = async ({ searchQuery, currentPage }) => {
    try {
      const { data } = await axios.get("", {
        params: { q: searchQuery, page: currentPage },
      });
      return data.hits;
    } catch (error) {
      console.log("error", { error });
      return [];
    }
  };
}

export default ImagesApi;
