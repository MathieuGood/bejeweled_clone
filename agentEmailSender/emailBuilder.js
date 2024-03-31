function buildRankingUpdateEmail(player_email, player_name, rankings, highscores) {

    const previousRank = rankings[0].prev
    const currentRank = rankings[0].current
    let highscoresHTMLContent = ''

    highscores.forEach((result) => {
        rank = result.rank
        player = result.player_name
        score = result.score
        row = `<tr><td>${rank}</td><td>${player}</td><td>${score}</td></tr>`
        highscoresHTMLContent += row
    })

    const emailToSend = {
        Messages: [
            {
                From: {
                    Email: "bon.mathieu@gmail.com",
                    Name: "Jewels Juggle"
                },
                To: [
                    {
                        Email: player_email,
                        Name: player_name
                    }
                ],
                Subject: "Jewels Juggle 💎 You went down in the rankings!",
                TextPart:
                    `Dear ${player_name},
                    
                    You went down from #${previousRank} to ${currentRank}.

                    Come play again to reclaim your spot!

                    See you soon 👋
                    
                    Jewels Juggle Team`,

                HTMLPart:
                    `<div style="background-color: #f5f5dc; font-family: 'Georgia', serif; color: #333; width: 100%; min-height: 100vh; padding: 20px; box-sizing: border-box;">
                    <div style="background-color: #e6e2d3; border: 1px solid #d4c0a1; padding: 20px; max-width: 600px; margin: auto; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <img src="https://mathieubon.com/api/bejeweled_agentEmailSender/email-banner.png" alt="Jewels Juggle" style="max-width: 100%; height: auto; display: block; margin-bottom: 20px;">
                    <h1 style="color: #2b50c8; font-family: 'Georgia', serif;">Jewels Juggle💎</h1>
                    <p>Dear ${player_name},</p>
                    <p>You went down from <strong> #${previousRank}</strong> to <strong>${currentRank}</strong>.</p>
                    <p>Come play again to reclaim your spot!</p>
                    <table>
                    <thead><tr><th>Rank</th><th>Player</th><th>Score</th></tr></thead>
                    <tbody> ${highscoresHTMLContent} </tbody>
                    </table>
                    <p>See you soon 👋</p>
                    <p>The Jewels Juggle Team</p>
                    <div style="font-size: 14px; color: #666; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc;">
                    <p>We have sent you this email because you provided your email address during your registration for the game Jewels Juggle. Your email address will not be used for any other purpose unless you have previously opted in to receive emails from us.</p>
                    <p>Jewels Juggle Inc., Strasbourg, France</p>
                    <p>To ensure that emails from Jewels Juggle reach your inbox, please add bon.mathieu@gmail.com to your address book.</p>
                    <p>To unsubscribe, please email <a href="mailto:bon.mathieu@gmail.com" style="color: #2b50c8;">bon.mathieu@gmail.com</a></p>
                    </div>
                    </div>
                    </div>`
            }
        ]
    }

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
                    Email: "bon.mathieu@gmail.com",
                    Name: "Jewels Juggle"
                },
                To: [
                    {
                        Email: player_email,
                        Name: player_name
                    }
                ],
                Subject: "Jewels Juggle 💎 Last games recap",
                TextPart:
                    `Dear ${player_name},
                    
                    Thank you for playing Jewels Juggle 💎
                    
                    Here is a recap of your last games :` +

                    scoresTextContent +
                    playTimeHTMLContent +

                    `See you soon 👋
                    
                    Jewels Juggle Team`,
                HTMLPart:
                    '<div style="background-color: #f5f5dc; font-family: \'Georgia\', serif; color: #333; width: 100%; min-height: 100vh; padding: 20px; box-sizing: border-box;">' +
                    '<div style="background-color: #e6e2d3; border: 1px solid #d4c0a1; padding: 20px; max-width: 600px; margin: auto; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">' +
                    '<img src="https://mathieubon.com/api/bejeweled_agentEmailSender/email-banner.png" alt="banniere Jewels Juggle" style="max-width: 100%; height: auto; display: block; margin-bottom: 20px;">' +
                    '<h1 style="color: #2b50c8; font-family: \'Georgia\', serif;">Jewels Juggle💎</h1>' +
                    '<p>Dear ' + player_name + ',</p>' +
                    '<p>Thank you for playing Jewels Juggle 💎</p>' +
                    '<p>Here is a recap of your last games :</p>' +
                    '<table><thead><tr><th>Date and time</th><th>Score</th></tr></thead>' +
                    '<tbody>' +
                    scoresHTMLContent +
                    '</tbody></table><br>' +
                    playTimeTextContent +
                    '<p>See you soon 👋<p>' +
                    '<p>Jewels Juggle team</p>' +
                    '<div style="font-size: 14px; color: #666; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc;">' +
                    '<p>We have sent you this email because you provided your email address during your registration for the game Jewels Juggle. Your email address will not be used for any other purpose unless you have previously opted in to receive emails from us.</p>' +
                    '<p>Jewels Juggle Inc., Strasbourg, France</p>' +
                    '<p>To ensure that emails from Jewels Juggle reach your inbox, please add bon.mathieu@gmail.com to your address book.</p>' +
                    '<p>To unsubscribe, please email <a href="mailto:bon.mathieu@gmail.com" style="color: #2b50c8;">bon.mathieu@gmail.com</a></p>' +
                    '</div>' +
                    '</div>' +
                    '</div>'

            }
        ]
    }

    return emailToSend
}


module.exports = { buildRankingUpdateEmail, buildRecapEmail };
