const Mailjet = require('node-mailjet')


sendUpdatesToAllPlayers()

// getRankingDifferences()



function sendUpdatesToAllPlayers() {

    return fetch(`http://mathieubon.com:3001/playerlist`, {
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
            console.error(error)
            return null
        });
}



function getRankingDifferences() {

    return fetch(`http://mathieubon.com:3001/rankdiff`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(json => {
            // Get the list of all unique player IDs in the databse
            if (json) {
                console.log(json)
                // For each player in the database
                json.forEach((ranking) => {
                    // Run function to send recap by e-mail if last played game has ended for an hour at least
                    console.log(ranking)
                    if (ranking.rank > ranking.prev_rank) {
                        console.log(`>>>>>>${ranking.player_name} was rank #${ranking.prev_rank}, now he is rank #${ranking.rank} `)
                        const email = buildRankingUpdateEmail(ranking.player_email, ranking.player_name, [{ prev: ranking.prev_rank, current: ranking.rank }])
                        sendMail(email)
                    }
                })
                // return json

            } else {
                console.log('File empty or no return from API call')
                return null
            }
        })
        .catch(error => {
            console.error(error)
            return null
        });
}



function buildRankingUpdateEmail(player_email, player_name, apiResponseResults) {

    const previousRank = apiResponseResults[0].prev
    const currentRank = apiResponseResults[0].current

    const emailToSend = {
        Messages: [
            {
                From: {
                    Email: "mathieu.bon@uha.fr",
                    Name: "Bejeweled Clone"
                },
                To: [
                    {
                        Email: player_email,
                        Name: player_name
                    }
                ],
                Subject: "Bejeweled Clone 💎 You went down in the rankings!",
                TextPart:
                    `Dear ${player_name},
                    
                    You went down from #${previousRank} to #${currentRank}.

                    Come play again to reclaim your spot!

                    See you soon 👋
                    
                    Bejeweled Clone Team`,

                HTMLPart:
                    `<p>Dear ${player_name},</p>` +
                    `<p>You went down from #${previousRank} to #${currentRank}.</p>` +
                    `<p>Come play again to reclaim your spot!</p>` +
                    `<p>See you soon 👋<p>` +
                    `<p>Bejeweled Clone team</p>`
            }
        ]
    }
    
    console.log(emailToSend)
    console.log(player_email, player_name)
    console.log(emailToSend.Messages[0].To[0])
    return emailToSend
}


function buildRecapEmail(player_email, player_name, apiResponseResults) {

    let scoresHTMLContent = ''
    let scoresTextContent = ''
    apiResponseResults.forEach((game) => {
        const formattedDate = new Date(game.end_time).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        scoresHTMLContent += '<tr><td>' + formattedDate + '</td><td>' + game.score + '</td><tr>'
        scoresTextContent += formattedDate + ' || ' + game.score + ' points\n'

    })

    const emailToSend = {
        Messages: [
            {
                From: {
                    Email: "mathieu.bon@uha.fr",
                    Name: "Bejeweled Clone"
                },
                To: [
                    {
                        Email: player_email,
                        Name: player_name
                    }
                ],
                Subject: "Bejeweled Clone 💎 Last games recap",
                TextPart:
                    `Dear ${player_name},
                    
                    Thank you for playing Bejeweled Clone 💎
                    
                    Here is a recap of your last games :` +

                    scoresTextContent +

                    `See you soon 👋
                    
                    Bejeweled Clone Team`,
                HTMLPart:
                    `<p>Dear ${player_name},</p>` +
                    `<p>Thank you for playing Bejeweled Clone 💎</p>` +
                    `<p>Here is a recap of your last games :</p>` +
                    `<table><thead><tr><th>Date and time</th><th>Score</th></tr></thead>` +
                    `<tbody>` +
                    scoresHTMLContent +
                    `</tbody></table>` +
                    `<p>See you soon 👋<p>` +
                    `<p>Bejeweled Clone team</p>`
            }
        ]
    }

    return emailToSend
}

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
        console.log(err.statusCode)
    })

}



function getLastGames(player_id) {
    return fetch(`http://mathieubon.com:3001/lastgames/${player_id}`, {
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
            console.error(error)
            return null
        });
}



function updateLastGameId(player_id, last_game_id) {

    const bodyData = {
        player_id: player_id,
        last_game_id: last_game_id
    }

    return fetch(`http://mathieubon.com:3001/updatelastgame`, {
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
            console.error(error)
            return null
        });
}



function sendRecapEmailIfTimeReached(player_id) {
    // Get all the last games for one player
    getLastGames(player_id)
        .then(result => {
            // Print last games
            // console.log(result)
            if (result != false) {

                // console.log(result)

                // Get current datetime
                let now = new Date()
                // Get end_time of last game played
                let end_time = new Date(result[result.length - 1]['end_time'])
                // Add one hour to the end_time of last game played
                end_time.setTime(end_time.getTime() + 60 * 60 * 1000)

                // console.log('END : ' + end_time)
                // console.log('NOW : ' + now)

                // If it is time to notify the user
                if (end_time < now) {

                    const player_email = result[result.length - 1]['player_email']
                    const player_name = result[result.length - 1]['player_name']

                    // Send e-mail
                    console.log('SEND E-MAIL NOW to ' + player_email)
                    const email = buildRecapEmail(player_email, player_name, result)
                    sendMail(email)


                    //
                    // IMPORTANT !!!!!!!!!!!!!
                    // TO REACTIVATE !!!!!!!!!
                    //
                    // Update last_game_id in player table
                    // const last_game_id = result[result.length - 1]['game_id']
                    // updateLastGameId(player_id, last_game_id)
                    // console.log('-> Update last_game_id in player table')


                } else {
                    // Print how many minutes to wait in console
                    let waitTime = new Date(end_time - now)
                    waitTime = waitTime.getUTCMinutes()
                    console.log('DO NOT SEND E-MAIL NOW to ' + email)
                    console.log('-> Minutes to wait before sending : ' + waitTime)
                }

            } else {
                console.log('NOTHING TO SEND to player ID ' + player_id)
            }
        })
        .catch(error => {
            console.error(error);
        })
}


