import fs from 'fs'
type Child = {
  type: 'child'
  name: string
  value: number
}

type Node = {
  type: 'dir'
  name: string
  value?: number
  children: Array<XOR<Node, Child>>
}

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

const recursiveResponse1 = (childs: Node['children']) => {
  return childs.reduce((sum, node) => {
    if (node.type === 'dir' && node.value <= 100_000) {
      sum += (node.value ?? 0)
    }
    return node.type === 'dir' ? sum + recursiveResponse1(node.children) : sum
  }, 0)
}

const question1 = (treeNode: Node) => {
  const response = treeNode.value <= 100_000 ? treeNode.value : 0
  return response + recursiveResponse1(treeNode.children)
}


const findDirSuperiorTo = (childs: Node['children'], limit: number) => {
  return childs.reduce((superiorDirs, currentNode) => {
    if (currentNode.type === 'dir' && currentNode.value >= limit) {
      superiorDirs.push(currentNode.value)
    }
    if (currentNode.type === 'dir') {
      superiorDirs.push(...findDirSuperiorTo(currentNode.children, limit))
    }
    return superiorDirs
  }, []).flat()
}
const question2 = (treeNode: Node, spaceNeeded: number) => {
  const dirSelection = []
  if (treeNode.value > spaceNeeded) dirSelection.push(treeNode.value)
  dirSelection.push(...findDirSuperiorTo(treeNode.children, spaceNeeded))
  return Math.min(...dirSelection)
}

const tree: Node[] = []

const readAndExecuteCommand = (input: string[], currentNode = { name: '/', children: [] } as Node) => {
  if (input.length === 0) return currentNode
  const current = input.shift()
  if (current.startsWith('$')) {
    const splitCommand = current.split(" ")
    if (splitCommand[1] === 'ls') {
      while (input.length > 0 && !input[0].includes('$')) {
        const line = input.shift()
        line.startsWith('dir')
          ? currentNode.children.push({ name: line.split(" ")[1], children: [], type: 'dir' })
          : currentNode.children.push({ value: parseInt(line.split(" ")[0]), name: line.split(" ")[1], type: 'child' })
      }
    }
    if (splitCommand[1] === 'cd') {
      if (splitCommand[2] !== '..') {
        readAndExecuteCommand(input, currentNode.children.find(c => c.name === splitCommand[2]) as Node)
      } else {
        return currentNode
      }
    }
  }
  currentNode.value = currentNode.children.reduce((sum, v) => sum + (v.value ?? 0), 0)
  return readAndExecuteCommand(input, currentNode)
}

fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const input = dataString.split('\n')
  input.shift()
  const treeNode = readAndExecuteCommand(input)
  // console.log(question1(treeNode))
  console.log(question2(treeNode, 30_000_000 - (70_000_000 - treeNode.value)))
})