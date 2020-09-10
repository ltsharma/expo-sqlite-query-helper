import { ResultRow, InsertObject } from "./Types";
declare const Databse: (database_name?: string, version?: string) => any;
declare const executeSql: (sql: string, arg?: string[] | number[]) => Promise<ResultRow>;
declare const insert: (tableName: string, data: InsertObject[]) => Promise<ResultRow>;
declare const update: (data: InsertObject, table: string, where: {
    [key: string]: string;
}) => Promise<ResultRow>;
declare const search: (param: InsertObject | null | undefined, table: string, limit?: number | null) => Promise<ResultRow>;
declare const createTable: (tableName: string, columns: InsertObject) => Promise<ResultRow>;
export default Databse;
export { executeSql, insert, update, search, createTable };
