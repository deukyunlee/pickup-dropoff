const express = require("express");
const router = express.Router();
const maria = require("../bin/maria");

router.get("/", function (req, res, next) {
  res.render("board/list");
});

router.get("/post", function (req, res, next) {
  res.render("board/post");
});

router.post("/post", function (req, res, next) {
  try {
    const post = req.body;
    const sql = "INSERT INTO info(name,class,car) values ";
    const sqlValue = `("${post.name}", "${post.class}", "${post.car}");`;
    maria.query(sql + sqlValue, function (err, rows, fields) {
      if (!err) {
        res.json(true);
      } else {
        console.log(err);
        res.json(false);
      }
    });
  } catch (e) {
    console.log(e);
    res.json(false);
  }
});

router.get("/students", function (req, res, next) {
  try {
    const sql = "SELECT * FROM info";
    maria.query(sql, function (err, rows, fields) {
      if (!err) {
        res.render("board/students", {
          id: rows,
          name: rows,
          class: rows,
          car: rows,
        });
      } else {
        console.log(err);
        res.json(false);
      }
    });
  } catch (e) {
    console.log(e);
    res.json(false);
  }
});

router.get("/attendance", function (req, res, next) {
  try {
    const sql = "SELECT *  FROM info";
    const sql2 = "select count(name) as count from info";
    maria.query(sql, function (err, rows, fields) {
      maria.query(sql2, function (err2, rows2, fields) {
        if (!err) {
          res.render("board/attendance", {
            count: rows2[0].count,
            name: rows,
            class: rows,
            car: rows,
          });
        } else {
          console.log(err);
          res.json(false);
        }
      });
    });
  } catch (e) {
    console.log(e);
    res.json(false);
  }
});

router.post("/form", function (req, res, next) {
  form = req.body;
  // for (i in form.count) {
  //   console.log(form[i].select);
  // }
  for (i = 0; i < form[0].count; i++) {
    console.log(form[i].name, form[i].select);
  }
  // console.log(form.count);
});

module.exports = router;
