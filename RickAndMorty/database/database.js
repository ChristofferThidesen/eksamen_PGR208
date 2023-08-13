// database.js
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'mydatabase.db';
const database_version = '1.0';
const database_displayname = 'My Database';
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size,
);

export default db;

// Character model
export const createCharacterTable = async () => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      status TEXT,
      species TEXT,
      gender TEXT,
      image TEXT
    );
  `);
};

export const insertCharacter = async (name, status, species, gender, image) => {
  await db.executeSql(
    `INSERT INTO characters (name, status, species, gender, image)
     VALUES (?, ?, ?, ?, ?);`,
    [name, status, species, gender, image],
  );
};

export const getAllCharacters = async () => {
  const [results] = await db.executeSql('SELECT * FROM characters;');
  return results.rows.raw();
};

// Episode model
export const createEpisodeTable = async () => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS episodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      episodeNumber TEXT NOT NULL,
      name TEXT,
      airDate TEXT
    );
  `);
};

export const insertEpisode = async (episodeNumber, name, airDate) => {
  await db.executeSql(
    `INSERT INTO episodes (episodeNumber, name, airDate)
     VALUES (?, ?, ?);`,
    [episodeNumber, name, airDate],
  );
};

export const getAllEpisodes = async () => {
  const [results] = await db.executeSql('SELECT * FROM episodes;');
  return results.rows.raw();
};
