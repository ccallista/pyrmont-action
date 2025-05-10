const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt')

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



