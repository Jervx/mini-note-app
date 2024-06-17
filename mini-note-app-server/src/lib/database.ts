import { createPool } from "mysql2";

const { MYSQL_HOST, MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD} = process.env;

const dbPool = createPool({
    host : MYSQL_HOST,
    database : MYSQL_DB, 
    user : MYSQL_USER,
    password : MYSQL_PASSWORD,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
})

export { dbPool };
