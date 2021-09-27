import https from 'https'
import fs from 'fs'

const options = {
  hostname: 'registry.npmjs.org',
  path: '/@capacitor/core/',
  method: 'GET'
}

const req = https.request(options, res => {
  let json = ''
  res.on('data', d => {
    json += d
  })

  res.on('close', () => {
    const latestVersion = JSON.parse(json)['dist-tags'].latest;
    const lernaConfig = JSON.parse(fs.readFileSync('./lerna.json', 'utf-8'))
    lernaConfig.capacitorVersion = latestVersion
    fs.writeFileSync('./lerna.json', JSON.stringify(lernaConfig, null, 2) + '\n')
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
