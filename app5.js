let express = require('express');
let app = express();
let bodyParser= require('body-parser'); //used to parse the payload of the incoming POST requests

let viewsPath = __dirname + '/views'


let db =[]; //contains list of tasks

//configure the Express app to handle the engine
app.engine('html',require('ejs').renderFile);
app.set('view engine');

app.use(express.static('css'))
app.use(express.static('images'))

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get('/',function(req,res){
    res.sendFile(viewsPath + '/index.html');
});

app.get('/addtask', function(req,res){
    res.sendFile(viewsPath+"/addtask.html");
});

app.post('/addnewtask',function(req,res){
    console.log(req.body);
    db.push(req.body);
    res.render(viewsPath+"/alltask.html",{
        tasks:
        db
    });
});

app.get('/alltask', function(req,res){
    console.log("Homepage Request");
    res.render(viewsPath+ "/alltask.html",{
        tasks: db
    });
});


app.listen(8080);