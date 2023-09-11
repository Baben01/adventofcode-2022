import fs from 'fs'
import { parse } from 'path'

type Monkey = {
  id: string
  items: number[]
  operation: (n: number) => number
  test: (n: number) => string
  nbInspectedItems: number
}
const simulateMonkeyBusiness = (monkeys: Monkey[], rounds: number, reliefDivider: number, commonModulo: number) => {
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach(m => {
      while (m.items.length > 0) {
        let _item = m.items.shift()
        _item = Math.floor(m.operation(_item) / reliefDivider) % commonModulo
        const idMonkeyToSend = m.test(_item)
        const indexMonkey = monkeys.findIndex(_m => _m.id === idMonkeyToSend)
        monkeys[indexMonkey].items.push(_item)
        m.nbInspectedItems++
      }
    })
  }
}

const question1 = (monkeys: Monkey[], commonModulo: number) => {
  simulateMonkeyBusiness(monkeys, 20, 3, commonModulo)
  return monkeys.map(_ => _.nbInspectedItems).sort((a, b) => b - a).slice(0, 2).reduce((sum, c) => sum * c)
}

const question2 = (monkeys: Monkey[], commonModulo: number) => {
  simulateMonkeyBusiness(monkeys, 10_000, 1, commonModulo)
  return monkeys.map(_ => _.nbInspectedItems).sort((a, b) => b - a).slice(0, 2).reduce((sum, c) => sum * c)
}

const parseOperation = (str: string) => {
  const operation = str.split('=')[1]
  const isPlus = operation.includes('+')
  const operand = operation.split(isPlus ? '+' : '*').map(_ => _.trim())
  return (n: number) => {
    const left = operand[0] === 'old' ? n : parseInt(operand[0])
    const right = operand[1] === 'old' ? n : parseInt(operand[1])
    return isPlus ? left + right : left * right
  }
}

const parseTest = (str: string, trueStr: string, falseStr: string) => {
  const trueMonkey = trueStr.split(' ')[trueStr.split(' ').length - 1]
  const falseMonkey = falseStr.split(' ')[falseStr.split(' ').length - 1]
  return (n: number) => {
    const divisible = parseInt(str.split(' ')[str.split(' ').length - 1])
    const test = n % divisible === 0
    return test ? trueMonkey : falseMonkey
  }
}

const parseMonkeyDataString = (str: string): Monkey[] => {
  const _monkeys = []
  str.split('\n\n').forEach((monkeyStr) => {
    const instruction = monkeyStr.split('\n')
    const _monkey = {
      id: instruction[0].split(' ')[1].replace(':', ''),
      items: instruction[1].split(':')[1].split(',').map(s => parseInt(s.trim())),
      operation: parseOperation(instruction[2].split(':')[1]),
      test: parseTest(instruction[3], instruction[4], instruction[5]),
      nbInspectedItems: 0
    }
    _monkeys.push(_monkey)
  })
  return _monkeys
}

fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const monkeys = parseMonkeyDataString(dataString)
  const commonModulo = dataString.split('\n\n').reduce((mod, str) => {
    return mod * parseInt(str.split('\n')[3].trim().split(' ')[3])
  }, 1)
  // console.log(question1(monkeys,commonModulo))
  console.log(question2(monkeys, commonModulo))
})