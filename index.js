const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const accessToken = process.env.TOKEN;
//route 1: homepage
app.get('/', async (req, res) => {
    const airDefSystems = 'https://api.hubspot.com/crm/v3/objects/2-143983893?limit=10&properties=name,range,description&archived=false';
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(airDefSystems, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'Air Defense Systems | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

//route 2: update form
app.get('/update-cobj', async (req, res) => {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };    
    try {
        res.render('updates', {title: "Update Custom Object Form | Integrating With HubSpot I Practicum"});
    } catch(err) {
        console.error(err);
    }    
});                

//route 3: post
app.post('/update-cobj/', async (req, res) => {

    const postData = {
        properties: {
            "name": req.body.name,
            "range": req.body.range,
            "description": req.body.desc,
        }
    }

    //const newCobj = `https://api.hubapi.com/crm/v3/objects/air-defense-systems/`;
    const newCobj = `https://api.hubapi.com/crm/v3/objects/2-143983893/`;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }

    try { 
        console.log('1');
        await axios.post(newCobj, postData, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }

});
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
