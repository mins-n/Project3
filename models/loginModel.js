const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '3.34.200.80',
    user: 'root',
    password: '1234',
    port: '57412',
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
