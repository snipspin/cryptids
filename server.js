const express = require('express');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const port = 80;
const app = express();

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('static'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.get('/', (require,res)=>{
    res.render('home');
});

app.use('/dinos', require('./routes/dinos'));
app.use('/cryptids', require('./routes/cryptids'));

app.listen(port, ()=> console.log(`🎧 on port ${port}`));