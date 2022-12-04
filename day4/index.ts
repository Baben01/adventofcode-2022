import fs from 'fs'


const isFullyContains = (sections1: string, sections2: string) => {
  const borderSections1 = sections1.split('-').map(_ => parseInt(_))
  const borderSections2 = sections2.split('-').map(_ => parseInt(_))
  return (borderSections1[0] >= borderSections2[0] && borderSections1[1] <= borderSections2[1])
    || (borderSections1[0] <= borderSections2[0] && borderSections1[1] >= borderSections2[1])
}
// 2-4 4-6
const isOverlap = (sections1: string, sections2: string) => {
  const borderSections1 = sections1.split('-').map(_ => parseInt(_))
  const borderSections2 = sections2.split('-').map(_ => parseInt(_))
  return (borderSections1[1] >= borderSections2[0] && borderSections1[0] <= borderSections2[1])
    || (borderSections1[0] <= borderSections2[1] && borderSections1[1] >= borderSections2[0])
}

const question2 = (pairs: string[]) => {
  return pairs.reduce((sum, pair) => {
    const elf1 = pair.split(',')[0]
    const elf2 = pair.split(',')[1]
    return isOverlap(elf1, elf2) ? sum + 1 : sum
  }, 0)
}

const question1 = (pairs: string[]) => {
  return pairs.reduce((sum, pair) => {
    const elf1 = pair.split(',')[0]
    const elf2 = pair.split(',')[1]
    return isFullyContains(elf1, elf2) ? sum + 1 : sum
  }, 0)
}
fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const pairs = dataString.split('\n')
  // console.log(question1(pairs))
  console.log(question2(pairs))
})