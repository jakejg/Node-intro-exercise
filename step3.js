const fs = require('fs');
const axios = require('axios');
const process = require('process');

function writeOrPrint(data, writeTo) {
    if (writeTo) {
        write(data, writeTo)
    }
    else {
        console.log(data)
    }
}

function cat(readFrom, writeTo) {
    fs.readFile(readFrom, 'utf8', (err, data) => {
        if (err){
            console.log(`Error reading ${readFrom}`)
            console.log("Error:", err)
            process.exit(1)
        }
        writeOrPrint(data, writeTo)
    })
}

async function webCat(readFrom, writeTo) {
    try {
        let content = await axios.get(readFrom);
        writeOrPrint(content.data, writeTo)
    }
    catch(err) {
        console.log('Error fetching', err );
    }
}

async function write(content, writeTo){
    fs.writeFile(writeTo, content, 'utf8', err => {
        if (err){
            console.log("Error:", err);
            process.exit(1);
        }
    })
}

function checkType(writeFrom){
    return writeFrom.includes('http')
}


if (process.argv[2] === '--out'){
    if (checkType(process.argv[4])) {
        webCat(process.argv[4], process.argv[3])
    }
    else {
        cat(process.argv[4], process.argv[3])
    }
}

else {
    if (checkType(process.argv[2])) {
        webCat(process.argv[2])
    }
    else {
        cat(process.argv[2])
    }
}



