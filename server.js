const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs');
//Using middleware
app.use(express.static(__dirname + '/public'));

// Keeping logs
app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url} `

    console.log(log);
    fs.appendFile('server.log',log + '\n', (error) => {
        if(error) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

/**app.use((req,res,next) => {
    res.render('maintainance.hbs');
        
});
**/

// To use javascript functions
hbs.registerHelper('getCurrentYear' , () =>{

    return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

//Making request
app.get('/', (req,res) =>{

    //res.send('<h1>Hi Express</h1>');
    /** res.send({
        name : 'Bhawna Bawa',
        likes : [
            'Singing',
            'Dancing',
            'Coding'

        ]
    });
**/
res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMessage : 'Welcome to the page'
 
});

}); 


app.get('/about', (req , res) =>{

    res.render('about.hbs',{
        pageTitle : 'About the page',
        
    });

} );

app.get('/bad', (req, res) =>{

    res.send({
        status : 'Unable to connnect',
        statusCode : 200
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        projectTitle : 'My Projects',
        welcomeMessage : 'Here are all the projects'
    });
});
app.listen(port, () =>{

    console.log(`Server is up on port ${port}`);
});

