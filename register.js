const axios = require("axios");

axios.post("http://20.207.122.201/evaluation-service/register", {
  email: "vs3191@srmist.edu.in",
  name: "Vidushi",
  mobileNo: "8859289966",
  githubUsername: "vidushisinghh11",
  rollNo: "RA2311003010194",
  accessCode: "QkbpxH"
}).then(r => console.log(r.data))
  .catch(e => console.log(e.response?.data || e.message));