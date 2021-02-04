const FamilyMember = require("./FamilyMember");
const Family = require("./KingFamily");

function FamilyTree(head) {
    this.head = head;
    this.members = [this.head];
}

FamilyTree.prototype.addQueen = function(queen) {
    const king = this.head;
    if (!king.spouse) {
        king.addSpouse(queen.name);
        queen.addSpouse(king.name);
        this.members.push(queen);
    }
}

FamilyTree.prototype.addMember = function(member, isSpouse) {
    const mother = this.findMember(member.mother);
    const father = this.findMember(member.father);
    // Allow spouse to be added w/o mother and father details
    if ((!mother || !father) && !isSpouse) {
        console.log("CHILD_ADDITION_FAILED");
        return null;
    } else {
        const newMember = new FamilyMember(member);
        if (!isSpouse) {
            father.addChild(member);
            mother.addChild(member);
        }
        this.members.push(newMember);
        return newMember;
    }
}

FamilyTree.prototype.findMember = function(member) {
    return this.members.find(mem => mem.name === member);
}

FamilyTree.prototype.memberWedding = function(memberName, spouseName) {
    const existingMember = this.findMember(memberName);
    if (!existingMember || existingMember.spouse) {
        console.log("CHILD_ALREADY_MARRIED");
    } else {
        const newMember = this.addMember({
            name: spouseName, gender: existingMember.gender === "M" ? "F" : "M"
        }, true);
        if (!newMember) {
            return;
        } else {
            existingMember.addSpouse(spouseName);
            newMember.addSpouse(memberName);
        }
    }
}

module.exports = FamilyTree;
