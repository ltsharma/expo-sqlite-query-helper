# `expo-sqlite` Query Helper 🦮

SQLite query helper library for expo-sqlite

# Installation

#### Yarn

`yarn add expo-sqlite-query-helper`

#### NPM

`npm install --save expo-sqlite-query-helper`

# Usage

```javascript
import { useEffect } from "react";
import Database, { createTable, insert } from "expo-sqlite-query-helper";

const App = () => {
  const db = Database("myDatabase.db");

  useEffect(() => {
    createTable("user", {
      name: "TEXT",
      email: "TEXT",
    }).then((row, rowAffected, insertID) =>
      console.log("success", row, rowAffected, insertID)
    );
    insert([{ name: "Jhon", email: "jhon@test.com" }], "user")
      .then((row, rowAffected, insertID) => {
        console.log("success", row, rowAffected, insertID);
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
import { createTable } from "expo-sqlite-query-helper";
```

```typescript
createTable(tableName: string, columns: { [key: string]: string });
```

`tableName` - Name of the table to create.  
`columns` - Column object, key is name of column, value is type & other arguments for columns (as per sqlite).

## Insert

Async function to run insert data into the table, Takes array of objects to insert into specified table.</br> _under the hood it runs `INSERT INTO table (...columns) values(...values1), (...values2);`_

```javascript
import { insert } from "expo-sqlite-query-helper";
```

```typescript
insert(table: string, data: InsertObject[]);
```

`tableName` - Name of the table to insert data.  
`data` - array of objects to insert into table.</br> example: `[{name:"test1",email:"test1@emmail.com"},{name:"test2",email:"test2@exmail.com"}]`.</br> Return promise resolving with
`rowsAffected, insertId`

## Search (Select)

Async function to search specified parameter or select everything from the given table. </br> _under the hood it runs `SELECT * FROM tableName ?WHERE param{key}=param{value};`_

```javascript
import { search } from "expo-sqlite-query-helper";
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
