
// var fs = require('fs');
 
// Use fs.readFile() method to read the file
//callbac hell
// fs.readFile('Demo.txt', 'utf8', function(err, data){
//     // Display the file content
//     console.log(data);

//     fs.readFile('Demo.txt', 'utf8', function(err, data){
//         // Display the file content
//         console.log(data);

//         fs.readFile('Demo.txt', 'utf8', function(err, data){
//             // Display the file content
//             console.log(data);
//         });
//     });
// });

//better way


// Node.js program to demonstrate
// the fsPromises.readFile() method

// Include fs module
// const fs = require('fs');
// const fsPromises = require('fs').promises;

// // Use fsPromises.readFile() method
// // to read the file
// fs.promises.readFile("./GFG_Test.txt")
// 	.then(function (result) {
// 		console.log("" + result);
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	})


//latest and more cleaner approach async await

import fs from 'node:fs/promises';

// const readPjson = async () => {
//     const pjsonPath = new URL('./package.json', import.meta.url).pathname;
//     // console.log(pjsonPath)
//     console.log(JSON.parse(await fs.readFile(pjsonPath, 'utf-8')));

// }

// readPjson();

// const writeFile = async () => {
//     const newFile = new URL('./testWrite.js', import.meta.url).pathname;
//     await fs.writeFile(newFile, `console.log('hello world')`);
// }

// writeFile();