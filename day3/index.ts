import fs from 'fs'
const findCommonLetterBetween2String = (s1: string, s2: string) => {
  for (let i = 0; i < s1.length; i++) {
    if (s2.includes(s1.charAt(i))) {
      return s1.charAt(i)
    }
  }
}

const findCommonLetterBetweenStrings = (strings: string[]) => {
  strings.sort((a, b) => a.length - b.length)
  const observableString = strings.splice(0, 1)[0]
  for (let i = 0; i < observableString.length; i++) {
    if (strings.every(s => s.includes(observableString.charAt(i)))) {
      return observableString.charAt(i)
    }
  }
}

const calculValueLetter = (sCode: number) => {
  return (sCode - 96 < 0 ? (sCode - 64) + 26 : sCode - 96)
}
const question1 = (stacks: string[]) => {
  return stacks.reduce((sum, stack) => {
    const compartiment1 = stack.substring(0, stack.length / 2)
    const compartiment2 = stack.substring(stack.length / 2)
    const commonLetter = findCommonLetterBetween2String(compartiment1, compartiment2)
    const commonLetterCode = commonLetter.charCodeAt(0)
    return sum + calculValueLetter(commonLetterCode)
  }, 0)
}

const question2 = (stacks: string[]) => {
  const stacksByGroup: string[][] = []
  for (let i = 0; i < stacks.length - 2; i += 3) stacksByGroup.push([stacks[i], stacks[i + 1], stacks[i + 2]])
  return stacksByGroup.reduce((sum, group) => {
    const commonLetter = findCommonLetterBetweenStrings(group)
    return sum + calculValueLetter(commonLetter.charCodeAt(0))
  }, 0)
}
fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const stacks = dataString.split('\n')
  // console.log(question1(stacks))
  console.log(question2(stacks))
})