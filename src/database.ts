import * as SQLite from "expo-sqlite";
import { ResultRow, Transaction, ResultSet, InsertObject } from "./Types";
let databaseName = "";
table helperexport const Databse = (
  database_name: string = "esqh.db",
  version: string = "1.0"
) => {
  databaseName = database_name;
  return SQLite.openDatabase(databaseName, version);
};

export const executeSql = async (
  sql: string,
  arg: string[] | number[] = []
) => {
  return new Promise(
    (
      resolve: (arg: ResultRow, arg2: number, arg3: number) => void,
      reject: (arg: any) => void
    ) =>
      Databse(databaseName).transaction((tx: Transaction) => {
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

export const insert = async (tableName: string, data: InsertObject[]) => {
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

export const update = async (
  tableName: string,
  data: InsertObject,
  where: { [key: string]: string }
) => {
  const valuesQ = Object.keys(data).map(
    (cols) => `${cols}=${data[cols] ? `'${data[cols]}'` : "null"}`
  );
  const query = `update ${tableName} SET ${valuesQ} WHERE ${
    Object.keys(where)[0]
  }=${Object.values(where)[0]}  ;`;
  return executeSql(query, []);
};

export const search = async (
  tableName: string,
  param: InsertObject | null = null,
  order_by: InsertObject | null = null,
  limit: number | null = null,
  extra: string = ""
) => {
  const query = `select ${extra} * from ${tableName} ${
    param ? `where ${Object.keys(param)[0]}='${Object.values(param)[0]}'` : ``
  } ${
    order_by
      ? `ORDER BY ${Object.keys(order_by)[0]} ${Object.values(order_by)[0]}`
      : ""
  } ${limit ? `limit ${limit}` : ``} `;
  return executeSql(query, []);
};

export const createTable = async (tableName: string, columns: InsertObject) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
        ${Object.keys(columns)
          .map((cols) => `${cols} ${columns[cols]}`)
          .join(",")}
    )`;
  return executeSql(query, []);
};

export const dropTable = async (tableName: string) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  return executeSql(query, []);
};

export const deleteData = async (
  tableName: string,
  param: InsertObject | null = null,
  extra: string = ""
) => {
  const query = `DELETE FROM ${tableName} ${
    param ? `where ${Object.keys(param)[0]}='${Object.values(param)[0]}'` : ``
  }`;
  return executeSql(query, []);
};
