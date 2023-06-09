const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '54.180.104.62',
    user: 'root',
    password: '1234',
    port: '58261',
    database: 'ManageSys',
});

 module.exports.join = (datas) => {
  return new Promise((resolve, reject) => {
    console.log(datas);
    conn.query('SELECT user_id FROM user WHERE user_id=?', datas[0], function(err, rows) {
      if (err) {
        reject(err);
      } else {
        if (rows.length) {
          reject('이미 존재하는 ID');
        } else {
          conn.query('INSERT INTO user(user_id, password, name, phone_num, email, user_class) VALUES (?,?,?,?,?,?)', datas, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve('회원가입 성공');
            }
          });
        }
      }
    });
  });
}; 

module.exports.authenticate = (schoolNumber, password, registerChoice) => {
  return new Promise((resolve, reject) => {
    console.log(schoolNumber, password, registerChoice);
    conn.query('SELECT * FROM user WHERE user_id = ? AND password = ? AND register_choice = ?', [schoolNumber, password, registerChoice], function(err, rows) {
      if (err) {
        reject(err);
      } else {
        if (rows.length) {
          // User authenticated successfully
          resolve(rows[0]); // Return the user object
        } else {
          // Authentication failed
          reject('Invalid credentials');
        }
      }
    });
  });
};