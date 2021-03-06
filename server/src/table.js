import { executeQuery, generatePlaceholders } from './config/db';

class Table {
    constructor(tableName) {
        if (!tableName) {
            throw new TypeError('You must pass a MySQL table name into the Table object constructor.');
        }
        this.tableName = tableName;
    }

    getYears() {
        return executeQuery('CALL getYears');
    }

    getShows() {
        return executeQuery('SELECT * FROM shows');
    }

    getShowsByYear(year) {
        return executeQuery(`CALL getShowsByYear(${year})`);
    }

    getNextShow(date) {
        return executeQuery(`CALL getNextShow("${date}")`);
    }

    getPreviousShow(date) {
        return executeQuery(`CALL getPreviousShow("${date}")`);
    }

    getTracks() {
        return executeQuery('SELECT * FROM tracks');
    }

    getTracksByShow(date) {
        return executeQuery(`CALL getTracksByShow('${date}')`);
    }

}

export default Table;