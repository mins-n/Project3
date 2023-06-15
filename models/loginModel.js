const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '43.202.44.199',
    user: 'root',
    password: '1234',
    port: '57588',
    database: 'ManageSys',
});

module.exports.join = (datas) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT user_id FROM user WHERE user_id=?', datas[0], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                if (rows.length) {
                    reject('이미 존재하는 ID');
                } else {
                    conn.query(
                        'INSERT INTO user(user_id, password, name, phone_num, email, user_class) VALUES (?,?,?,?,?,?)',
                        datas,
                        (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve('회원가입 성공');
                            }
                        }
                    );
                }
            }
        });
    });
};

module.exports.authenticate = (schoolNumber, password, registerChoice) => {
    return new Promise((resolve, reject) => {
        console.log(schoolNumber, password, registerChoice);
        conn.query(
            'SELECT * FROM user WHERE user_id = ? AND password = ? AND user_class = ?',
            [schoolNumber, password, registerChoice],
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length) {
                        // User authenticated successfully
                        resolve(rows[0]); // Return the user object
                    } else {
                        // Authentication failed
                        reject('Invalid credentials');
                    }
                }
            }
        );
    });
};

module.exports.findId = (name, phone_num) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT user_id FROM user WHERE name = ? and phone_num = ?';
        conn.query(sql, [name, phone_num], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                if (rows.length) {
                    resolve(rows[0]);
                } else {
                    reject('존재하지 않는 사용자');
                }
            }
        });
    });
};

module.exports.findPw = (user_id, name, phone_num) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT password FROM user WHERE user_id=? and name = ? and phone_num = ?';
        conn.query(sql, [user_id, name, phone_num], (err, rows, fields) => {
            if (err) {
                reject(err);
            } else {
                if (rows.length) {
                    resolve(rows[0]);
                } else {
                    reject('존재하지 않는 사용자');
                }
            }
        });
    });
};

exports.logout = async (req, res) => {
    console.log('req 의 값은 : ', req.session);
    if (req.session.user) {
        await req.session.destroy((error) => {
            if (error) console.log(error);
        });
    }
};
