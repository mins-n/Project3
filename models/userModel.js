const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '43.202.44.199',
    user: 'root',
    password: '1234',
    port: '57132',
    database: 'ManageSys',
});

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


