const fs = require("fs");
const KingFamily = require("./KingFamily");

const filename = process.argv[2];

if (filename && fs.existsSync(filename)) {
    const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(filename)
    });

    const family = new KingFamily();
    
    lineReader.on('line', function (line) {

        let result = ""
        if(line.split(" ")[0] === "ADD_CHILD") {
            const [command, mother, name, gender] = line.split(" ");
            result = family.addMember({ mother, name, gender });
        } else {
            const [command, name, relation] = line.split(" ");
            result = family.getRelation(name, relation);
        };
        console.log(result);
    });
} else {
    console.log("File Not Found!!!");
}

