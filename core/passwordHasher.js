/////////////////////////////////////////////////////////////////////////////////////
//
// passwordHasher util
//
/////////////////////////////////////////////////////////////////////////////////////

import * as Crypto from 'expo-crypto'

export const hashPassword = async (password) => {
  try {
    // Hash the password using SHA-256 algorithm
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    )
    return hashedPassword
  } catch (error) {
    console.error('Error hashing password:', error)
    // Handle error
    return null
  }
}

