const mysql = require('mysql');
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const validator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
const saltRounds = 10;

var app =  express();
app.use(bodyParser.json());
//app.use(validator());
var con = mysql.createConnection({//set up the connection to the MySQL database
  host: 'localhost',
  user: 'test',
  password: 'asdf',
  database: 'test',
  insecureAuth : true
});
con.connect(function(err){
  if(err) throw err;
  console.log("connection");
  //create the table if this is the first time
  con.query("CREATE TABLE IF NOT EXISTS users (email varchar(255) NOT NULL, password varchar(255) NOT NULL, fName varchar(255) NOT NULL, lName varchar(255) NOT NULL, gender ENUM('male', 'female') NOT NULL, dob Date NOT NULL, zipcode int NOT NULL, height int NOT NULL, genderPreference ENUM('male', 'female') NOT NULL, agePrefMin int NOT NULL, agePrefMax int NOT NULL, race varchar(255), religion varchar(255))", function(err, resp){
    if(err){ throw err; res.json({"message": err});}
    console.log("Table in place");
  });
  app.post('/register',function(req, res){//adds new users
      var data = req.body;
/*This is the validation for the form that users will input it
  req.check('email', 'Invalid Email Address').isEmail();
  req.check('password', 'Add a password').notEmpty();
  req.check('fName', 'Add first name').notEmpty();
  req.check('lName', 'Add last name').notEmpty();
  req.check('gender', 'Select male or female').equals('male' || 'female');
  req.check('dob', 'Enter a valid date').match("\d\d\d\d-\d\d-\d\d");
  req.check('zipcode', 'Enter a valid date').match("\d\d\d\d\d");
  req.check('height', 'Enter your height').match("\d*");
  req.check('genderPreference', 'Select male or female').equals('male' || 'female');
  req.check('agePrefMin', 'Enter youngest date').match("\d\d");
  req.check('agePrefMax', 'Enter oldest date').match("\d\d");
  var errors = req.validationErrors();
  if(errors){
  res.json({"message":errors})
}
*/

  /*this is an example of what to send in the body
  {
  "email":"testing",
  "password": "testThis",
  "fName":"asdf" ,
  "lName":"qwerty",
  "gender":"male",
  "dob":"2008-7-04",
  "zipcode":91910,
  "height":185,
  "genderPreference":"male",
  "agePrefMin":18,
  "agePrefMax":22,
  "race":"white",
  "religion":""
  }*/
      var hash = bcrypt.hashSync(data.password, saltRounds); //this hashes the password for safe storage
      var ifErr = 0;
      var error;
        //run the sql to insert the json into the user table
      con.query("INSERT INTO users (email, password, fName, lName, gender, dob, zipcode, height, genderPreference, agePrefMin, agePrefMax, race, religion) VALUES (' " + data.email + "', '"+ hash + "', '" + data.fName + "', '" + data.lName + "', '" + data.gender + "',  '2008-7-04' , " + data.zipcode + ", " + data.height + ", '" + data.genderPreference + "', " + data.agePrefMin + ", " + data.agePrefMax + ", '" + data.race + "', '" + data.religion + "')", function(err,res){
        if(err){ throw err; ifErr = 1; error = err;}
        else {console.log("Insert Complete"); }
      });
      if (ifErr == 1) {
        res.json({"message": error});
      }
      else {
        res.json({"message": "Success"});
      }
  });
  //This allows the basic upload of a file. This will store in a folder named uploads.
  app.post('/uploadProfile', upload.single('userImg'), function(req, res){
    console.log(req.file);
    res.json({"message":"Upload Complete"});
  });
});

app.listen(3020);
console.log("It is working! It is functioning properly.");
