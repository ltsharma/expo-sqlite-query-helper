export interface ResultRow {
    length: number;
    item: (index: number) => any;
    _array: [];
}
export interface ResultSet {
    insertId: number;
    rowAffected: number;
    rows: ResultRow;
    lastQuery?: string;
}
export interface SQLError {
    error: any;
    lastQuery: string;
}
export interface Transaction {
    executeSql(sqlStatement: string, params?: string[] | number[], success?: (transaction: Transaction, resultSet: ResultSet) => any, error?: (transaction: Transaction, error: Error) => any): void;
}
export interface InsertObject {
    [key: string]: string | null;
}
