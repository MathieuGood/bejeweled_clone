const { buildRankingUpdateEmail, buildRecapEmail } = require('./emailBuilder');
const Mailjet = require('node-mailjet')



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// RUN ON SCRIPT LAUNCH
//
////////////////////////////////////////////////////////////////////////////////////////////////////

sendGameRecapToAllPlayers()

sendRankingDifferences()



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Send a recap e-mail to all the players whose last game has ended for an hour at least
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function sendGameRecapToAllPlayers() {

    return fetch(`https://mathieubon.com:3001/playerlist`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            // Get the list of all unique player IDs in the databse
            if (json) {
                // console.log(json)
                // For each player in the database
                json.forEach((player) => {
                    // Run function to send recap by e-mail if last played game has ended for an hour at least
                    sendRecapEmailIfTimeReached(player.player_id)
                })
                // return json

            } else {
                console.log('No players in the database')
                return null
            }
        })
        .catch(error => {
            console.error('ERROR in endGameRecapToAllPlayers : ' + error)
            return null
        });
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Call stored procedure in database to update previous rankings
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function updateRankingInDatabase() {

    return fetch(`https://mathieubon.com:3001/updateranking`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            // Update ranking in database
            if (json) {
                console.log("PREV_RANK updated in database")
            } else {
                console.log('File empty or no return from API call')
                return null
            }
        })
        .catch(error => {
            console.error('ERROR in updateRankingInDatabase : ' + error)
            return null
        });
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Send e-mail to players that have been losing ranks in top 6
//
////////////////////////////////////////////////////////////////////////////////////////////////////

// function sendRankingDifferences() {

//     return fetch(`https://mathieubon.com:3001/rankdiff`, {
//         method: 'GET',
//         headers: { "Content-Type": "application/json" }
//     })
//         .then(response => response.json())
//         .then(json => {
//             // Get the response for ranking difference
//             if (json) {
//                 console.log(json)
//                 // For each player in the database
//                 json.forEach((ranking) => {
//                     // Run function to send recap by e-mail if last played game has ended for an hour at least
//                     // console.log(ranking)
//                     let rank = 'unranked'
//                     // If player has been losing ranks
//                     if (ranking.rank > ranking.prev_rank || ranking.rank === null) {
//                         if (ranking.rank !== null) {
//                             rank = `#${ranking.rank}`
//                         }
//                         console.log(`>>>>>>${ranking.player_name} was rank #${ranking.prev_rank}, now he is ${rank} `)
//                         console.log('SEND E-MAIL NOW to ' + ranking.player_email)
//                         const email = buildRankingUpdateEmail(ranking.player_email, ranking.player_name, [{ prev: ranking.prev_rank, current: rank }])
//                         sendMail(email)
//                     }
//                 })

//                 // When all e-mails are sent, updates prev_rank in in players table
//                 updateRankingInDatabase()

//             } else {
//                 console.log('File empty or no return from API call')
//                 return null
//             }
//         })
//         .catch(error => {
//             console.error('Error in sendRankingDifferences : ' + error)
//             return null
//         });
// }



