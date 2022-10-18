import axios from "axios";

function addUser (user) {
    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));
}

function getTranscript() {
    axios.get("")
}

export getTranscript()