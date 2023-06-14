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
    console.log(year, semester, lecture_name, professor_name);
    conn.query('SELECT l.lecture_code, l.lecture_name, l.lecture_class, l.credit, u.name, u.phone_num, l.lecture_week1, l.lecture_time1, l.lecture_week2, l.lecture_time2\
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

module.exports.getLecture2 = (department, lecture_name) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT l.lecture_code, l.lecture_name, l.credit, u.name, l.seat, l.lecture_week1, l.lecture_time1, l.lecture_week2, l.lecture_time2\
    FROM lecture l\
    JOIN user u ON l.professor_id = u.user_id\
    JOIN department d ON l.department_code = d.department_code\
    WHERE l.lecture_name LIKE ?\
      AND d.department_name LIKE ?'
      , [lecture_name, department], function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}; 
