var express = require('express');
const { getUsers } = require('./models/users');
const fileUpload = require('express-fileupload')
const cors = require('cors');

const app = express();
app.use(fileUpload());
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({ extended: true }))

app.get("/", async(req, res, next) => {
   const c = await getUsers();
   console.log(c);
    res.status(200).json({response: c});
});

app.use("/api/profile", require("./routes/profile"));
app.use("/api/users", require("./routes/users"));
app.use("/api/gym", require("./routes/gym"));

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);