const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '43.202.44.199',
    user: 'root',
    password: '1234',
    port: '55369',
    database: 'ManageSys',
});

module.exports.getUser = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT u.*, d.department_name FROM user u INNER JOIN department d\
            ON u.department_code = d.department_code\
            WHERE user_id = ?',
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

module.exports.updateUser = (user_id, email, phone_num, password) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE user\
            SET password = ?,\
                phone_num = ?,\
                email = ?\
            WHERE user_id = ?',
            [password, phone_num, email, user_id],
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

module.exports.getProfessor = (name) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT u.name, d.department_name, u.phone_num, u.email, d.department_name, u.academic_info AS spot, u.profile, u.lab, u.major\
            FROM user u\
            JOIN department d ON u.department_code = d.department_code\
            WHERE u.user_class = 1\
              AND u.name LIKE ?',
            name,
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

module.exports.getScore = (user_id, year, semester) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT l.lecture_code, l.lecture_name, l.lecture_class,\
             l.credit, u.name, ul.grade, d.department_name\
            FROM user_lecture ul\
            JOIN lecture l ON ul.lecture_code = l.lecture_code\
            JOIN user u ON l.professor_id = u.user_id\
            JOIN department d ON l.department_code = d.department_code\
            WHERE ul.user_id = ? AND l.year = ? AND l.semester = ?',
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

module.exports.getScoreAvg = (user_id, year, semester) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT ROUND(AVG(ul.grade), 2) AS average_grade\
            FROM user_lecture ul\
            JOIN lecture l ON ul.lecture_code = l.lecture_code\
            WHERE ul.user_id = ? AND l.year = ? AND l.semester = ?\
            ',
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

module.exports.getMajorScoreAvg = (user_id, year, semester) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT ROUND(AVG(ul.grade), 2) AS average_grade\
            FROM user_lecture ul\
            JOIN lecture l ON ul.lecture_code = l.lecture_code\
            WHERE ul.user_id = ? AND l.year = ? AND l.semester = ?\
            AND l.lecture_class LIKE ?',
            [user_id, year, semester, '전%'],
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

module.exports.getGeScoreAvg = (user_id, year, semester) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT ROUND(AVG(ul.grade), 2) AS average_grade\
            FROM user_lecture ul\
            JOIN lecture l ON ul.lecture_code = l.lecture_code\
            WHERE ul.user_id = ? AND l.year = ? AND l.semester = ?\
            AND l.lecture_class LIKE ?',
            [user_id, year, semester, '교%'],
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

module.exports.getAdviser = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT u.name, d.department_name, u.phone_num, u.email, d.department_name, u.academic_info AS spot, u.profile, u.lab, u.major\
            FROM adviser a\
            JOIN user u ON a.professor_id = u.user_id\
            JOIN department d ON u.department_code = d.department_code\
            WHERE a.student_id = ?',
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

module.exports.getScholarship = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT s.year, s.semester, s.name AS scholarship_name, \
            s.price, d.department_name, u.name, u.academic_info, u.grade, u.semester\
            FROM scholarship s\
            JOIN user u ON s.user_id = u.user_id\
            JOIN department d ON u.department_code = d.department_code\
            WHERE s.user_id = ?\
            ORDER BY s.year DESC, s.semester DESC',
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

module.exports.getLecture = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT s.year, s.semester, s.name AS scholarship_name, \
            s.price, d.department_name, u.name, u.academic_info, u.grade, u.semester\
            FROM scholarship s\
            JOIN user u ON s.user_id = u.user_id\
            JOIN department d ON u.department_code = d.department_code\
            WHERE s.user_id = ?',
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

module.exports.getLecture = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT lecture_code, lecture_name, lecture_class, lecture_week1, \
            lecture_time1, lecture_week2, lecture_time2, professor_id, year, semester\
            FROM lecture\
            WHERE professor_id = ?',
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

module.exports.getLecture2 = (user_id, year, semester) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT lecture_code, lecture_name, lecture_class, lecture_week1, \
            lecture_time1, lecture_week2, lecture_time2, professor_id, year, semester\
            FROM lecture\
            WHERE professor_id = ? AND year = ? AND semester = ?',
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

module.exports.getStudent = (lecture_code) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT u.user_id, u.name, ul.grade\
            FROM user_lecture ul\
            JOIN user u ON ul.user_id = u.user_id\
            WHERE ul.lecture_code = ?',
            lecture_code,
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

module.exports.setScore = (user_id, lecture_code, grade) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE user_lecture\
            SET grade = ?\
            WHERE user_id = ? AND lecture_code = ?',
            [grade, user_id, lecture_code],
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
