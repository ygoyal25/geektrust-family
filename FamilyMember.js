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

module.exports = FamilyMember;
