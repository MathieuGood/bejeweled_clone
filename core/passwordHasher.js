/////////////////////////////////////////////////////////////////////////////////////
//
// passwordHasher util
//
/////////////////////////////////////////////////////////////////////////////////////

import * as Crypto from 'expo-crypto'

export const hashPassword = async (password) => {
  const start = Date.now()

  try {
    // Hash the password using SHA-256 algorithm
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
      password
    )
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
    return hashedPassword
  } catch (error) {
    console.error('Error hashing password:', error)
    // Handle error
    return null
  }



}

