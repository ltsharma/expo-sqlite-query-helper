import * as SQLite from "expo-sqlite";
import { ResultRow, Transaction, ResultSet, InsertObject } from "./Types";

const Databse = (
  database_name: string = "test1.db",
  version: string = "1.0"
) => {
  return SQLite.openDatabase(database_name, version);
};

const executeSql = async (sql: string, arg: string[] | number[] = []) => {
  return new Promise(
    (resolve: (arg: ResultRow) => void, reject: (arg: any) => void) =>
      Databse().transaction((tx: Transaction) => {
        tx.executeSql(
          sql,
          arg,
          (_, { rows }: ResultSet) => resolve(rows),
          reject
        );
      })
  );
};

const insert = async (data: InsertObject[], table: string) => {
  const valuesQ = data
    .map((values) =>
      Object.values(values)
        .map((val: string | null) => (val ? `'${val}'` : "null"))
        .join(",")
    )
    .join("), (");
  const query = `insert into ${table} (${Object.keys(data[0]).join(
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
  param: string | null = null,
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
