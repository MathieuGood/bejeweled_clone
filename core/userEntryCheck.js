/////////////////////////////////////////////////////////////////////////////////////
//
// userEntryCheck utils
//
/////////////////////////////////////////////////////////////////////////////////////


import { Alert } from 'react-native'
import { checkCredentials } from '../core/apiRequests'
import { addPlayer, checkIfEmailDoesNotExist } from '../core/apiRequests'
import { generateHash, hashPassword } from './passwordHasher'


// Check if a string is not empty
export const checkIfStringIsNotEmpty = (string) => {
    console.log("--- checkIfStringIsNotEmpty function")
    console.log("> String to check : ", string)
    if (string.length > 0) {
        console.log('> Result : true')
        return true
    } else {
        console.log('> Result : false')
        return false
    }
}



// Check if a name has at least 1 character that is a letter
export const checkNameFormat = (name) => {
    // Checking if the email is not empty
    if (checkIfStringIsNotEmpty(name)) {
        console.log("--- checkNameFormat function")
        console.log("> Name to check : ", name)
        const re = /^[A-Za-z].*$/
        console.log('Name format is : ' + re.test(name))
        return re.test(name)
    }
}



// Check if an email has a valid format
export const checkEmailFormat = (email) => {
    // Checking if the email is not empty
    if (checkIfStringIsNotEmpty(email)) {
        console.log("--- checkEmailFormat function")
        console.log("> Email to check : ", email)
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        console.log('Email format is : ' + re.test(email))
        return re.test(email)
    }
}



// Check if password has at least 6 characters and no space
export const checkPasswordFormat = (password) => {
    if (checkIfStringIsNotEmpty(password)) {
        console.log('--- checkPassword format function')
        console.log('> Password to check : ' + password)
        const re = /^[^\s]{6,}$/
        console.log('Password format is : ' + re.test(password))
        return re.test(password)
    }
}



// Check if email and password match the entry in the database
export const checkEmailAndPasswordMatch = (email, password, navigation, changeModalVisible) => {

    if (
        checkIfStringIsNotEmpty(email) &&
        checkIfStringIsNotEmpty(password) &&
        checkEmailFormat(email) &&
        checkPasswordFormat(password)
    ) {
        // Hash the password and send the API request to check the credentials
        hashPassword(password).then((hashedPassword) => {
            checkCredentials(email, hashedPassword, navigation, changeModalVisible)
        })

    } else {
        console.log('E-mail or password wrong')
        Alert.alert(
            'Error',
            'E-mail or password are incorrect',
            [{ text: 'OK' }],
            { cancelable: false }
        )
    }
}


// Show alert to confirm logout
export const confirmLogout = (navigation) => {
    Alert.alert(
        'Log out',
        'Are you sure you want to log out?',
        [
            { text: 'Cancel' },
            { text: 'Log out', onPress: () => navigation.navigate('HomeScreen') }
        ],
        { cancelable: false }
    )
}


// Check if name, email and password have right format and add player to database
export const checkUserEntryAndAddPlayer = (name, email, password, navigation, changeModalVisible) => {
    // Check if entered e-mail does not already exist in the database
    checkIfEmailDoesNotExist(email, () => {
        // Initalize errorMessage to empty string
        let errorMessage = ''

        // Run all entry check functions and feed errorMessage string if the return is false
        checkEmailFormat(email) ? errorMessage += '' : errorMessage += 'Wrong e-mail format.\n'
        checkPasswordFormat(password) ? errorMessage += '' : errorMessage += 'Wrong password format, it must contain at least 6 characters and no space.\n'
        checkNameFormat(name) ? errorMessage += '' : errorMessage += 'Wrong name format, it must contain at least one letter.\n'

        // If errorMessage is empty and all the checks went well
        if (errorMessage === '') {
            // Execute addPlayer() that sends API call to create new player in database
            // and navigate to HomeScreen
            console.log('Adding player')

            // Hash the password and add the player to the database
            hashPassword(password).then((hashedPassword) => {
                addPlayer(name.trim(), email, hashedPassword, navigation)
                changeModalVisible(false)
            })
        } else {
            Alert.alert(
                'Invalid entry',
                // Remove last line break in error message
                errorMessage.slice(0, -2),
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            );
        }
    })

}