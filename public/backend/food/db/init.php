<?php
const DB_PATH = 'food.db';

function init_db($write = false)
{
    if (!file_exists(DB_PATH)) {
        $db = new SQLite3(DB_PATH);
        $table_create_query = "CREATE TABLE food(token TEXT NOT NULL UNIQUE, email TEXT NOT NULL, name TEXT, day TEXT, food TEXT)";
        $db->exec($table_create_query);
        $db->close();
    }

    if ($write === true) {
        $db = new SQLite3(DB_PATH, SQLITE3_OPEN_READWRITE);
    } else {
        $db = new SQLite3(DB_PATH, SQLITE3_OPEN_READONLY);
    }
    return $db;
}
