const fetch = require("node-fetch");


// const testPing = ()=>{
//   const domain = 'dfj.com'
//   const data = fetch(`https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=7d14cca963b0d908eead0b1204647da4ac659265`)
//     .then(res => console.log(res.json()))
//     .catch(err => console.log(err))

//     console.log(data)
// }

// testPing()

const https = require('https')
// const domain = 'dfj.com'
const domain = 'http://www.eightroads.com/'
let emails;

const url = `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=7d14cca963b0d908eead0b1204647da4ac659265`
const test = async ()=>{
  let results = https.get(url, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      data = JSON.parse(data);
      emailArrLen = data.data
      console.log(data.data);
      // console.log(emails)
    })
  }).on('error', err => {
    console.log(err.message);
})

}

test()