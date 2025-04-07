require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views'); // ✅ Add this line
app.use(express.static(__dirname + '/public'));

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubapi.com/crm/v3/objects/contacts?properties=firstname,lastname,email&limit=20'
;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
      
        console.log('✅ HubSpot response:', data); // <-- Add this
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });
      } catch (error) {
        console.error('❌ Error fetching contacts:', error.response?.data || error.message);
        res.status(500).send('Something went wrong');
      }
});

app.get('/', (req, res) => {
  res.render('homepage', { title: 'Welcome!' });
});


app.listen(3000, () => console.log('Listening on http://localhost:3000'));
