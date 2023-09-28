const fs = require("fs");

fs.writeFile("message2.txt","Hello from NodeJS !",(err)=>{
    if (err) throw err;
    console.log('The file has been saved!');
});

// fs.readFile("message.txt",(err,data)=>{
//     if (err) throw err;
//     console.log(data);
// }); //no encoding

fs.readFile("message.txt","UTF-8",(err,data)=>{
    if (err) throw err;
    console.log(data);
});