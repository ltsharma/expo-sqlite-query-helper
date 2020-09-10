import * as SQLite from "expo-sqlite";
import { ResultRow, Transaction, ResultSet, InsertObject } from "./Types";
let databaseName = "";
const Databse = (
  database_name: string = "esqh.db",
  version: string = "1.0"
) => {
  databaseName = database_name;
  return SQLite.openDatabase(databaseName, version);
};

const executeSql = async (sql: string, arg: string[] | number[] = []) => {
  return new Promise(
    (
      resolve: (arg: ResultRow, arg2: number, arg3: number) => void,
      reject: (arg: any) => void
    ) =>
      Databse().transaction((tx: Transaction) => {
        tx.executeSql(
          sql,
          arg,
          (_, { rows, rowAffected, insertId }: ResultSet) =>
            resolve(rows, rowAffected, insertId),
          reject
        );
      })
  );
};

const insert = async (tableName: string, data: InsertObject[]) => {
  const valuesQ = data
    .map((values) =>
      Object.values(values)
        .map((val: string | null) => (val ? `'${val}'` : "null"))
        .join(",")
    )
    .join("), (");
  const query = `insert into ${tableName} (${Object.keys(data[0]).join(
    ","
  )}) values (${valuesQ});`;
  return executeSql(query, []);
};

const update = async (
  data: InsertObject,
  table: string,
  where: { [key: string]: string }
) => {
  const valuesQ = Object.keys(data).map(
    (cols) => `${cols}=${data[cols] ? `'${data[cols]}'` : "null"}`
  );
  const query = `update ${table} SET ${valuesQ} WHERE ${
    Object.keys(where)[0]
  }=${Object.values(where)[0]}  ;`;
  return executeSql(query, []);
};

const search = async (
  param: InsertObject | null = null,
  table: string,
  limit: number | null = null
) => {
  const query = `select * from ${table} ${
    param ? `where ${Object.keys(param)[0]}='${Object.values(param)[0]}'` : ``
  } ${limit ? `limit ${limit}` : ``} `;
  return executeSql(query, []);
};

const createTable = async (tableName: string, columns: InsertObject) => {
  const query = `CREATE TABLE IF NOT EXIST ${tableName} (
        ${Object.keys(columns)
          .map((cols) => `${cols} ${columns[cols]}`)
          .join(",")}
    )`;
  return executeSql(query, []);
};

export default Databse;
export { executeSql, insert, update, search, createTable };
