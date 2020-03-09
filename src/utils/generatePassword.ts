// import { generate } from 'generate-password'
import { Uu } from 'pollenium-uvaursi'

export function generatePassword(): Uu {
  return Uu.genRandom(2)
  // const passwordUtf8 = generate({
  //   length: 64,
  //   numbers: true,
  //   lowercase: true,
  //   uppercase: true,
  //   symbols: true,
  //   excludeSimilarCharacters: false,
  //   strict: false
  // })
  // return Uu.fromUtf8(passwordUtf8)
}
