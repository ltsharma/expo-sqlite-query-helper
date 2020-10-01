# `expo-sqlite` Query Helper 🦮

SQLite query helper library for expo-sqlite

# Installation

#### Yarn

`yarn add expo-sqlite-query-helper`

#### NPM

`npm install --save expo-sqlite-query-helper`

# Usage

```javascript
import { useEffect } from 'react';
import Database, { createTable, insert } from 'expo-sqlite-query-helper';

const App = () => {
    Database('myDatabase.db');
    useEffect(() => {
        createTable('user', {
            name: 'TEXT',
            email: 'TEXT'
        }).then((row, rowAffected, insertID) =>
            console.log('success', row, rowAffected, insertID)
        );
        insert([{ name: 'Jhon', email: 'jhon@test.com' }], 'user')
            .then((row, rowAffected, insertID) => {
                console.log('success', row, rowAffected, insertID);
            })
            .catch((e) => console.log(e));
    }, []);
};
```

# API

## Initialize

```typescript
import Database from "expo-sqlite-query-helper";

Database(databaseName:string, version:string);
```

`databaseName` (String) - Name of the database to create. Default is `"esqh.db"`. </br>
Reference: [`expo-sql`'s `SQLite.openDatabase`](https://docs.expo.io/versions/latest/sdk/sqlite/#sqliteopendatabasename-version-description-size)

## Create Table

Async function to create new table.</br> _under the hood it runs `CREATE TABLE IF NOT EXIST`_.

```javascript
import { createTable } from 'expo-sqlite-query-helper';
```

```typescript
createTable(tableName: string, columns: { [key: string]: string });
```

`tableName` - Name of the table to create.  
`columns` - Column object, key is name of column, value is type & other arguments for columns (as per sqlite).

### Example

```javascript
await createTable('user', {
    name: 'varchar(100) NOT NULL',
    email: 'varchar(100) NULL'
});
// Creates a table with name 'user' with columns 'name' with varchar type & 'email' with varchar type
```

## Insert

Async function to run insert data into the table, Takes array of objects to insert into specified table.</br> _under the hood it runs `INSERT INTO table (...columns{keys}) values ...(columns{values});`_

```javascript
import { insert } from 'expo-sqlite-query-helper';
```

```typescript
insert(table: string, data: InsertObject[]);
```

`tableName` - Name of the table to insert data.  
`data` - array of objects to insert into table.</br> example: `[{name:"test1",email:"test1@emmail.com"},{name:"test2",email:"test2@exmail.com"}]`.</br> Return promise resolving with
`rowsAffected, insertId, lastQuery`

### Example

```javascript
await insert('user', { name: 'test', email: 'test@tester.com' });
//Inserts a row into 'user' table with column 'name' with 'test' & 'email' with 'test@tester.com'
```

## Search (Select)

Async function to search specified parameter or select everything from the given table. </br> _under the hood it runs `SELECT * FROM tableName ?WHERE param{key}=param{value};`_

```javascript
import { search } from 'expo-sqlite-query-helper';
```

```typescript
search (
  tableName: string,
  param: InsertObject | null ,
  order_by: InsertObject | null,
  limit: number | null ,
  extra: string = ""
);
```

`tableName` - Name of the table to search.  
`param: {column:value}` - objects to search.</br> example: `{name:"test1"}`</br>
`order_by : {column:"ASC"|"DESC"}` - object to order the search result. </br> example: `{id:"DESC"}`
`limit` - Number of records to return.</br>
`extra` - Extra SQL query if any, It will be printed just after SELECT commmand.

Return promise resolving with
`rows`, `rowsAffected`, `insertId`

### Example

```javascript
const result = await search('user', { name: 'test' });
// Returns rows from table 'user' where it matches column 'name' with value 'test'
```

## Update

Async function to run update data in the table, Takes an objects to update into specified table & coulumn.

_under the hood it runs `UPDATE table SET (...data{keys}) values(...data{values}) WHERE where{key}=where{value};`_

```javascript
import { update } from 'expo-sqlite-query-helper';
```

```typescript
update(
    tableName: string,
    data: InsertObject,
    where: { [key: string]: string }
)
```

`tableName` - Name of the table to insert data.  
`data` - An objects to Update into table.</br> example: `[{name:"test1",email:"test1@emmail.com"},{name:"test2",email:"test2@exmail.com"}]`.</br>
`where` - Object with key as column name & value as value to search in Where clause.</br> example: `{name:"test1"}`.

</br> Return promise resolving with
`rowsAffected, insertId, lastQuery`

### Example

```javascript
await update(
    'user',
    { name: 'test1', email: 'test1@tester.com' },
    { name: 'test' }
);
// Updates a row matches with column 'name' have value 'test' with column 'name' with 'test1' & column 'email' with 'test1@tester.com'
```

## Delete Data

Async function to run delete data from the table, Takes table name and object to delete perticular row.

**Note:** If we pass only table name, it will delete complete data from the mentioned table

_under the hood it runs `DELETE FROM table WHERE param{key}=param{value}`_

```javascript
import { deleteData } from 'expo-sqlite-query-helper';
```

```typescript
update(
    tableName: string,
    param: { [key: string]: string },
    extra: string
)
```

`tableName` - Name of the table to insert data.  
`param` - Object with key as column name & value. Matching row will be deleted.</br> example: `{name:"test1"}`.

</br> Return promise resolving with
`rowsAffected, insertId, lastQuery`

### Example

```javascript
await deleteData('user', { name: 'test' }); // Deletes rows matches with column 'name' have value 'test'
await deleteData('user'); // Deletes all rows from 'user' table
```

## Drop Table

Async function to Drop a table from database. It takes a table name as arg.

_under the hood it runs `DROP TABLE IF EXISTS table`_.

```javascript
import { dropTable } from 'expo-sqlite-query-helper';
```

```typescript
dropTable(tableName: string);
```

`tableName` - Name of the table to drop.

### Example

```javascript
await dropTable('user'); // Drops table name 'user' from database.
```

## Execute Sql

Async function to run any raw string query. it takes query string & arg as arg.

```javascript
import { executeSql } from 'expo-sqlite-query-helper';
```

```typescript
executeSql(query: string, arg:string[]);
```

`query` - SQL Query string.</br>
`arg` - Optional arguiment to pass to value of query.

### Example

```javascript
await executeSql('SELECT * FROM user WHERE name=?', ['tester']);
// Selects all rows from 'user' where column 'name' have value 'tester'.
```

---

Todo

-   [ ] More parameters & conditions for where clause
-   [ ] to add `Update if exist or Insert` function
