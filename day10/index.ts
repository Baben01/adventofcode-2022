import fs from 'fs'

type CPU = {
  cycle: number,
  register: number
}

const question1 = (instructions: string[]) => {
  const CPU: CPU = {
    cycle: 1,
    register: 1
  }
  return instructions.reduce((sum, instruction) => {
    const instructionLabel = instruction.split(' ')[0]
    const instructionValue = instruction.split(' ')[1]
    const cycleNeeded = instruction.startsWith('noop') ? 1 : 2
    for (let i = 0; i < cycleNeeded; i++) {
      if (CPU.cycle % 40 === 20) {
        sum += CPU.cycle * CPU.register
      }
      CPU.cycle++
    }
    if (instructionLabel === 'addx') {
      CPU.register += parseInt(instructionValue)
    }
    return sum
  }, 0)
}

const question2 = (instructions: string[]) => {
  const CPU: CPU = {
    cycle: 1,
    register: 1
  }
  let CRT = ''
  instructions.forEach((instruction) => {
    const instructionLabel = instruction.split(' ')[0]
    const instructionValue = instruction.split(' ')[1]
    const cycleNeeded = instruction.startsWith('noop') ? 1 : 2
    for (let i = 0; i < cycleNeeded; i++) {
      if (CPU.cycle > 1 && CPU.cycle % 40 === 1) {
        console.log(CRT)
        CRT = ''
      }
      // console.log(`CYCLE ${CPU.cycle}`)
      // console.log(`DRAW CRT ON ${CRT.length}`)
      CRT += CPU.cycle % 40 >= CPU.register && CPU.cycle % 40 < CPU.register + 3 ? '#' : '.'
      // console.log(`CURRENT CRT => ${CRT}`)
      CPU.cycle++
    }
    if (instructionLabel === 'addx') {
      CPU.register += parseInt(instructionValue)
    }
  }, 0)
  console.log(CRT)
}


fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const instructions = dataString.split('\n')
  // console.log(question1(instructions))
  console.log(question2(instructions))
})