const mysql = require('mysql');
const conn = mysql.createConnection({
  host: '54.180.104.62',
  user: 'root',
  password: '1234',
  port: '53319',
  database: 'ManageSys',
});

module.exports.getSemester = (user_id) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT u.year, u.semester\
        FROM user_lecture u\
        INNER JOIN lecture l ON u.lecture_code = l.lecture_code\
        WHERE u.user_id = ?\
        ORDER BY u.year DESC, u.semester DESC', user_id, function(err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}; 

module.exports.getLecture = (user_id, year, semester) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT l.lecture_code, l.lecture_name\
      FROM user_lecture u\
      INNER JOIN lecture l ON u.lecture_code = l.lecture_code\
      WHERE u.user_id = ? AND u.year = ? AND u.semester = ?\
      ORDER BY l.lecture_name ASC', [user_id, year, semester], function(err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }; 

module.exports.getPageCount = (user_id, lecture_code, board_name) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT COUNT(*) AS total_posts\
      FROM post p\
      INNER JOIN board b ON p.board_code = b.board_code\
      INNER JOIN user_lecture ul ON b.lecture_code = ul.lecture_code\
      INNER JOIN user u ON ul.user_id = u.user_id\
      WHERE u.user_id = ? AND ul.lecture_code = ? AND b.board_name = ?',
     [user_id, lecture_code, board_name], function(err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }; 

module.exports.getList = (user_id, lecture_code, board_name, page) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT p.post_code, p.date, u.name, p.title, p.view_count\
      FROM post p\
      INNER JOIN board b ON p.board_code = b.board_code\
      INNER JOIN user_lecture ul ON b.lecture_code = ul.lecture_code\
      INNER JOIN user u ON ul.user_id = u.user_id\
      WHERE u.user_id = ? AND ul.lecture_code = ? AND b.board_name = ?\
      ORDER BY p.post_code DESC\
      LIMIT ?, ?'
      , [user_id, lecture_code, board_name, (page-1)*10,10], function(err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }; 