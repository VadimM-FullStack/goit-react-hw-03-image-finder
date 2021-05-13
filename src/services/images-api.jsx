import axios from "axios";
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

const getImages = async ({ searchQuery, currentPage }) => {
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

getImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export { getImages };
