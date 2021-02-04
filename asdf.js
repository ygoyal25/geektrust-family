const fs = require("fs");

let tree = require("./familyTree.json");

function FamilyTree() {
    this.familyTree = JSON.parse(JSON.stringify(tree));
}

FamilyTree.prototype.addChild = function(mother, name, gender) {
    const parent = this.findPerson(mother);
    if (!parent) {
        return "PERSON_NOT_FOUND";
    }

    const child = {
        name,
        spouse: null,
        children: null,
        parent: parent.name === mother ? mother : parent.spouse,
        gender: gender.charAt(0),
    }

    parent.children.push({
        name, gender: gender.charAt(0),
    });
    this.familyTree.push(child);
    return "CHILD_ADDITION_SUCCEEDED";
}

FamilyTree.prototype.findPerson = function(name) {
    return this.familyTree.find(node => node.name === name || node.spouse === name);
}

FamilyTree.prototype.getRelationship = function(name, relation) {
    const person = this.findPerson(name);
    if (!person) {
        return "PERSON_NOT_FOUND";
    }
    switch (relation) {
        case "Maternal-Uncle": 
        case "Paternal-Uncle":
        case "Maternal-Aunt":
        case "Paternal-Aunt": {
            let gender = "F";
            if (relation === "Maternal-Uncle" || relation === "Paternal-Uncle") {
                gender = "M";
            }
            const parent = this.findPerson(person.parent);
            if (!parent || !parent.parent) {
                return "NONE";
            }
            const grandParent = this.findPerson(parent.parent);
            if (!grandParent || !grandParent.children.length === 1) {
                return "NONE";    
            }
            return grandParent.children.filter(child => child.name !== parent.name && child.gender === gender).map(child => child.name).join(" ");
        }
        case "Sister-In-Law":
        case "Brother-In-Law": {
            if (person.spouse) {
                let gender = "F";
                if (relation === "Brother-In-Law") {
                    gender = "M";
                }
                const spouse = this.findPerson(person.spouse);
                if (!spouse) {
                    return "NONE";
                }
                const spouseParent = this.findPerson(spouse.parent);
                if (!spouseParent || spouseParent.children.length === 1) {
                    return "NONE";
                }
                const inLaws = spouseParent.children.filter(child => child.name !== spouse.name && child.gender === gender).map(c => c.name);
                return inLaws.length ? inLaws.join(" ") : "NONE";
            } else {
                let gender = "M";
                if (relation === "Brother-In-Law") {
                    gender = "F";
                }
                const parent = this.findPerson(person.parent);
                if (!parent || !parent.children) {
                    return "NONE";
                }
                // Find female children
                const siblings = parent.children.filter(child => child.name !== person.name && child.gender === gender).map(c => c.name);
                let arr = [];
                siblings.forEach(s => {
                    const sibling = this.findPerson(s);
                    if (sibling.spouse) {
                        arr.push(sibling.spouse)
                    }
                })
                return arr.length ? arr.join(" ") : "NONE";
            }
        }
        case "Son":
        case "Daughter": {
            let gender = "F";
            if (relation === "son") {
                gender = "M";
            }
            const children = person.children ? person.children.filter(child => child.gender === gender).map(c => c.name) : [];
            return children.length ? children.join(" ") : "NONE";
        }
        case "Siblings": {
            const parent = this.findPerson(person.parent);
            if (!parent || !parent.children || parent.children.length === 1) {
                return "NONE";
            }
            return parent.children.filter(child => child.name !== person.name).map(c => c.name).join(" ");
        }
    }
}

const filename = process.argv[2];

if (filename && fs.existsSync(filename)) {
    const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(filename)
    });

    const myTree = new FamilyTree();
    
    lineReader.on('line', function (line) {

        let result = ""
        if(line.split(" ")[0] === "ADD_CHILD") {
            const [command, mother, name, gender] = line.split(" ");
            result = myTree.addChild(mother, name, gender);
        } else {
            const [command, name, relation] = line.split(" ");
            result = myTree.getRelationship(name, relation);
        };
        console.log(result);
    });
} else {
    console.log("File Not Found!!!")
}
