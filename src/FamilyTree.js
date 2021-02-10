/* This File contains code to generate a Family tree by providing the family heads, Man(King) and Wife(Queen) */

const FamilyMember = require("./FamilyMember");
const Family = require("./KingFamily");

function FamilyTree(king, queen) {
    this.members = [king, queen];
    king.addSpouse(queen.name);
    queen.addSpouse(king.name);
}

FamilyTree.prototype.addMember = function(member, isSpouse) {
    const newMember = new FamilyMember(member);
    if (!isSpouse) {
        const mother = this.findMember(member.mother);
        if (!mother) {
            return "PERSON_NOT_FOUND";
        } else if(mother.gender !== "F") {
            return "CHILD_ADDITION_FAILED";
        }
        const father = this.findMember(mother.spouse);
        if (!father) {
            return "CHILD_ADDITION_FAILED";
        }
        father.addChild({ name: member.name, gender: member.gender });
        mother.addChild({ name: member.name, gender: member.gender });
        newMember.father = father.name;
    }
    this.members.push(newMember);
    return newMember;
}

FamilyTree.prototype.findMember = function(memberName) {
    return this.members.find(mem => mem.name === memberName);
}

FamilyTree.prototype.memberWedding = function(memberName, spouseName) {
    const existingMember = this.findMember(memberName);
    if (!existingMember) {
        return "PERSON_NOT_FOUND";
    }
    if (existingMember.spouse) {
        return "CHILD_ALREADY_MARRIED";
    } else {
        const spouse = this.addMember({ name: spouseName, gender: existingMember.gender === "M" ? "F" : "M" }, true);
        spouse.addSpouse(memberName);
        existingMember.addSpouse(spouseName);
        return "SPOUSE_ADDITION_SUCCEDED";
    }
}

FamilyTree.prototype.getRelation = function(name, relation) {
    const member = this.findMember(name);
    let result;
    if (!member) {
        return "PERSON_NOT_FOUND";
    }
    switch(relation) {
        case "Son": {
            result = this.getSons(member);
            break;
        }
        case "Daughter": {
            result = this.getDaughters(member);
            break;
        }
        case "Siblings": {
            result = this.getSiblings(member);
            break;
        }
        case "Father": {
            result = this.getFather(member);
            break;
        }
        case "Mother": {
            result = this.getMother(member);
            break;
        }
        case "Paternal-Uncle": {
            result = this.getPaternalUncle(member);
            break;
        }
        case "Maternal-Uncle": {
            result = this.getMaternalUncle(member);
            break;
        }
        case "Paternal-Grand-Father": {
            result = this.getPaternalGrandFather(member);
            break;
        }
        case "Paternal-Grand-Mother": {
            result = this.getPaternalGrandMother(member);
            break;
        }
        case "Maternal-Grand-Father": {
            result = this.getMaternalGrandFather(member);
            break;
        }
        case "Maternal-Grand-Mother": {
            result = this.getMaternalGrandMother(member);
            break;
        }
        case "Paternal-Aunt": {
            result = this.getPaternalAunt(member);
            break;
        }
        case "Maternal-Aunt": {
            result = this.getMaternalAunt(member);
            break;
        }
        case "Brother-In-Law": {
            result = this.getBrotherInLaws(member);
            break;
        }
        case "Sister-In-Law": {
            result = this.getSisterInLaws(member);
            break;
        }
        case "Brother": {
            result = this.getBrothers(member);
            break;
        }
        case "Sister": {
            result = this.getSisters(member);
            break;
        }
        default: {
            result = "RELATION_NOT_FOUND";
            break
        }
    }

    return result || "NONE";
}

FamilyTree.prototype.getSons = function(member) {
    return member.getSons().map(son => son.name).join(" ");
}

FamilyTree.prototype.getDaughters = function(member) {
    return member.getDaughters().map(daughter => daughter.name).join(" ");
}

FamilyTree.prototype.getSiblings = function(member) {
    const mother = this.findMember(member.mother);
    return mother.children.filter(child => child.name !== member.name).map(child => child.name).join(" ");
}

