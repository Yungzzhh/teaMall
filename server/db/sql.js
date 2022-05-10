const mysql = require('mysql');
let connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:"012300", 
	port:"3306",
	database:'vue_store'
})
module.exports = connection;
