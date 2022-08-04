const express = require('express');
const fileHandler = require('fs');
const helmet = require("helmet");
const cors = require('cors');
const path = require("path");
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Create CORS Proxy Server
app.get('/', (req, res) => {
    fetch(`https://itunes.apple.com/search?term=${req.query.term}&media=${req.query.media}`)
        .then(r => r.json())
        .then(data => {
            res.send(data)
        })
})

// Object handling
let rawData = fileHandler.readFileSync('./favorites.json')
let convertedData = JSON.parse(rawData)

// Post Request
app.post('/favorites', (req, res) => {

    let allFav = false

    for (let i = 0; i < convertedData.length; i++) {
        if (convertedData[i].id === req.body.id) {
            allFav = true
            break
        }
    }

    if (!allFav) {
        convertedData.push(req.body)
        // // Update the array
        fileHandler.writeFile('./favorites.json', JSON.stringify(convertedData), (err) => {
            if (err) throw err;
            res.send(JSON.stringify(convertedData));
        });
    } else {
        console.log('Item already exists in favorites list')
    }

})

// Get Request
app.get('/favorites', (req, res) => {
    if (!convertedData) res.send('File not found. First post to create file.');
    else res.send(convertedData);
})

// Delete Request
app.delete('/favorites', (req, res) => {

    // Find the object
    const deletedItem = convertedData.find(del => del.id === parseInt(req.body.id))

    // Delete the object
    const index = convertedData.indexOf(deletedItem);
    convertedData.splice(index, 1);

    // Update the array with deleted object
    fileHandler.writeFile('./favorites.json', JSON.stringify(convertedData), (err) => {
        if (err) throw err;
        res.send('Project deleted!');
    });
})

// Deployment
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1, 'frontend/build')));
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname1,
        'frontend', 'build','index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running successfully')
    })
}

// Listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});