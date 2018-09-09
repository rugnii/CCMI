const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// var mysql = require('mysql');
const mariadb = require('mariadb');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || 3000)



const pool = mariadb.createPool(
    {host: 'ingurboettger.com.mysql',
    user:'ingurboettger_c',
    password: "cVJaCPbJ", 
    connectionLimit: 5
});

async function asyncFunction() {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT 1 as val");
      console.log(rows); //[ {val: 1}, meta: ... ]
      const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
      console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
   
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

  asyncFunction();

/*
var con = mysql.createConnection({
  host: "ingurboettger.com.mysql",
  user: "ingurboettger_c@10.27.12.48",
  password: "cVJaCPbJ"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
    res.send(
      [{
        title: "Hello World!",
        description: "Hi there! How are you?"
      }]
    )
  }) */