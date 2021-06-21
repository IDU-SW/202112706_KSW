const Sequelize = require('sequelize');
// const mysql = require('mysql2')

// const dbConfig = {
//     host: 'localhost',
//     user: 'dev',
//     password: 'secret',
//     post: 3306,
//     database: 'idu_node_db',
//     multipleStatements: true,
// };

// const pool = mysql.createPool(dbConfig).promise();
// module.exports = pool;

const conn = new Sequelize('idu_node_db', 'root', '', {
    dialect: 'mysql',
    host: '18.191.19.14'
});

function connect() {
    conn.authenticate()
    .then(() => {
        console.log('Sequelize DB 연결 성공');
        conn.close();
    })
    .catch(err => {
        console.error('Sequelize DB 연결 실패 :', err);
    })
}

module.exports = conn;