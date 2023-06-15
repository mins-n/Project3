const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '43.202.44.199',
    user: 'root',
    password: '1234',
    port: '57669',
    database: 'ManageSys',
});

module.exports.getSemester = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT DISTINCT l.year, l.semester\
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
            'SELECT l.lecture_code, l.lecture_name, l.lecture_week1, l.lecture_week2, l.lecture_time1, l.lecture_time2\
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


module.exports.getCommunity = () => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT * FROM post WHERE board_code = 4',
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


module.exports.getList = (lecture_code, board_name) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT b.board_code, p.post_code, p.post_date, p.title, p.view_count, u.name\
      FROM post p\
      INNER JOIN user u ON p.user_id = p.user_id\
      INNER JOIN board b ON p.board_code = b.board_code\
      INNER JOIN lecture l ON b.lecture_code = l.lecture_code\
      WHERE l.lecture_code = ? AND b.board_name = ?\
      ORDER BY p.post_code DESC',
            [lecture_code, board_name],
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
            'SELECT * FROM post WHERE post_code = ? ',
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

module.exports.getComment = (post_code) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT * FROM comment WHERE post_code = ? ',
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


module.exports.setPost = (user_id, board_code, post_date, title, post_contents, file) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO post(board_code, post_date, user_id, title, post_contents, file)\
             VALUES (?,?,?,?,?,?)',
            [board_code, post_date, user_id, title, post_contents, file],
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

module.exports.updatePost = (post_code, post_date, title, post_contents, file) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE post\
            SET post_date = ?,\
                title = ?,\
                post_contents = ?,\
                file = ?\
            WHERE post_code = ?',
            [post_date, title, post_contents, file ? file : null, post_code],
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

module.exports.deletePost = (post_code) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM post WHERE post_code = ?', post_code, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.setComment = (user_id, post_code, comment_contents, comment_date) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO comment(post_code, comment_date, user_id, comment_contents)\
             VALUES (?,?,?,?)',
            [post_code, comment_date, user_id, comment_contents],
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

module.exports.updateComment = (comment_code, comment_contents, comment_date) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE comment\
            SET comment_date = ?,\
                comment_contents = ?\
            WHERE comment_code = ?',
            [comment_date, comment_contents, comment_code],
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

module.exports.deleteComment = (comment_code) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM comment WHERE comment_code = ?', comment_code, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
