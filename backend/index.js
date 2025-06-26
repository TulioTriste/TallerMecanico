import app from './src/app.js';
import {connectToDatabase} from './src/bd.js';

const db = await connectToDatabase();
app.listen(3000);
console.log("Server on port", 3000);

/*
const [rows, fields] = await db.execute('SELECT * FROM usuarios');
console.log(rows);
*/