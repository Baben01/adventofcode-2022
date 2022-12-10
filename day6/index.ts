import fs from 'fs'

const question1 = (input: string) => {
  for (let i = 3; i < input.length; i++) {
    const char = [input.charAt(i - 3), input.charAt(i - 2), input.charAt(i - 1), input.charAt(i)]
    if (char.every((v, index, self) => self.indexOf(v) === index)) {
      return i + 1
    }
  }
}

const question2 = (input: string) => {
  for (let i = 13; i < input.length; i++) {
    const char = []
    for (let j = i - 13; j <= i; j++) {
      if (char.includes(input.charAt(j))) {
        continue;
      } else {
        char.push(input.charAt(j))
      }
    }
    if (char.length === 14) return i + 1
  }
}

fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  // console.log(question1(dataString))
  console.log(question2(dataString))
})