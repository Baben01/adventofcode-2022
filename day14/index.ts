import fs from 'fs'

type Position = {
  x: number
  y: number
}

const lineToPositionArray = (line: string): Position[] => {
  return line.split(' ').filter(s => s !== '->').map(s => ({
    x: parseInt(s.split(',')[0]),
    y: parseInt(s.split(',')[1])
  }))
}

const findBoundaries = (input: string[]): { start: Position, end: Position } => {
  const allPosition: Position[] = input.flatMap(i => {
    return lineToPositionArray(i)
  })


  return {
    start: {
      x: Math.min(...allPosition.map(p => p.x)),
      y: 0
    },
    end: {
      x: Math.max(...allPosition.map(p => p.x)),
      y: Math.max(...allPosition.map(p => p.y))
    }
  }
}


  fs.readFile('./input.txt', (err, data) => {
    const inputs = data.toLocaleString().split('\n')
    const bounds = findBoundaries(inputs)
  })