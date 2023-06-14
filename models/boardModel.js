const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '43.202.44.199',
    user: 'root',
    password: '1234',
    port: '54189',
    database: 'ManageSys',
});

module.exports.getSemester = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT l.year, l.semester\
        FROM user_lecture u\
        INNER JOIN lecture l ON u.lecture_code = l.lecture_code\
        WHERE u.user_id = ?\
        ORDER BY l.year DESC, l.semester DESC',
            user_id,
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

module.exports.getLecture = (user_id, year, semester) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT l.lecture_code, l.lecture_name\
      FROM user_lecture u\
      INNER JOIN lecture l ON u.lecture_code = l.lecture_code\
      WHERE u.user_id = ? AND l.year = ? AND l.semester = ?\
      ORDER BY l.lecture_name ASC',
            [user_id, year, semester],
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

module.exports.getList = (user_id, lecture_code, board_name) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT p.board_code, p.post_code, p.post_date, u.name, p.title, p.view_count\
      FROM post p\
      INNER JOIN board b ON p.board_code = b.board_code\
      INNER JOIN user_lecture ul ON b.lecture_code = ul.lecture_code\
      INNER JOIN user u ON ul.user_id = u.user_id\
      WHERE u.user_id = ? AND ul.lecture_code = ? AND b.board_name = ?\
      ORDER BY p.post_code DESC',
            [user_id, lecture_code, board_name],
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

module.exports.getPost = (post_code) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT p.post_code, p.post_date, p.user_id AS post_user_id, p.title, p.post_contents,\
       p.view_count, p.file, c.comment_code, c.comment_date, c.user_id AS comment_user_id, c.comment_contents\
      FROM post p LEFT JOIN comment c ON p.post_code = c.post_code\
      WHERE p.post_code = ?',
            post_code,
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};
