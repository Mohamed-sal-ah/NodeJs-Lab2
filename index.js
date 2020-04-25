// * Endast VG Labb2
const express = require('express')
const port = 3000
const app = express()

// importerar moduler från data.js filen 
const dataBase = require('./data')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/',dataBase.jsonData)

// Sätter in get och post för todo
app.get('/todo',dataBase.showAllData)
app.post('/todo/add',dataBase.createTodo);
app.post('/todo/delete',dataBase.deleteTodo);
app.post('/todo/edit',dataBase.editUpdateTodo)


app.listen(port,() => {
    console.log(`Server online in port ${port}`)
})
