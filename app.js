const express = require('express')
const app = express();
const PORT = process.env.PORT || 3005
const data = require('./src/data/data.json')

// handling routes
const  projectRouter = express.Router()
// terminal tools
const chalk = require('chalk')
const debug = require('debug')('app')
const morgan = require('morgan')
app.use(morgan('tiny'))

// locating the static files
const path = require('path')
app.use('/static', express.static(path.join(__dirname, '/public/'))) 

//  identifying and locating the pug files
app.set('views', "./src/views")
app.set('view engine', 'pug')

// this is the home page
app.get("/", (req, res)=>{
    res.render('index', {
        data
    })
})
//  rendering the about page
app.get("/about", (req,res)=>{
    res.render('about')
})

// // routes for different projects
// projectRouter.route('/')
//     .get((req,res)=>{
//         res.render('project')
//     })

// this creates a single route for each project
projectRouter.route('/:id').get((req,res)=>{
    const id = req.params.id;
    res.render('project', {
        project: data.projects[id]
    })
})
app.use('/project', projectRouter)



app.listen(3005, ()=>{
    debug(`Listening to port ${chalk.blue(PORT)}`)
   })