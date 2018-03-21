import { executeQuery, generatePlaceholders } from './config/db';

class Table {
    constructor(tableName) {
        if (!tableName) {
            throw new TypeError('You must pass a MySQL table name into the Table object constructor.');
        }
        this.tableName = tableName;
    }

    getShows() {
        return executeQuery('SELECT * FROM shows');
    }

    getShowsByYear(year) {
        return executeQuery(`CALL getShowsByYear(${year})`);
    }

    getYears() {
        return executeQuery('CALL getYears');
    }
}

export default Table;