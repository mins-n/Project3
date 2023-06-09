const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '43.202.44.199',
    user: 'root',
    password: '1234',
    port: '54610',
    database: 'ManageSys',
});

// Fetch the timetable data for a specific user
// exports.getTimetable = (req) => {
//   return new Promise((resolve, reject) => {
//     // Retrieve user_id from the session
//     const user_id = req.session.user_id;

//     // Your database query code using user_id
//     const query = 'SELECT lecture_name, lecture_week1, lecture_week2, lecture_time1, lecture_time2 FROM user_lecture AS ul, lecture AS l WHERE ul.user_id = ? AND ul.lecture_code = l.lecture_code';
//     console.log('req 의 값은 : ', req.session.user_id);
//     conn.query(query, user_id, (err, rows) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(rows);
//       }
//     });
//   });
// };

// exports.getTimetable = (userId) => {
//       return new Promise((resolve, reject) => {
//       const query = 'SELECT lecture_name, lecture_week1, lecture_week2, lecture_time1, lecture_time2 FROM user_lecture AS ul, lecture AS l WHERE ul.user_id = ? AND ul.lecture_code = l.lecture_code';

//       conn.query(query, userId, (err, rows) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(rows);
//         }
//       } );
//     });
//   };

module.exports.getTimetable = (req) => {
    const data = {
        lecture_name: '소프트웨어공학',
        lecture_week1: '월요일',
        lecture_week2: '수요일',
        lecture_time1: '5',
        lecture_time2: '6',
    };

    return data;
};

module.exports.getUserInfo = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT user_id, name, user_class FROM user WHERE user_id = ?', user_id, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
