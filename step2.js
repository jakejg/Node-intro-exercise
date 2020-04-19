const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.log(`Error reading ${path}`)
            console.log("Error:", err)
            process.exit(1)
        }
        console.log(data);
    })
}

async function webCat(URL) {
    try {
        let content = await axios.get(URL);
        console.log(content.data);
    }
    catch(err) {
        console.log('Error fetching', URL)
    }
}

if (process.argv[2].includes('http://') | process.argv[2].includes('https://')) {
    webCat(process.argv[2])
}

else {
    cat(process.argv[2])
}


