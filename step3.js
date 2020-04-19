const fs = require('fs');
const axios = require('axios');
const process = require('process');

function writeOrPrint(data, writeTo) {
    if (writeTo) {
        write(writeTo, data)
    }
    else {
        console.log(data)
    }
}

function cat(...paths) {
    fs.readFile(paths[paths.length-1], 'utf8', (err, data) => {
        if (err){
            console.log(`Error reading ${path}`)
            console.log("Error:", err)
            process.exit(1)
        }
        writeOrPrint(data, paths[paths.length-2])
    })
}

async function webCat(...paths) {
    try {
        let content = await axios.get(paths[paths.length-1]);
        writeOrPrint(content.data, paths[paths.length-2])
    }
    catch(err) {
        console.log('Error fetching', err );
    }
}

async function write(writeTo, content){
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
        webCat(process.argv[3], process.argv[4])
    }
    else {
        cat(process.argv[3], process.argv[4])
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



