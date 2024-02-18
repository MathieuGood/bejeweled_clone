/////////////////////////////////////////////////////////////////////////////////////
//
// apiRequests utils
//
// Host :
// http://mathieubon.com:3001
//
/////////////////////////////////////////////////////////////////////////////////////


import { Alert } from 'react-native'


// Using /addplayer
// Create entry in database for new account
export const addPlayer = (name, email, password, navigation) => {
    console.log('START OF addPlayer FUNCTION')
    const bodyData = {
        player_name: name,
        player_email: email,
        player_password: password
    }

    fetch('http://mathieubon.com:3001/addplayer', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            if (json) {
                console.log('Player added')
                navigation.navigate('PlayerScreen', { player_id: json.id, player_name: name })
            } else {
                console.log('Incorrect data entered')
                Alert.alert(
                    'Error',
                    'Incorrect data entered',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                )
            }
        })
        .catch((error) => {
            console.error(error)
        })
}



// Using /checklogin
// Check if e-mail and password match the entry in the databse
export const checkCredentials = (email, password, navigation) => {
    const bodyData = {
        player_email: email,
        player_password: password
    }

    fetch('http://mathieubon.com:3001/checklogin', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then((json) => {
            // If credentials are valid, navigate to PlayerScreen with player_id as
            if (json) {
                console.log('Password OK')
                console.log(json)
                console.log(json.player_id, json.player_name)
                navigation.navigate('PlayerScreen', { player_id: json.player_id, player_name: json.player_name })
            } else {
                console.log('E-mail or password wrong')
                Alert.alert(
                    'Error',
                    'E-mail or password are incorrect',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                )
            }
        })
        .catch((error) => {
            console.error(error)
        })
}



// Using /checkemail
// Check if e-mail and password match the entry in the databse
export const checkIfEmailDoesNotExist = (email, callbackFunction) => {
    const bodyData = {
        player_email: email,
    }

    fetch('http://mathieubon.com:3001/checkemail', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then((json) => {
            // If credentials are valid, navigate to PlayerScreen
            if (json) {
                console.log('Email does not already exist')
                callbackFunction()
            } else {
                console.log('Email already exists')
                Alert.alert(
                    'Invalid e-mail',
                    'This e-mail address is already used',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                )
            }
        })
        .catch((error) => {
            console.error(error)
        })
}



// Using /addscore
// Create entry in database for new score
export const addScore = (player_id, score, duration, endTime,) => {
    const bodyData = {
        player_id: player_id,
        score: score,
        duration: duration,
        endTime: endTime
    }

    fetch('http://mathieubon.com:3001/addscore', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            if (json) {
                console.log('Score added for player_id ' + player_id)
            } else {
                console.log('Incorrect data entered')
                Alert.alert(
                    'Error',
                    'Incorrect data entered',
                    [
                        { text: 'OK' }
                    ],
                    { cancelable: false }
                )
            }
        })
        .catch((error) => {
            console.error(error)
        })
}



// Using /highscores
// Retrieve high scores
export const getHighScores = (setHighScores) => {
    return fetch(`http://mathieubon.com:3001/highscores/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((json) => {
            if (json) {
                console.log(json)

                json.forEach((ranking) => {
                    console.log(ranking.rank, ranking.player_name, ranking.score)
                })

                setHighScores(json)

                return json
            } else {
                console.log("No top scores")
                return null
            }
        })
        .catch((error) => {
            console.error(error)
            return null
        })
}
