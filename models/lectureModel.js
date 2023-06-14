const mysql = require('mysql');
const conn = mysql.createConnection({
  host: '3.34.200.80',
  user: 'root',
  password: '1234',
  port: '57676',
  database: 'ManageSys',
});

 module.exports.getLecture = (year, semester, lecture_name, professor_name) => {
  return new Promise((resolve, reject) => {
    console.log(year);
    console.log(semester);
    console.log(lecture_name);
    console.log(professor_name);
    conn.query('SELECT *\
    FROM lecture l\
    JOIN user u ON l.professor_id = u.user_id\
    WHERE l.year = ?\
      AND l.semester = ?\
      AND l.lecture_name LIKE ?\
      AND u.name LIKE ?;\
    ', [year, semester, lecture_name, professor_name], function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}; 
