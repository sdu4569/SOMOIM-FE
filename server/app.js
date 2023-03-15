const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let id = 3;
const userList = [
  {
    id: 1,
    name: "서동욱",
    gender: "male",
    birth: "1991-03-01",
    city: "부산광역시",
  },
  {
    id: 2,
    name: "아이유",
    gender: "female",
    birth: "1993-05-05",
    city: "부산광역시",
  },
];

const userPicList = [
  {
    id: 1,
    profilePic: "https://cdn-icons-png.flaticon.com/512/2815/2815428.png",
  },
  {
    id: 2,
    profilePic: "https://cdn-icons-png.flaticon.com/512/2815/2815428.png",
  },
];

// const userIntroList = [
//   {
//     id: 1,
//     userIntroduction: "안녕하세요",
//   },
//   {
//     id: 2,
//     userIntroduction: "반갑습니다",
//   },
// ];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  res.send(userList);
});

app.get("/users/picture", (req, res) => {
  res.send(userPicList);
});

// app.get("/users/introduction", (req, res) => {
//   res.send(userIntroList);
// });

app.post("/users", (req, res) => {
  const { name, birth, city, gender } = req.body;

  const user = {
    id: id++,
    name,
    birth,
    city,
    gender,
  };
  userList.push(user);
  res.send(userList);
});

app.patch("/users", (req, res) => {
  console.log(req.body);

  res.send("success");
});

app.put("/users/picture", (req, res) => {
  const profilePic = req.body;

  res.send(profilePic);
});

// app.put("/users/introduction", (req, res) => {
//   const userIntro = userIntroList.find((c) => c.id === parseInt(req.params.id));
//   if (!userIntro)
//     return res
//       .status(404)
//       .send("The userIntro with the given ID was not found");

//   const userIntroduction = req.body;

//   res.send(userIntroduction);
// });

app.listen(4000, () => {
  console.log("server start!!");
});
