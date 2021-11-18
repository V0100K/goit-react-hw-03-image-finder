import axios from "axios";

const API_KEY = "24259107-5370b13ebcd4de04825255a0d";

const apiService = ({ query = "", page = 1 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15`
    )
    .then(({ data }) => data.hits);
};

export default apiService;
