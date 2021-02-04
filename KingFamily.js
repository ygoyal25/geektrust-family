// This file is used to create the initial family tree for King Shan
const FamilyTree = require("./FamilyTree");
const FamilyMember = require("./FamilyMember");

function Family() {
    // Create a Family with king shan
    const kingShan = new FamilyMember({ name: "King Shan", gender: "M" });
    const kingFamily = new FamilyTree(kingShan);

    // Add Queen to king family
    // const queenAnga = new FamilyMember({ name: "Queen Anga", gender: "F" });
    const queenAnga = "Queen Anga"
    kingShan.addSpouse(queenAnga);

    const children = [
        // King and Queen's Children
        { name: "Chit", gender: "M", mother: "Queen Anga", father: "King Shan" }, 
        { name: "Ish", gender: "M", mother: "Queen Anga", father: "King Shan" },
        { name: "Vich", gender: "M", mother: "Queen Anga", father: "King Shan" },
        { name: "Aras", gender: "M", mother: "Queen Anga", father: "King Shan" },
        { name: "Satya", gender: "F", mother: "Queen Anga", father: "King Shan" },

        // Chidren Getting Married
        { name: "Chit", spouseName: "Amba", marriage: true },
        { name: "Vich", spouseName: "Lika", marriage: true },
        { name: "Aras", spouseName: "Chitra", marriage: true },
        { name: "Satya", spouseName: "Vyan", marriage: true },

        // Add Next Generation
        { name: "Dritha", gender: "F", mother: "Amba", father: "Chit" }, 
        { name: "Tritha", gender: "F", mother: "Amba", father: "Chit" },
        { name: "Vritha", gender: "M", mother: "Amba", father: "Chit" },
        { name: "Vila", gender: "F", mother: "Lika", father: "Vich" },
        { name: "Chika", gender: "F", mother: "Lika", father: "Vich" },
        { name: "Jnki", gender: "F", mother: "Chitra", father: "Aras" },
        { name: "Ahit", gender: "M", mother: "Chitra", father: "Aras" },
        { name: "Asva", gender: "M", mother: "Satya", father: "Vyan" },
        { name: "Vyas", gender: "M", mother: "Satya", father: "Vyan" },
        { name: "Atya", gender: "F", mother: "Satya", father: "Vyan" },

        // Next Gen Spouse
        { name: "Dritha", spouseName: "Jaya", marriage: true },
        { name: "Jnki", spouseName: "Arit", marriage: true },
        { name: "Asva", spouseName: "Satvy", marriage: true },
        { name: "Vyas", spouseName: "Krpi", marriage: true },

        // Add Next Gen
        { name: "Yodhan", gender: "M", mother: "Dritha", father: "Jaya" },
        { name: "Laki", gender: "M", mother: "Jnki", father: "Arit" },
        { name: "Lavnya", gender: "F", mother: "Jnki", father: "Arit" },
        { name: "Vasa", gender: "M", mother: "Satvy", father: "Asva" },
        { name: "Kriya", gender: "M", mother: "Krpi", father: "Vyas" },
        { name: "Krithi", gender: "F", mother: "Krpi", father: "Vyas" },
    ]

    children.forEach(child => {
        if (child.marriage) {
            // const member = family.findMember(child.name);
            kingFamily.memberWedding(child.name, child.spouseName);
        } else {
            kingFamily.addMember(child);
        }
    })
    return kingFamily;
}

module.exports = Family;