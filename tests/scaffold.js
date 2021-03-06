'use strict'

const projectDir = process.env.SEMAPHORE_PROJECT_DIR
const templateName = process.argv[2]

const suppose = require('suppose')
const template = require('./builds.json')[templateName]

const CYAN = '\x1b[34m'
const END = '\x1b[0m'

process.chdir(process.cwd() + '/builds')

generate(templateName, template)

setTimeout(() => {
  process.exit()
}, 4000)

function generate (key, build) {
  console.log(`${CYAN}Generating \`${key}\`${END}`)

  suppose('vue', ['init', `${projectDir}`, key], { debug: process.stdout })
    .when(/Application Name/g).respond(build[0])
    .when(/Project description/g).respond(build[1])
    .when(/plugins/g).respond(build[2])
    .when(/ESLint/g).respond(build[3])
    .when(/config/g).respond(build[4])
    .when(/Css/g).respond(build[5])
    .when(/cssConfig/g).respond(build[6])
    .when(/unit/g).respond(build[7])
    .when(/end-to-end/g).respond(build[8])
    .when(/build tool/g).respond(build[9])
    .when(/author/g).respond(build[10])
  .on('error', err => {
    console.log(err.message)
  })
  .end(code => {
    process.exit(code)
  })
}
