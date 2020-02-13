// Mounted at /dinos
const express = require('express');
const router = express.Router();

const fs = require('fs');
//index - GET
router.get('/', (req,res)=>{
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);
    res.render('dinoViews/index', {dinos:dinoData});
});

// new - GET
router.get('/new', (req,res)=>{
    res.render('dinoViews/new');
});

// create - POST
router.post('/', (req,res)=>{
    let dinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinos);
    dinoData.push(req.body);
    let newDinos = JSON.stringify(dinoData);
    fs.writeFileSync('./dinosaurs.json', newDinos);

    console.log(`🥁`);
    console.log(req.body);
    res.redirect(`/dinos/${dinoData.length - 1}`);
});


//edit - GET
router.get('/edit/:id', (req,res)=>{
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);
    let dinoIndex = parseInt(req.params.id);
    dinoData[dinoIndex].id = dinoIndex;
    res.render('dinoViews/edit', {dino: dinoData[dinoIndex]})
});
// show - GET
router.get('/:id', (req,res)=>{
    let allDinos = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(allDinos);
    let dinoIndex = parseInt(req.params.id);
    dinoData[dinoIndex].id = dinoIndex;
    res.render('dinoViews/show', {dino: dinoData[dinoIndex]});
});
// update - PUT
router.put('/:id', (req,res)=>{
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    dinos[parseInt(req.params.id)].name = req.body.name;
    dinos[parseInt(req.params.id)].type = req.body.type
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect('/dinos');
});

// destroy - DELETE
router.delete('/:id', (req,res)=>{
    let dinos = fs.readFileSync('./dinosaurs.json');
    dinos = JSON.parse(dinos);
    dinos.splice(req.params.id, 1);
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    res.redirect('/dinos');
});

// export 
module.exports = router;