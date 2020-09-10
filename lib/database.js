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
export const Databse = (database_name = "esqh.db", version = "1.0") => {
    databaseName = database_name;
    return SQLite.openDatabase(databaseName, version);
};
export const executeSql = (sql, arg = []) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => Databse(databaseName).transaction((tx) => {
        tx.executeSql(sql, arg, (_, { rows, rowAffected, insertId }) => resolve(rows, rowAffected, insertId), reject);
    }));
});
export const insert = (tableName, data) => __awaiter(void 0, void 0, void 0, function* () {
    const valuesQ = data
        .map((values) => Object.values(values)
        .map((val) => (val ? `'${val}'` : "null"))
        .join(","))
        .join("), (");
    const query = `insert into ${tableName} (${Object.keys(data[0]).join(",")}) values (${valuesQ});`;
    return executeSql(query, []);
});
export const update = (tableName, data, where) => __awaiter(void 0, void 0, void 0, function* () {
    const valuesQ = Object.keys(data).map((cols) => `${cols}=${data[cols] ? `'${data[cols]}'` : "null"}`);
    const query = `update ${tableName} SET ${valuesQ} WHERE ${Object.keys(where)[0]}=${Object.values(where)[0]}  ;`;
    return executeSql(query, []);
});
export const search = (tableName, param = null, order_by = null, limit = null, extra = "") => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select ${extra} * from ${tableName} ${param ? `where ${Object.keys(param)[0]}='${Object.values(param)[0]}'` : ``} ${order_by
        ? `ORDER BY ${Object.keys(order_by)[0]} ${Object.values(order_by)[0]}`
        : ""} ${limit ? `limit ${limit}` : ``} `;
    return executeSql(query, []);
});
export const createTable = (tableName, columns) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
        ${Object.keys(columns)
        .map((cols) => `${cols} ${columns[cols]}`)
        .join(",")}
    )`;
    return executeSql(query, []);
});
export const dropTable = (tableName) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DROP TABLE IF EXISTS ${tableName}`;
    return executeSql(query, []);
});
export const deleteData = (tableName, param = null, extra = "") => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DELETE FROM ${tableName} ${param ? `where ${Object.keys(param)[0]}='${Object.values(param)[0]}'` : ``}`;
    return executeSql(query, []);
});
