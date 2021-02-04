const FamilyMember = require("./FamilyMember");
const Family = require("./KingFamily");

function FamilyTree(head) {
    this.head = head;
    this.members = [this.head];
}

FamilyTree.prototype.addMember = function(member) {
    const parent = this.findMember(member.mother);
    // Allow spouse to be added w/o mother and father details
    if (!parent) {
        console.log("CHILD_ADDITION_FAILED");
        return null;
    } else {
        const newMember = new FamilyMember({ ...member, father: parent.gender === "F" ? parent.spouse : parent.name });
        parent.addChild({ name: member.name, gender: member.gender });
        this.members.push(newMember);
        return newMember;
    }
}

FamilyTree.prototype.findMember = function(memberName) {
    return this.members.find(mem => mem.name === memberName || mem.spouse === memberName);
}

FamilyTree.prototype.memberWedding = function(memberName, spouseName) {
    const existingMember = this.findMember(memberName);
    if (!existingMember || existingMember.spouse) {
        console.log("CHILD_ALREADY_MARRIED");
    } else {
        
        existingMember.addSpouse(spouseName);
    }
}

FamilyTree.prototype.getRelation = function(name, relation) {
    const member = this.findMember(name);
    switch(relation) {
        case "Paternal-Uncle":
            return this.getPaternalUncle(member)
        case "Maternal-Uncle": 
            return this.getMaternalUncle(member);
        case "Paternal-Aunt":
            return this.getPaternalAunt(member);
        case "Maternal-Aunt":
            return this.getMaternalAunt(member);
        
    }
}

FamilyTree.prototype.getFather = function(member) {
    return this.findMember(member.getFather());
}

FamilyTree.prototype.getMother = function(member) {
    return this.findMember(member.getMother());
}

FamilyTree.prototype.getPaternalGrandFather = function(member) {
    const father = this.getFather(member);
    return this.findMember(father.getFather());
}

FamilyTree.prototype.getPaternalGrandMother = function(member) {
    const father = this.getFather(member);
    return this.findMember(father.getMother());
}

FamilyTree.prototype.getMaternalGrandFather = function(member) {
    const mother = this.getMother(member);
    return this.findMember(mother.getFather());
}

FamilyTree.prototype.getMaternalGrandMother = function(member) {
    const mother = this.getMother(member);
    return this.findMember(mother.getMother());
}

FamilyTree.prototype.getPaternalUncle = function(member) {
    const paternalGrandFather = this.getPaternalGrandFather(member);
    return paternalGrandFather.children.filter(child => child.name !== member.getFather() && child.gender === "M").map(c => c.name).join(" ");
}

FamilyTree.prototype.getMaternalUncle = function(member) {
    const maternalGrandFather = this.getMaternalGrandFather(member);
    return maternalGrandFather.children.filter(child => child.name !== member.getFather() && child.gender === "M").map(c => c.name).join(" ");
}

FamilyTree.prototype.getPaternalAunt = function(member) {
    const paternalGrandFather = this.getPaternalGrandFather(member);
    return paternalGrandFather.children.filter(child => child.name !== member.getMother() && child.gender === "F").map(c => c.name).join(" ");
}

FamilyTree.prototype.getMaternalAunt = function(member) {
    const maternalGrandFather = this.getMaternalGrandFather(member);
    return maternalGrandFather.children.filter(child => child.name !== member.getMother() && child.gender === "F").map(c => c.name).join(" ");
}

module.exports = FamilyTree;
