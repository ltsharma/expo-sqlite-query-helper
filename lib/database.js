var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as SQLite from "expo-sqlite";
let databaseName = "";
const Databse = (database_name = "esqh.db", version = "1.0") => {
    databaseName = database_name;
    return SQLite.openDatabase(databaseName, version);
};
const executeSql = (sql, arg = []) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => Databse().transaction((tx) => {
        tx.executeSql(sql, arg, (_, { rows }) => resolve(rows), reject);
    }));
});
const insert = (data, table) => __awaiter(void 0, void 0, void 0, function* () {
    const valuesQ = data
        .map((values) => Object.values(values)
        .map((val) => (val ? `'${val}'` : "null"))
        .join(","))
        .join("), (");
    const query = `insert into ${table} (${Object.keys(data[0]).join(",")}) values (${valuesQ});`;
    return executeSql(query, []);
});
const update = (data, table, where) => __awaiter(void 0, void 0, void 0, function* () {
    const valuesQ = Object.keys(data).map((cols) => `${cols}=${data[cols] ? `'${data[cols]}'` : "null"}`);
    const query = `update ${table} SET ${valuesQ} WHERE ${Object.keys(where)[0]}=${Object.values(where)[0]}  ;`;
    return executeSql(query, []);
});
const search = (param = null, table, limit = null) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from ${table} ${param ? `where ${Object.keys(param)[0]}='${Object.values(param)[0]}'` : ``} ${limit ? `limit ${limit}` : ``} `;
    return executeSql(query, []);
});
const createTable = (tableName, columns) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `CREATE TABLE IF NOT EXIST ${tableName} (
        ${Object.keys(columns)
        .map((cols) => `${cols} ${columns[cols]}`)
        .join(",")}
    )`;
    return executeSql(query, []);
});
export default Databse;
export { executeSql, insert, update, search, createTable };
