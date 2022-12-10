import fs from 'fs'

const buildStacksFromCargo = (cargo: string[]) => {
  const length = parseInt(cargo.pop().split(' ').filter(s => !!s).pop())
  return cargo.reverse().reduce((stacks: string[][], current) => {
    for (let i = 0; i < current.length; i += 4) {
      const subs = current.substring(i, i + 3)
      if (subs.search(`\[[A-Z]\]`) !== -1) {
        stacks[Math.floor(i / 4)].push(subs.charAt(1))
      }
    }
    return stacks
  }, Array(length).fill([]).map(_ => []))
}

const applyInstructionsCrateMover9000 = (instructions: string[], stacks: string[][]) => {
  instructions.forEach((instructionString) => {
    const instructionSplit = instructionString.split(' ')
    const moves = parseInt(instructionSplit[1])
    const from = parseInt(instructionSplit[3])
    const to = parseInt(instructionSplit[5])
    for (let i = 0; i < moves; i++) {
      stacks[to - 1].push(stacks[from - 1].pop())
    }
  })
}

const applyInstructionsCrateMover9001 = (instructions: string[], stacks: string[][]) => {
  instructions.forEach((instructionString) => {
    const instructionSplit = instructionString.split(' ')
    const nbItemToMove = parseInt(instructionSplit[1])
    const from = parseInt(instructionSplit[3])
    const to = parseInt(instructionSplit[5])
    const itemsToMove = stacks[from - 1].splice((stacks[from - 1].length) - nbItemToMove)
    stacks[to - 1].push(...itemsToMove)
  })
}
const question2 = (inputs: string[]) => {
  const stacks: string[][] = buildStacksFromCargo(inputs[0].split('\n'))
  const instructions = inputs[1].split('\n')
  applyInstructionsCrateMover9001(instructions, stacks)
  return stacks.reduce((tops, current) => {
    return tops + current[current.length - 1]
  }, '')
}

const question1 = (inputs: string[]) => {
  const stacks: string[][] = buildStacksFromCargo(inputs[0].split('\n'))
  const instructions = inputs[1].split('\n')
  applyInstructionsCrateMover9000(instructions, stacks)
  return stacks.reduce((tops, current) => {
    return tops + current[current.length - 1]
  }, '')
}
fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const inputs = dataString.split('\n\n')
  // console.log(question1(inputs))
  console.log(question2(inputs))
})