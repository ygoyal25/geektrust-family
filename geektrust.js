/**
 * @description This file contains the main code, it creates the family tree first and then executes the test file instructions
 */

const fs = require("fs");
const KingFamily = require("./src/KingFamily");

const filename = process.argv[2];

if (filename && fs.existsSync(filename)) {
    try {
        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filename)
        });
    
        const family = KingFamily();
        // console.log(family);
        
        lineReader.on('line', function (line) {
    
            let result = ""
            if(line.split(" ")[0] === "ADD_CHILD") {
                const [command, mother, name, gender] = line.split(" ");
                const added = family.addMember({ mother, name, gender: gender.charAt(0) });
                if (typeof added === "string") {
                    result = added;
                } else {
                    result = "CHILD_ADDITION_SUCCEEDED";
                }
            } else {
                const [command, name, relation] = line.split(" ");
                result = family.getRelation(name, relation);
            };
            console.log(result);
        });
    } catch(e) {
        console.log(e.message);
    }
} else {
    console.log("File Not Found!!!");
}

