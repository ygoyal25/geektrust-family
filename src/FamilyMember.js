/** 
 * @description This File contains code to create a new member in the family 
 * @param name
 * @param gender
 * @param mother
 * @param father
 * @param spouse
 * @param children
 *
*/
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

FamilyMember.prototype.getSons = function() {
    return this.children.filter(child => child.gender === "M");
}

FamilyMember.prototype.getDaughters = function() {
    return this.children.filter(child => child.gender === "F");
}

module.exports = FamilyMember;
