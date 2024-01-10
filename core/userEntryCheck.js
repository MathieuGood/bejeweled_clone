/////////////////////////////////////////////////////////////////////////////////////
//
// userEntryCheck utils
//
/////////////////////////////////////////////////////////////////////////////////////


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