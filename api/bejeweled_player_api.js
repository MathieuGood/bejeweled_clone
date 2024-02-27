const express = require('express')
const mysql = require('mysql2')
const fs = require('fs');
const https = require('https');



/////////////////////////////////////////////////////////////////////////////////////
//
// MySQL database connection 
//
/////////////////////////////////////////////////////////////////////////////////////


const db = mysql.createConnection({
    host: 'localhost',
    user: 'guru',
    password: 'mojitoaimebienkasumi',
    database: 'bejeweledClone'
})


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        // If no connection, retry after 2 seconds
        setTimeout(handleDisconnect, 2000);
    }
    console.log('Bejeweled Clone Player API')
    console.log('Connected to MySQL database')
});


// When error code encoutered, try to connect again to database calling handleDisconnect()
db.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect()
    } else {
        throw err;
    }
});


function handleDisconnect() {
    db = mysql.createConnection(db.config)
    db.connect(handleDisconnect)
    db.on('error', handleDisconnect)
}




/////////////////////////////////////////////////////////////////////////////////////
//
// Express
//
/////////////////////////////////////////////////////////////////////////////////////

const app = express()
const port = 3001

app.use(express.json())






// Load SSL certificate and key
const options = {
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('fullchain.pem')
};

// Start HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});



/////////////////////////////////////////////////////////////////////////////////////
//
// Routes
//
/////////////////////////////////////////////////////////////////////////////////////


// Welcome message
app.get('/', (req, res) => res.json('Bejeweled Clone Player API'))



// Check if user e-mail already exists
app.post('/checkemail', (req, res) => {
    const { player_email } = req.body
    db.query('SELECT COUNT(player_id) FROM players WHERE player_email = ?', [player_email],
        (err, result) => {
            if (err) throw err
            if (result[0]['COUNT(player_id)'] === 0) {
                res.json(true)
            } else {
                res.json(false)
            }
        })
})
// Test /checkemail route
// curl -X POST -H "Content-Type: application/json" -d '{"player_email": "john.doe@example.com"}' http://mathieubon.com:3001/checkemail



// Add user
app.post('/addplayer', (req, res) => {
    const { player_name, player_email, player_password } = req.body
    db.query('INSERT INTO players (player_name, player_email, player_password) VALUES (?, ?, ?)',
        [player_name, player_email, player_password],
        (err, result) => {
            if (err) throw err
            res.json({ message: 'User added successfuly', id: result.insertId })
        })
})
// Test /adduser route
// curl -X POST -H "Content-Type: application/json" -d '{"player_name": "John Doe", "player_email": "john.doe@example.com", "player_password": "securepassword"}' http://mathieubon.com:3001/adduser



// Check login validity
// Return player_id if valid, false if not
app.post('/checklogin', (req, res) => {
    const { player_email, player_password } = req.body
    console.log(req.body)
    db.query('SELECT COUNT(player_id), player_id, player_name FROM players WHERE player_email = ? AND player_password = ?', [player_email, player_password],
        (err, result) => {
            if (err) throw err
            if (result[0]['COUNT(player_id)'] === 1) {
                res.json({
                    "player_id": result[0]['player_id'],
                    "player_name": result[0]['player_name']
                })
            } else {
                res.json(false)
            }
        })
})
// Test /checklogin route
// curl -X POST -H "Content-Type: application/json" -d '{"player_email":"bon.mathieu@gmail.com", "player_password":"mathieubon"}' http://mathieubon.com:3001/checklogin



// Update password
app.post('/updatepassword', (req, res) => {
    const { player_email, new_password } = req.body
    db.query('UPDATE players SET player_password = ? WHERE player_email = ?', [new_password, player_email],
        (err, result) => {
            if (err) throw err
            res.json('Password updated for ' + player_email)
        })
})
// Test /updatepassword route
// curl -X POST -H "Content-Type: application/json" -d '{"player_email":"bon.mathieu@gmail.com", "new_password":"newpassword"}' http://mathieubon.com:3001/updatepassword