FamilyTree.prototype.getFather = function(member) {
    return this.findMember(member.father);
}

FamilyTree.prototype.getMother = function(member) {
    return this.findMember(member.mother);
}

FamilyTree.prototype.getPaternalGrandFather = function(member) {
    const father = this.getFather(member);
    if (!father) {
        return null;
    }
    return this.findMember(father.father);
}

FamilyTree.prototype.getPaternalGrandMother = function(member) {
    const father = this.getFather(member);
    return this.findMember(father.mother);
}

FamilyTree.prototype.getMaternalGrandFather = function(member) {
    const mother = this.getMother(member);
    if (!mother) {
        return null;
    }
    return this.findMember(mother.father);
}

FamilyTree.prototype.getMaternalGrandMother = function(member) {
    const mother = this.getMother(member);
    return this.findMember(mother.mother);
}

FamilyTree.prototype.getPaternalUncle = function(member) {
    const paternalGrandFather = this.getPaternalGrandFather(member);
    if (!paternalGrandFather) {
        return null;
    }
    return paternalGrandFather.children.filter(child => child.name !== member.father && child.gender === "M").map(c => c.name).join(" ");
}

FamilyTree.prototype.getMaternalUncle = function(member) {
    const maternalGrandFather = this.getMaternalGrandFather(member);
    if (!maternalGrandFather) {
        return null;
    }
    return maternalGrandFather.children.filter(child => child.name !== member.father && child.gender === "M").map(c => c.name).join(" ");
}

FamilyTree.prototype.getPaternalAunt = function(member) {
    const paternalGrandFather = this.getPaternalGrandFather(member);
    return paternalGrandFather.children.filter(child => child.name !== member.mother && child.gender === "F").map(c => c.name).join(" ");
}

FamilyTree.prototype.getMaternalAunt = function(member) {
    const maternalGrandFather = this.getMaternalGrandFather(member);
    if (!maternalGrandFather) {
        return null;
    }
    return maternalGrandFather.children.filter(child => child.name !== member.mother && child.gender === "F").map(c => c.name).join(" ");
}

FamilyTree.prototype.getBrotherInLaws = function(member) {
    // If the person is not spouse, and is from the same family
    if (member.mother) {
        const mother = this.getMother(member);
        const sisters = mother.getDaughters().filter(d => d.name !== member.name);
        const arr = []
        sisters.forEach(sister => {
            const sibling = this.findMember(sister.name);
            if (sister.spouse) {
                arr.push(sibling.spouse)
            }
        })
        return arr.join(" ");
    } else {
        const spouse = this.findMember(member.spouse);
        if (!spouse) {
            return "NONE";
        }
        const mother = this.getMother(spouse);
        const brotherInLaws = mother.getSons();
        return brotherInLaws.filter(b => b.name !== spouse.name).map(c => c.name).join(" ");
    }
}

FamilyTree.prototype.getSisterInLaws = function(member) {
    // If the person is not spouse, and is from the same family
    // console.log(member)
    if (member.mother) {
        const mother = this.getMother(member);
        const brothers = mother.getSons().filter(son => son.name !== member.name);
        const arr = []
        brothers.forEach(brother => {
            const sibling = this.findMember(brother.name);
            if (sibling.spouse) {
                arr.push(sibling.spouse)
            }
        })
        return arr.join(" ");
    } else {
        const spouse = this.findMember(member.spouse);
        if (!spouse) {
            return "NONE";
        }
        const mother = this.getMother(spouse);
        const sisterInLaws = mother.getDaughters();
        return sisterInLaws.filter(b => b.name !== spouse.name).map(c => c.name).join(" ");
    }
}

FamilyTree.prototype.getBrothers = function(member) {
    const mother = this.getMother(member);
    if (!mother) {
        return "NONE";
    }
    return mother.getSons().filter(son => son.name !== member.name).map(c => c.name).join(" ");
}

FamilyTree.prototype.getSisters = function(member) {
    const mother = this.getMother(member);
    if (!mother) {
        return "NONE";
    }
    return mother.getDaughters().filter(d => d.name !== member.name).map(c => c.name).join(" ");
}

module.exports = FamilyTree;
