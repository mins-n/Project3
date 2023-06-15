const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '43.202.44.199',
    user: 'root',
    password: '1234',
    port: '57132',
    database: 'ManageSys',
});

module.exports.getLecture = (year, semester, lecture_name, professor_name) => {
    return new Promise((resolve, reject) => {
        console.log(year, semester, lecture_name, professor_name);
        conn.query(
            'SELECT l.lecture_code, l.lecture_name, l.lecture_class, l.credit, u.name, u.phone_num, l.lecture_week1, l.lecture_time1, l.lecture_week2, l.lecture_time2\
    FROM lecture l\
    JOIN user u ON l.professor_id = u.user_id\
    WHERE l.year = ?\
      AND l.semester = ?\
      AND l.lecture_name LIKE ?\
      AND u.name LIKE ?;\
    ',
            [year, semester, lecture_name, professor_name],
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

module.exports.getLecture2 = (department, lecture_name) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT l.lecture_code, l.lecture_name, l.credit, u.name, l.seat, l.lecture_week1, l.lecture_time1, l.lecture_week2, l.lecture_time2\
    FROM lecture l\
    JOIN user u ON l.professor_id = u.user_id\
    JOIN department d ON l.department_code = d.department_code\
    WHERE l.lecture_name LIKE ?\
      AND d.department_name LIKE ?',
            [lecture_name, department],
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

module.exports.enrolment = (user_id, lecture_code) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO user_lecture(user_id, lecture_code) VALUES (?,?)',
            [user_id, lecture_code],
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    conn.query(
                        'UPDATE lecture\
            SET seat = seat - 1\
            WHERE lecture_code = ?',
                        lecture_code,
                        function (err, rows) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(rows);
                            }
                        }
                    );
                }
            }
        );
    });
};


module.exports.getEvaluatedLecture = (name, lecture_name) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT l.lecture_name, u.name, ul.evaluation_score, ul.evaluation, ul.evaluation_date\
            FROM user_lecture ul\
            JOIN lecture l ON ul.lecture_code = l.lecture_code\
            JOIN user u ON l.professor_id = u.user_id\
            WHERE l.lecture_name LIKE ?\
              AND u.name LIKE ?\
              AND (ul.evaluation IS NOT NULL OR ul.evaluation_score IS NOT NULL);',
            [lecture_name, name],
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

module.exports.getUserLecture = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT l.lecture_name, u.name AS professor_name,ul.evaluation,\
             ul.evaluation_score, ul.evaluation_date, l.year, l.semester\
            FROM user_lecture ul\
            JOIN lecture l ON ul.lecture_code = l.lecture_code\
            JOIN user u ON l.professor_id = u.user_id\
            WHERE ul.user_id = ?',
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

module.exports.evaluate = (user_id, lecture_code, evaluation, evaluation_score, evaluation_date) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE user_lecture\
            SET evaluation = ?,\
                evaluation_score = ?,\
                evaluation_date = ?\
            WHERE lecture_code = ?\
            AND user_id = ?',
            [evaluation, evaluation_score, evaluation_date, lecture_code, user_id],
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