function sendRankingDifferences() {
    // Fetch ranking differences
    return fetch(`https://mathieubon.com:3001/rankdiff`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            if (json) {
                // Fetch highscores
                return fetch(`https://mathieubon.com:3001/highscores`, {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                })
                    .then(response => response.json())
                    .then(highscores => {
                        console.log(json)
                        console.log(highscores)
                        // Process ranking differences
                        json.forEach((ranking) => {
                            let rank = 'unranked';
                            if (ranking.rank > ranking.prev_rank || ranking.rank === null) {
                                if (ranking.rank !== null) {
                                    rank = `#${ranking.rank}`;
                                }
                                console.log(`>>>>>>${ranking.player_name} was rank #${ranking.prev_rank}, now he is ${rank}`);
                                console.log('SEND E-MAIL NOW to ' + ranking.player_email);
                                // Build email with highscores included
                                const email = buildRankingUpdateEmail(ranking.player_email, ranking.player_name, [{ prev: ranking.prev_rank, current: rank }], highscores)
                                sendMail(email);
                            }
                        });
                        // When all e-mails are sent, update prev_rank in players table
                        updateRankingInDatabase();
                    });
            } else {
                console.log('File empty or no return from API call');
                return null;
            }
        })
        .catch(error => {
            console.error('Error in sendRankingDifferences : ' + error);
            return null;
        });
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Update players table with last game ID played for a specific player
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function updateLastGameId(player_id, last_game_id) {

    const bodyData = {
        player_id: player_id,
        last_game_id: last_game_id
    }

    return fetch(`https://mathieubon.com:3001/updatelastgame`, {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            if (json) {
                console.log('Updated last_game_id for player ' + player_id, json);
            } else {
                console.log('Could not add last_game_id to player ' + player_id)
            }
        })
        .catch(error => {
            console.error('Error in updateLastGameId : ' + error)
            return null
        });
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Retrieve last games played (games with game_id greather than last_game_id)
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function getLastGames(player_id) {
    return fetch(`https://mathieubon.com:3001/lastgames/${player_id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            if (json) {
                return json
            } else {
                console.log('No last games')
                return null
            }
        })
        .catch(error => {
            console.error('Error in getLastGames :' + error)
            return null
        });
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Retrieve total play time for a specific player
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function getPlayTime(player_id) {
    return fetch(`https://mathieubon.com:3001/playtime/${player_id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            if (json) {
                // console.log('Play time : ' + json['play_time'])
                return json
            } else {
                console.log('No duration data.')
                return null
            }
        })
        .catch(error => {
            console.error('Error in getPlayTime : ' + error)
            return null
        });
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Send recap e-mail to one specific player with detail of last games and total play time
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function sendRecapEmailIfTimeReached(player_id) {
    // Wait until the queries have been executed to get last games and total play time
    Promise.all([
        getLastGames(player_id),
        getPlayTime(player_id)])
        .then(([last_games, play_time]) => {
            // If there are last games (not empty array)
            if (last_games != false) {
                let now = new Date()
                // Set end_time as time of last game + 1 hour
                let end_time = new Date(last_games[last_games.length - 1]['end_time'])
                end_time.setTime(end_time.getTime() + 60 * 60 * 1000)

                // Check if last game has been played for at least one hour
                if (end_time < now) {
                    console.log('Last games : ' + ' for player ID ' + player_id)
                    console.log(last_games)
                    const player_email = last_games[last_games.length - 1]['player_email']
                    const player_name = last_games[last_games.length - 1]['player_name']
                    const player_time = play_time['play_time']

                    // Build e-mail to send providing e-mail, name, total play time and last games
                    console.log('SEND RECAP E-MAIL NOW to ' + player_email)
                    const email = buildRecapEmail(player_email, player_name, player_time, last_games)

                    // Send the e-mail
                    sendMail(email)

                    const last_game_id = last_games[last_games.length - 1]['game_id']
                    updateLastGameId(player_id, last_game_id)
                    console.log('-> Update last_game_id in player table')
                } else {
                    // For debugging purpose only
                    // If it is not time to send the e-mail, display time to wait before it can be seny
                    let waitTime = new Date(end_time - now)
                    waitTime = waitTime.getUTCMinutes()
                    console.log('DO NOT SEND E-MAIL NOW to ' + last_games[last_games.length - 1]['player_name'])
                    console.log('-> Minutes to wait before sending : ' + waitTime)
                }
            } else {
                // There are no last games to process
                console.log('NOTHING TO SEND to player ID ' + player_id)
            }
        })
        .catch(error => {
            console.error('Error in sendRecapEmailIfTimeReached for player_id ' + player_id + ': ' + error)
        });
}



////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Send e-mail using Mailjet service API
//
////////////////////////////////////////////////////////////////////////////////////////////////////

function sendMail(emailToSend) {

    const mailjet = Mailjet.apiConnect(
        // API Key
        'abe539777eedf22676deaf4d3643a0a9',
        // Secret Key
        '125ff23dba0087e2a32070553111bca5')

    const player_name = emailToSend.Messages[0].To[0].Name
    const player_email = emailToSend.Messages[0].To[0].Email

    const sendMailjet = mailjet
        .post('send', { version: 'v3.1' })
        .request(emailToSend)

    sendMailjet.then((result) => {
        console.log('Sending e-mail to ' + player_name + ' at ' + player_email + ' with subject ' + emailToSend.Messages[0].Subject)
        // console.log(result.body)
    }).catch((err) => {
        console.log('Error in sendMail' + err)
    })

}
