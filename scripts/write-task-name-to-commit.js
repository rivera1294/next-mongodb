#!/usr/bin/env node

const fs = require('fs')
const child_process = require('child_process')
const { promisify } = require('util')
const { EOL } = require('os')

const exec = promisify(child_process.exec)
const timeToWrite = 5000
const branchContract = /^(feature|bugfix|backlog|debug)\/(IT)-[0-9]{1,4}/
const taskContract = /(IT)-[0-9]{1,4}/
const commitEditmsgFile = process.env.HUSKY_GIT_PARAMS || process.argv[2] // file '.git/COMMIT_EDITMSG'

cleanup()
main()

async function getCurrentBranch() {
  const branchOutput = await exec('git symbolic-ref --short HEAD')
  if (branchOutput.stderr) {
    throw new Error(stderr)
  }
  return branchOutput.stdout
}

function getTaskFromBranch(branchName) {
  if (!branchContract.test(branchName)) {
    console.log('⚠️ Имя ветки не соответствует шаблону "{type}/(IT)-{number}"')
    throw new Error('Unsupported branch name')
  }
  const [, task] = branchName.split('/')
  return task.replace(/\s+/g, '')
}

function existTaskInFile(file) {
  const message = fs.readFileSync(file, 'utf8')
  const withoutComments = message
    .split(EOL)
    .filter((l) => !/^#/.test(l))
    .join('')
  return taskContract.test(withoutComments)
}

function writeTaskToTitleInFile(task, file) {
  const message = fs.readFileSync(file, 'utf8')
  const lines = message.split(EOL)
  lines[0] = `${task}. ${lines[0]}`
  const newLines = lines.join(EOL)
  fs.writeFileSync(file, newLines, 'utf8')
}

function cleanup() {
  setTimeout(() => {
    console.log('⚠️ Таймаут commit-msg hook ', timeToWrite)
    process.exit(1)
  }, timeToWrite)
}

async function main() {
  let task = ''
  let branchName = ''
  if (existTaskInFile(commitEditmsgFile)) {
    console.log('👌 В commit сообщении уже есть id задачи')
    process.exit(0)
  }
  try {
    branchName = await getCurrentBranch()
    task = getTaskFromBranch(branchName)
  } catch (error) {
    console.log('⚠️ Не удалось получить имя задачи', task, 'из ветки', branchName)
    // process.exit(1)
    console.log('(Ничего страшного)')
    process.exit(0)
  }
  try {
    writeTaskToTitleInFile(task, commitEditmsgFile)
  } catch (err) {
    console.log('⚠️ Не удалось записать имя задачи', task, 'в commit-msg файл', commitEditmsgFile)
    console.error(err)
    process.exit(1)
  }

  console.log('👌 Перезапись сообщения коммита: УСПЕШНО')
  process.exit(0)
}
