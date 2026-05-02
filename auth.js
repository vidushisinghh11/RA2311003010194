const axios = require("axios");

axios.post("http://20.207.122.201/evaluation-service/auth", {
  email: "vs3191@srmist.edu.in",
  name: "vidushi",
  rollNo: "ra2311003010194",
  accessCode: "QkbpxH",
  clientID: "a3ed1727-aba7-4c14-9e5e-7bb8bbda12e9",
  clientSecret: "gDETXutMXbGsBQsM"
})
.then(r => console.log(r.data))
.catch(e => console.log(e.response?.data || e.message));