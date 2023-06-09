const mysql = require('mysql');
const conn = mysql.createConnection({
  host: '54.180.104.62',
  user: 'root',
  password: '1234',
  port: '58261',
  database: 'ManageSys',
});

// Fetch the timetable data for a specific user
exports.getTimetable = (userId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT lecture_name, lecture_week1, lecture_week2, lecture_time1, lecture_time2 FROM user_lecture AS ul, lecture AS l WHERE ul.user_id = ? AND ul.lecture_code = l.lecture_code';
  
      conn.query(query, userId, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };