function FamilyMember({ name, gender, mother = null, father = null }) {
    this.name = name;
    this.gender = gender;
    this.mother = mother;
    this.father = father;
    this.spouse = null;
    this.children = [];
}

FamilyMember.prototype.addSpouse = function(spouse) {
    this.spouse = spouse;
}

FamilyMember.prototype.addChild = function(child) {
    this.children.push({ name: child.name, gender: child.gender });
}

FamilyMember.prototype.getFather = function() {
    return this.father;
}

FamilyMember.prototype.getMother = function() {
    return this.mother;
}

FamilyMember.prototype.getSons = function() {
    return this.children.filter(child => child.gender === "M");
}

FamilyMember.prototype.getDaughters = function() {
    return this.children.filter(child => child.gender === "F");
}

module.exports = FamilyMember;
