const FamilyMember = require("../src/FamilyMember");

let member = null;

beforeAll(() => {
    // Create a Member named Rahul
    // Jest will wait for this promise to resolve before running tests.
    member = new FamilyMember({ name: "Rahul", gender: "M", mother: "Preeti", father: "Ravi" });
    return;
});


test("Case 1: Family Member being created or not", () => {
    expect(member.name).toEqual("Rahul");
    expect(member.spouse).toEqual(null);
    expect(member.father).toEqual("Ravi");
    expect(member.mother).toEqual("Preeti");
})

test("Case 2: Adding Spouse to Family Member", () => {
    member.addSpouse("Ritika");
    expect(member.spouse).toEqual("Ritika");
});

test("Case 3: Add children to Family Member", () => {
    expect(member.children).toEqual([]);
    expect(member.getSons()).toEqual([]);
    expect(member.getDaughters()).toEqual([]);
    const children = [{ name: "Riya", gender: "F" }, {name: "Aryan", gender: "M"}];
    children.forEach(child => member.addChild(child));
    expect(member.children).toEqual(children);
    expect(member.getSons()).toEqual([{name: "Aryan", gender: "M"}]);
    expect(member.getDaughters()).toEqual([{name: "Riya", gender: "F"}]);
});