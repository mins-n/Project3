const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '43.202.44.199',
    user: 'root',
    password: '1234',
    port: '57132',
    database: 'ManageSys',
});

module.exports.getUser = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT * FROM user\
            WHERE user_id = ?', user_id,
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

module.exports.updateUser = (user_id, email, phone_num, password, profile) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'UPDATE user\
            SET password = ?,\
                phone_num = ?,\
                email = ?,\
                profile = ?\
            WHERE user_id = ?', 
            [password, phone_num, email, profile, user_id],
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
            'SELECT u.name, d.department_name, u.phone_num, u.email, d.department_name, u.academic_info AS spot, u.profile\
            FROM user u\
            JOIN department d ON u.department_code = d.department_code\
            WHERE u.user_class = 1\
              AND u.name LIKE ?', name,
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

module.exports.getScore = (user_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT l.lecture_code, l.lecture_name, l.lecture_class,\
             l.credit, u.name, ul.grade, d.department_name\
            FROM user_lecture ul\
            JOIN lecture l ON ul.lecture_code = l.lecture_code\
            JOIN user u ON l.professor_id = u.user_id\
            JOIN department d ON l.department_code = d.department_code\
            WHERE ul.user_id = ?', user_id,
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
            'SELECT u.name, d.department_name, u.phone_num,\
             u.email, u.academic_info AS spot, u.profile\
            FROM adviser a\
            JOIN user u ON a.professor_id = u.user_id\
            JOIN department d ON u.department_code = d.department_code\
            WHERE a.student_id = ?', user_id,
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