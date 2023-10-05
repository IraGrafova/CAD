const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("express").Router();
const cors = require("cors");

const Cone = require("./models/cone");

const app = express();

mongoose.connect("mongodb://127.0.0.1/CAD", {
  useNewUrlParser: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

const doTriangulation = (req, res) => {

  const H = Number(req.body.height);
  const R = req.body.radius;
  const N = req.body.segments;

  const array = [0, 0, H];
  for (let i = 0; i < N; i++) {
    //каждый треугольник состоит из 3 точек координат
    // точка Pi состоит из косинуса синуса и 0 (x,y,z)
    // const Pi = {(R)*(Math.cos(2*Math.PI * i / N)), (R) * (Math.sin(2*Math.PI * i / N)), 0}

    array.push(
      R * Math.cos((2 * Math.PI * i) / N),
      R * Math.sin((2 * Math.PI * i) / N),
      0
    );
  }

  Cone.create(req.body)
    .then(() => res.status(200).send(array))
    .catch((err) => {
      console.log(err);
    });
};

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);

app.use(router.post("/", doTriangulation));

app.listen(3000);
