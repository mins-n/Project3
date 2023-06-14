const mysql = require('mysql');
const conn = mysql.createConnection({
  host: '54.180.104.62',
  user: 'root',
  password: '1234',
  port: '57676',
  database: 'ManageSys',
});

// Fetch the timetable data for a specific user
/*userId = 'shine8917'
exports.getTimetable = (userId) => {
      return new Promise((resolve, reject) => {
      const query = 'SELECT lecture_name, lecture_week1, lecture_week2, lecture_time1, lecture_time2 FROM user_lecture AS ul, lecture AS l WHERE ul.user_id = ? AND ul.lecture_code = l.lecture_code';
  
      conn.query(query, userId, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      } );
    });
  };*/

exports.getTimetable = () => {
    const data = {
        lecture_name: '소프트웨어공학',
        lecture_week1: '월요일',
        lecture_week2: '수요일',
        lecture_time1: '5',
        lecture_time2: '6',
    };

    return data;
};