import app from './src/app.js';

app.listen(3000, '0.0.0.0', () => {
    console.log("Server is running on port 3000");
});

/*
const [rows, fields] = await db.execute('SELECT * FROM usuarios');
console.log(rows);
*/