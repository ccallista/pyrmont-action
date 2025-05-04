const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt')
// const db = new sqlite3.Database('./database.db', (err) => {
//     if (err) console.error(err.message);
//     else console.log("Connected to SQLite database.");
// });


// db.run(`
//   CREATE TABLE IF NOT EXISTS test (
//     email TEXT PRIMARY KEY,
//     password TEXT NOT NULL,
//     firstName VARCHAR(50) NOT NULL,
//     lastName VARCHAR(50) NOT NULL,
//     mobilePhone VARCHAR(15) NOT NULL,
//     areaOfInterest TEXT NOT NULL,
//     streetName VARCHAR(100) NOT NULL,
//     city VARCHAR(50) NOT NULL,
//     state VARCHAR(3) NOT NULL,
//     postcode VARCHAR(4) NOT NULL
//   );

// `);


module.exports = {
    async hashPassword(password){
      return new Promise((resolve, reject) => {
        salt = 12
        bcrypt.hash(password, salt, (error, hashedPassword) => {
          if(error) reject(error);
          resolve(hashedPassword);
        })
      }

      );
      
      
    },

    async createUser(data, db){
      return new Promise((resolve, reject) => {
        query = 'INSERT INTO users (email, password, firstName, lastName, mobilePhone, areaOfInterest, streetName, city, state, postcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(query, data, function(error){
          if (error) reject("Caused from creating a new user: " + error);
          resolve();
        }
      )        
      }
      
      )
    },


    async getUser(email, db){
      return new Promise((resolve, reject) => {
        query = "SELECT email, password FROM users WHERE email = ?"
        db.get(query, [email], (error, result) => {
          if (error) reject("Caused from searching users: " + error);
          resolve(result);

        });
        
      })
    },

    async getCheck(userInputEmail, userInputPassword, userEmailStored, userPasswordStored){
      return new Promise((resolve, reject) => {
        if(userInputEmail != userEmailStored) reject("Username Incorrect")
        bcrypt.compare(userInputPassword, userPasswordStored, (error, result) => {
          if(error) reject("Error in unhashing password: " + error);
          
          if(result){
            resolve("Password correct");
          }
          reject("Incorrect Password");
        })
      })
    }
};



