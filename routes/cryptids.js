const express = require('express');
const router = express.Router();

const fs = require('fs');

// GET ROUTES
router.get('/', (req, res)=>{
    let allCryptids = fs.readFileSync('./cryptids.json');
    let cryptidsData = JSON.parse(allCryptids);
    res.render('cryptidViews/index', {cryptids:cryptidsData});
});

router.get('/new', (req, res)=>{
    let allCryptids = fs.readFileSync('./cryptids.json');
    let cryptidsData = JSON.parse(allCryptids);
    res.render('cryptidViews/new', {cryptids:cryptidsData});
});

router.get('/:id', (req, res)=>{
    let index = parseInt(req.params.id);    
    if (isNaN(index)) res.render('404');    
    let allCryptids = fs.readFileSync('./cryptids.json');
    let cryptidsData = JSON.parse(allCryptids);
    res.render('cryptidViews/show', {cryptid:cryptidsData[index]});
});

// POST ROUTES
router.post('/', (req,res)=>{
    let cryptids = JSON.parse(fs.readFileSync('./cryptids.json'));
    let newCryptid = {};
    newCryptid.name = req.body.name;
    newCryptid.image = req.body.image;
    cryptids.push(newCryptid);
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
    res.redirect(`/cryptids`);
});

module.exports = router;