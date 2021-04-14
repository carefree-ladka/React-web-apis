import axios from "axios";
const KEY = "AIzaSyD-eGlCSI8Zrc2nfDPQHozOsjb7ijq3Jrc";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  },
  headers: {}
});
