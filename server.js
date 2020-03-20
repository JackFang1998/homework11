var express = require("express"); //
var exphbs = require("express-handlebars"); //
var mysql = require("mysql"); //
var app = express(); //

var PORT = process.env.PORT || 8080; //

app.use(express.static("public")); //
app.use(express.urlencoded({ extended: true })); //
app.use(express.json()); //

app.engine("handlebars", exphbs({ defaultLayout: "main" })); //
app.set("view engine", "handlebars"); //

var connection = mysql.createConnection({
  //
  host: "localhost", //
  port: 3306, //
  user: "root", //
  password: "", //
  database: "BURGERS_db" //
}); //

connection.connect(function(err) {
  //
  if (err) {
    //
    console.error("error connecting: " + err.stack);
    return; //
  }
  console.log("connected as id " + connection.threadId);
}); //

app.get("/", function(req, res) {
  //
  connection.query("SELECT * FROM BURGERS;", function(err, data) {
    if (err) {
      //
      return res.status(500).end(); //
    }
    res.render("index", { burgers: data });
  });
});
// connection.query("SELECT * FROM atedburger;", function(err, data) {
//   if (err) {
//     //
//     return res.status(500).end(); //
//   }
//   res.render("index", { atedburger: data });
// });

app.get("/:id", function(req, res) {
  connection.query(
    "SELECT * FROM burgers where id = ?",
    [req.params.id],
    function(err, data) {
      if (err) {
        return res.status(500).end();
      }

      console.log(data);
      res.render("single-burger", data[0]);
    }
  );
});

app.post("/api/burgers", function(req, res) {
  connection.query(
    "INSERT INTO burgers (burger_name) VALUES (?)",
    [req.body.burger_name],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }

      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    }
  );
});

app.delete("/api/burgers/:id", function(req, res) {
  connection.query(
    "DELETE FROM burgers WHERE id = ?",
    [req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      } else if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

app.put("/api/burgers/:id", function(req, res) {
  connection.query(
    "UPDATE burgers SET burger_name = ? WHERE id = ?",
    [req.body.burger_name, req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      } else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
