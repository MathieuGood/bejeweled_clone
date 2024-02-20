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
                    
                    You went down from #${previousRank} to ${currentRank}.

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

    // console.log(emailToSend)
    // console.log(player_email, player_name)
    // console.log(emailToSend.Messages[0].To[0])

    return emailToSend
}



function buildRecapEmail(player_email, player_name, play_time, last_games) {

    console.log("Play time in buildRecapEmail : " + play_time)

    let scoresHTMLContent = ''
    let scoresTextContent = ''
    let playTimeHTMLContent = ''
    let playTimeTextContent = ''

    console.log("Player email in buildRecapEmail : " + player_email)

    // Format last games from Date object to string
    last_games.forEach((game) => {
        const formattedDate = new Date(game.end_time).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        // Format seconds to hours, minutes and seconds format
        const playTimeHours = Math.floor(play_time / 3600)
        const playTimeMinutes = Math.floor((play_time % 3600) / 60)
        const playTimeSeconds = play_time % 60
        
        let formattedPlayTime = playTimeSeconds + ' seconds'
        // Only display hours and minutes if they are not 0
        if (playTimeHours > 0) {
            formattedPlayTime = playTimeHours + ' hours, ' + playTimeMinutes + ' minutes and ' + formattedPlayTime
        } else if (playTimeMinutes > 0) {
            formattedPlayTime = playTimeMinutes + ' minutes and ' + formattedPlayTime
        }

        scoresHTMLContent += '<tr><td>' + formattedDate + '</td><td>' + game.score + '</td><tr>'
        scoresTextContent += formattedDate + ' || ' + game.score + ' points\n'
        // TO CONTINUE :
        playTimeTextContent = 'You spent ' + formattedPlayTime + ' seconds playing the game.'
        playTimeHTMLContent = '<p>' + playTimeTextContent + '</p>'

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
                    playTimeHTMLContent +

                    `See you soon 👋
                    
                    Bejeweled Clone Team`,
                HTMLPart:
                    `<p>Dear ${player_name},</p>` +
                    `<p>Thank you for playing Bejeweled Clone 💎</p>` +
                    `<p>Here is a recap of your last games :</p>` +
                    `<table><thead><tr><th>Date and time</th><th>Score</th></tr></thead>` +
                    `<tbody>` +
                    scoresHTMLContent +
                    `</tbody></table><br>` +
                    playTimeTextContent +
                    `<p>See you soon 👋<p>` +
                    `<p>Bejeweled Clone team</p>`
            }
        ]
    }

    return emailToSend
}


module.exports = { buildRankingUpdateEmail, buildRecapEmail };
