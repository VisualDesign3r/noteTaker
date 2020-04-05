const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;
const fs = require('fs')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'))

//html routes
app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})


//api routes
app.get('/api/notes', (req,res)=>{
    fs.readFile('./db/db.json', 'utf-8', (err,data)=>{
        res.json(data)
    })
})
app.post('/api/notes', (req,res)=>{
    fs.readFile('./db/db.json', 'utf-8', (err,data)=>{
        let collection = JSON.parse(data);
        let id = collection.length;
        collection.push({...req.body, id:id})
        fs.writeFile('./db/db.json', JSON.stringify(collection), err=>{
        if(err) throw err;
        res.send('good!')
    })
    })
})

app.delete('/api/notes/:id', (req,res)=>{
    fs.readFile('./db/db.json', 'utf-8', (err,data)=>{
        let collection = JSON.parse(data);
        let id = req.params.id;
        let newCol = collection.filter(item=> item.id != id);
        fs.writeFile('./db/db.json', JSON.stringify(newCol), err=>{
        if(err) throw err;
        res.send('good!')
    })
    })
})

app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, ()=>{
    console.log('app is running on port '+PORT)
})