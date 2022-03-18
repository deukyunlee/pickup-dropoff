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
    const sql = "SELECT * FROM info order by class, name";
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

router.get("/post-attendance", function (req, res, next) {
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

router.post("/post-attendance", function (req, res, next) {
  try {
    const post = req.body;
    const sql = "INSERT INTO attendance(name,attend,date) values ";
    for (i = 0; i < post[0].count; i++) {
      const sqlValue = `("${post[i].name}", "${post[i].select}", NOW());`;
      maria.query(sql + sqlValue, function (err, rows, fields) {});
    }

    res.json(true);
  } catch (e) {
    console.log(e);
    res.json(false);
  }
});

router.get("/get-attendance", function (req, res, next) {
  try {
    const sql =
      "SELECT date_format(date, '%Y-%m-%d') as date FROM attendance group by date";
    maria.query(sql, function (err, rows, fields) {
      if (!err) {
        res.render("board/attendanceList", {
          date: rows,
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

router.get("/get-attendance/:dateurl", function (req, res, next) {
  dateurl = req.params.dateurl;
  console.log(dateurl);
  try {
    let sql = `SELECT name, class, car, attend from attendance natural join info where "${dateurl}" = date_format(date, '%Y-%m-%d') and class="숲1" order by attend,class`;
    maria.query(sql, function (err, rows, fields) {
      let sql2 = `SELECT name, class, car, attend from attendance natural join info where "${dateurl}" = date_format(date, '%Y-%m-%d') and class="숲2" order by attend,class`;
      maria.query(sql2, function (err, rows2, fields) {
        let sql3 = `SELECT name, class, car, attend from attendance natural join info where "${dateurl}" = date_format(date, '%Y-%m-%d') and class="숲3" order by attend,class`;
        maria.query(sql3, function (err, rows3, fields) {
          let sql4 = `SELECT name, class, car, attend from attendance natural join info where "${dateurl}" = date_format(date, '%Y-%m-%d') and class="숲4" order by attend,class`;
          maria.query(sql4, function (err, rows4, fields) {
            if (!err) {
              res.render("board/attend", {
                date: dateurl,
                name: rows,
                class1: rows,
                class2: rows2,
                class3: rows3,
                class4: rows4,
                car: rows,
                attend: rows,
              });
            } else {
              console.log(err);
              res.json(false);
            }
          });
        });
      });
    });
  } catch (e) {
    console.log(e);
    res.json(false);
  }
});
// for (i in form.count) {
//   console.log(form[i].select);
// }
// console.log(form.count);

module.exports = router;
