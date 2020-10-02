import Database, {
  createTable,
  insert,
  search,
} from "expo-sqlite-query-helper";
import { deleteData } from "expo-sqlite-query-helper/lib/database";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [dbItems,setDbItems] = useState([]);
  // Initialize Database
  Database("myDatabase.db");
  useEffect(() => {
    (async () => {
      // Create table
      const created = await createTable("user", {
        name: "varchar(50)",
        email: "varchar(100)",
      });
      console.log({ created });
      // Delete old data from table
      const deleted = await deleteData("user");
      console.log({deleted})
      // Insert a row
      const inserted = await insert("user", [
        { name: "tester", email: "test@tester.com" },
      ]); 
      console.log({ inserted });
      // Insert a rows
      const insertedMultiple = await insert("user", [
        { name: "tester1", email: "test@tester.com" },
        { name: "tester2", email: "test2@tester.com" },
      ]);
      console.log({ insertedMultiple });
      // Search perticular row
      const searched = await search("user", { name: "tester" });
      console.log({ searched });
      // Select all rows
      const searchedAll = await search("user");
      console.log({ searchedAll });

      setDbItems({seachSingle:searched,selectAll:searchedAll})
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Databse Items</Text>
      <View style={{padding:15}} >
        <Text>{JSON.stringify(dbItems)}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
