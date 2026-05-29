const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const path = require('path'); 
app.use(express.static(path.join(__dirname, '..')))
app.use(cors());
app.use(express.json())
const port = 4000;

const db = new sqlite3.Database('./cat_cafe.db', (err) =>{
    if(err){
        console.error("Error connecting to the database: ", err.message)
    }
    else{
        console.log("Connected to the DB succesfully")
    }
})

app.get("/menu_items/:name", (req, res) =>{
    const name = req.params.name

    db.get(
        "SELECT image FROM menu WHERE item = ?",
        name,
        function(err, row){
            if(err){
                res.status(500).json(err)
            }
            else if(!row){
                res.status(404).json({ error: "Item not found" })
            }
            else{
                res.json(row)
            }
        }
    )
})

app.get("/daily_menu/:day", (req, res) => {
    const day = req.params.day

    db.all(
        "SELECT item FROM menu WHERE day = ?",
        day,
        function(err, rows){
            if(err){
                res.status(500).json(err)
            }
            else if(!rows || rows.length === 0){
                res.status(404).json({ error: "No items found" })
            }
            else{
                res.json(rows)
            }
        }
    )
})

app.get("/cats/:id", (req, res) =>{
    const cat_id = req.params.id
    db.get(
        "SELECT name, description, image FROM cats WHERE id = ?", 
        cat_id, 
        function(err, row){
            if(err){
                res.status(500).json(err)
            }
            else if(!row){
                res.status(404).json({ error: "No items found" })
            }
            else{
                res.json(row)
            }
        }
    )
})

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
})