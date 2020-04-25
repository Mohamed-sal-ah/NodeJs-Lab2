const mysql = require('mysql')

// connectar till databasen todo_db
const connection = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'me',
    password: '123456',
    database: 'todo_db'
})

// gör en connection till databasen
/* connection.connect((err) => {
    if (err) throw err;
}); */

// Skriver ut json från todo tabellen från databasen
const jsonData = (req, res) => {
    connection.query('SELECT * FROM todo', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows)
    });
}

const showAllData = (req, res) => {
    // Skriver ut lista från todo tabellen
    connection.query('SELECT * FROM todo', function (err, rows, fields) {
        if (err) throw err;
        // renderar tabellen i todo.ejs filen
        res.render('todo.ejs', { todo_list: rows })
    });
}

const createTodo = (req, res) => {
    const todo_text = req.body.new_todo;

    // TODO: sanity check

    // Skapar en ny rad i todo tabellen
    connection.query(`INSERT INTO todo (todo_text,created_date) VALUES ('${todo_text}', now());`, (error) => {
        if (error) {
            throw error
        }
        console.log(`Added "${todo_text}" to the list`)
        // Redirect till todo
        res.redirect('/todo')
    })
}

const editUpdateTodo = (req, res) => {
    const new_text = req.body.edit_id[0];
    const id_num = req.body.edit_id[1];
    // Updaterar raden i todo tabellen
    connection.query(`UPDATE todo SET todo_text = '${new_text}' WHERE id = ${parseInt(id_num)}`, (error) => {
        if (error) {
            throw error
        }
        console.log(`Edited todo with id ${id_num} with new text "${new_text}"`)
        // Redirect till todo
        res.redirect('/todo')
    })
}

const deleteTodo = (req, res) => {
    const delID = req.body.del_id
    // tar bort raden från tabelen
    connection.query(`DELETE FROM todo WHERE id=${parseInt(delID)}`, (error) => {
        if (error) {
            throw error
        }
        console.log(`Removed todo with id ${delID} from the list`)
        // Redirect till todo
        res.redirect('/todo')
    })
}

module.exports = { jsonData, showAllData, createTodo, deleteTodo, editUpdateTodo }