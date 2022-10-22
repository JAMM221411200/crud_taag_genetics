import axios from "axios";

export default axios.create({
	baseURL: "https://api-jamm.herokuapp.com/api/taag-genetics",
	// baseURL: "http://127.0.0.1:8001/api/taag-genetics",
});
