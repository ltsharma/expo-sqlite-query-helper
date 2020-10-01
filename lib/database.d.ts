import { ResultSet, InsertObject } from './Types';
export declare const Databse: (database_name?: string, version?: string) => any;
export declare const executeSql: (sql: string, arg?: string[] | number[]) => Promise<ResultSet>;
export declare const insert: (tableName: string, data: InsertObject[]) => Promise<ResultSet>;
export declare const update: (tableName: string, data: InsertObject, where: {
    [key: string]: string;
}) => Promise<ResultSet>;
export declare const search: (tableName: string, param?: InsertObject | null, order_by?: InsertObject | null, limit?: number | null, extra?: string) => Promise<ResultSet>;
export declare const createTable: (tableName: string, columns: InsertObject) => Promise<ResultSet>;
export declare const dropTable: (tableName: string) => Promise<ResultSet>;
export declare const deleteData: (tableName: string, param?: InsertObject | null, extra?: string) => Promise<ResultSet>;
