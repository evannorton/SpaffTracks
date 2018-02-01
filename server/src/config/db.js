import { createPool } from 'mysql';
import { callbackify } from 'util';

let pool = createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'DatabaseName'
});

function rows(procedureName, args) {
    return callProcedure(procedureName, args)
    .then((resultsets) => {
        return resultsets[0];
    });
}

function row(procedureName, args) {
    return callProcedure(procedureName, args)
    .then((resultsets) => {
        return resultsets[0][0];
    });
}

function empty(procedureName, args) {
    return callProcedure(procedureName, args)
    .then(() => {
        return;
    });
}

function callProcedure(procedureName, args) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                let placeholders = '';
                if (args && args.length > 0) {
                    for (let i = 0; i < args.length; i++) {
                        if (i === args.length - 1) { // if we are on the last argument in the array
                            placeholders += '?';
                        } else {
                            placeholders += '?,';
                        }
                    }
                }
                let callString = 'CALL ' + procedureName + '(' + placeholders + ');'; // CALL GetChirps();, or CALL InsertChirp(?,?,?);
                connection.query(callString, args, (err, resultsets) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}

export { pool, row, rows, empty };