// Get top 6 scores
app.get('/highscores', (req, res) => {
    db.query('CALL getRanking()',
        (err, results) => {
            if (err) throw err
            res.json(results[0])
        })
})
// Test /topscores
// curl -X GET "http://mathieubon.com:3001/highscores"



// Add new score
app.post('/addscore', (req, res) => {
    const { player_id, score, duration, end_time } = req.body
    db.query('INSERT INTO games (player_id, score, duration, end_time) VALUES (?, ?, ?, ?)',
        [player_id, score, duration, end_time],
        (err, result) => {
            if (err) throw err
            res.json({ message: 'Score added successfuly', id: result.insertId })
        })
})
// Test /addscore route
// curl -X POST -H "Content-Type: application/json" -d '{"player_id": "1", "score": "6666", "duration": "666", "end_time": "1999-01-01 12:00:00"}' http://mathieubon.com:3001/addscore



// Get all players IDs
app.get('/playerlist', (req, res) => {
    db.query('SELECT player_id FROM players', (err, results) => {
        if (err) throw err
        res.json(results)
    })
})
// Test /countplayers
// curl -X GET 'http://mathieubon.com:3001/playerlist'



// Get last played games by player_id
app.get('/lastgames/:player_id', (req, res) => {
    const { player_id } = req.params
    db.query('CALL getLastGames(?)',
        [player_id], (err, results) => {
            if (err) throw err
            res.json(results[0])
        })
})
// Test /lastgames/player_id
// curl -X GET "http://mathieubon.com:3001/lastgames/1"



// Get total play time in seconds by player_id
app.get('/playtime/:player_id', (req, res) => {
    const { player_id } = req.params
    db.query('SELECT SUM(duration) AS play_time FROM games WHERE games.player_id = ?;',
        [player_id], (err, results) => {
            if (err) throw err
            res.json(results[0])
        })
})
// Test /lastgames/player_id
// curl -X GET "http://mathieubon.com:3001/playtime/1"



// Update last_game_id based on player_id
app.post('/updatelastgame', (req, res) => {
    const { player_id, last_game_id } = req.body
    db.query('UPDATE players SET last_game_id = ? WHERE player_id = ?', [last_game_id, player_id],
        (err, result) => {
            if (err) throw err
            res.json('Last game updated to ' + last_game_id + ' for player #' + player_id)
        })
})
// Test /updatelastgame route
// curl -X POST -H "Content-Type: application/json" -d '{"player_id":"1", "last_game_id":"4"}' http://mathieubon.com:3001/updatelastgame



// Update prev_rank

app.get('/updateranking', (req, res) => {
    db.query('CALL updatePrevRanking()',
        (err, results) => {
            if (err) throw err
            res.json(results)
        })
})
// Test /updaterank
// curl -X GET 'http://mathieubon.com:3001/updaterank'



// Get ranking differences between prev_rank and rank
app.get('/rankdiff', (req, res) => {
    db.query('CALL getRankingDifference()',
        (err, results) => {
            if (err) throw err
            res.json(results[0])
        })
})
// Test /rankdiff
// curl -X GET 'http://mathieubon.com:3001/rankdiff'



// Add image to database as BLOB to table custom_images with player_id
app.post('/addimage', (req, res) => {
    const { player_id, image } = req.body
    const imageBuffer = Buffer.from(image, 'base64')
    db.query('INSERT INTO custom_images (player_id, image) VALUES (?, ?)',
        [player_id, imageBuffer],
        (err, result) => {
            if (err) throw err
            res.json({ message: 'Image added successfuly', id: result.insertId })
        })
})


///////////// UNUSED FOR NOW


// Get player by email
app.get('/players/:email', (req, res) => {
    const { email } = req.params
    db.query('SELECT * FROM players WHERE player_email = "bon.mathieu@gmail.com"', [player_email], (err, results) => {
        if (err) throw err
        res.json(results)
    })
})