/**  
 * @description This file is used to create the initial family tree for King Shan
 * 
*/

const FamilyTree = require("./FamilyTree");
const FamilyMember = require("./FamilyMember");

const data = require("../seed/FamilyData");

function family() {
    // Create a Family with king shan
    const kingShan = new FamilyMember(data.king);
    const queenAnga = new FamilyMember(data.queen);
    const kingFamily = new FamilyTree(kingShan, queenAnga);

    data.children.forEach(child => {
        if (child.marriage) {
            // const member = family.findMember(child.name);
            kingFamily.memberWedding(child.name, child.spouseName);
        } else {
            kingFamily.addMember(child);
        }
    })
    return kingFamily;
}

module.exports = family;