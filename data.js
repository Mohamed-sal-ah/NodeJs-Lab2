

// connects to the database todo_db with user name and password
const connection = require('./connection.js')

// Makes a connection to databases
connection.getConnection((err) => {
    if (err) throw err;
});

// Prints out json from the todo table in database todo_db
const jsonData = (req, res) => {
    connection.query('SELECT * FROM todo', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows)
    });
}

const showAllData = (req, res) => {
    // Prints out list from todo table
    connection.query('SELECT * FROM todo', function (err, rows, fields) {
        if (err) throw err;
        // rendering table in todo.ejs file
        res.render('todo.ejs', { todo_list: rows })
    });
}

const createTodo = (req, res) => {
    const todo_text = req.body.new_todo;

    // TODO: sanity check

    // Creates a new row in the todo table
    connection.query(`INSERT INTO todo (todo_text,created_date) VALUES ('${todo_text}', now());`, (error) => {
        if (error) {
            throw error
        }
        console.log(`Added "${todo_text}" to the list`)
        // Redirect to todo
        res.redirect('/todo')
    })
}

const editUpdateTodo = (req, res) => {
    const new_text = req.body.edit_id[0];
    const id_num = req.body.edit_id[1];
    // Updates the row in the todo table
    connection.query(`UPDATE todo SET todo_text = '${new_text}' WHERE id = ${parseInt(id_num)}`, (error) => {
        if (error) {
            throw error
        }
        console.log(`Edited todo with id ${id_num} with new text "${new_text}"`)
        // Redirect to todo
        res.redirect('/todo')
    })
}

const deleteTodo = (req, res) => {
    const delID = req.body.del_id
    // removes the row from the table
    connection.query(`DELETE FROM todo WHERE id=${parseInt(delID)}`, (error) => {
        if (error) {
            throw error
        }
        console.log(`Removed todo with id ${delID} from the list`)
        // Redirect to todo
        res.redirect('/todo')
    })
}

module.exports = { jsonData, showAllData, createTodo, deleteTodo, editUpdateTodo }