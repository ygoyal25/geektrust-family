const FamilyMember = require("../src/FamilyMember");
const FamilyTree = require("../src/FamilyTree");

let kingFamily;

beforeAll(() => {
    // Initialize the Family Tree with the man and wife
    // Jest will wait for this promise to resolve before running tests.
    const king = new FamilyMember({ name: "Yash", gender: "M" });
    const queen = new FamilyMember({ name: "Alishka", gender: "F" });
    kingFamily = new FamilyTree(king, queen);
    return;
});

test("Case 1: Check the Family Head and the Queen", () => {
    expect(kingFamily.members.length).toEqual(2);
    expect(kingFamily.findMember("Yash")).toEqual({
        name: "Yash",
        gender: "M",
        father: null,
        mother: null,
        spouse: "Alishka",
        children: [],
    });
    expect(kingFamily.findMember("Alishka")).toEqual({
        name: "Alishka",
        gender: "F",
        father: null,
        mother: null,
        spouse: "Yash",
        children: [],
    });
})

test("Case 2: Add first generation of the children", () => {
    // Add a child with mother, check mother and father if the child was added or not, members should increase by 1
    expect(kingFamily.addMember({ name: "Avni", gender: "F", mother: "Alishka" })).toEqual({
        name: "Avni",
        gender: "F",
        mother: "Alishka",
        father: "Yash",
        spouse: null,
        children: []
    });

    expect(kingFamily.addMember({ name: "Avi", gender: "M", mother: "Alishka" })).toEqual({
        name: "Avi",
        gender: "M",
        mother: "Alishka",
        father: "Yash",
        spouse: null,
        children: []
    });


    expect(kingFamily.members.length).toEqual(4);
    expect(kingFamily.findMember("Yash").children).toEqual([{ name: "Avni", gender: "F" }, { name: "Avi", gender: "M" }]);
    expect(kingFamily.findMember("Alishka").children).toEqual([{ name: "Avni", gender: "F" }, { name: "Avi", gender: "M" }]);

    expect(kingFamily.addMember({ name: "Nimit", gender: "M", mother: "Alishka" })).toEqual({
        name: "Nimit",
        gender: "M",
        mother: "Alishka",
        father: "Yash",
        spouse: null,
        children: []
    });
});

test("Case 3: Adding a child without mother reference should fail", () => {
    // Adding to father should fail
    expect(kingFamily.addMember({ name: "Ritika", gender: "F", mother: "Yash" })).toEqual("CHILD_ADDITION_FAILED");
    // Adding to an unknown member should fail
    expect(kingFamily.addMember({ name: "Ritika", gender: "F", mother: "Yashi" })).toEqual("PERSON_NOT_FOUND");
});


test("Case 4: Add spouse to members", () => {
    expect(kingFamily.memberWedding("Avni", "Rohan")).toEqual("SPOUSE_ADDITION_SUCCEDED");
    expect(kingFamily.memberWedding("Avi", "Ritu")).toEqual("SPOUSE_ADDITION_SUCCEDED");
    expect(kingFamily.memberWedding("Avni", "Roshan")).toEqual("CHILD_ALREADY_MARRIED");
    expect(kingFamily.memberWedding("Avnita", "Roshan")).toEqual("PERSON_NOT_FOUND");
})

test("Case 5: Add next generation children", () => {
    expect(kingFamily.addMember({name: "Harsh", gender: "M", mother: "Avni", })).toEqual({
        name: "Harsh",
        gender: "M",
        mother: "Avni",
        father: "Rohan",
        spouse: null,
        children: []
    });

    expect(kingFamily.addMember({name: "Nikita", gender: "F", mother: "Ritu", })).toEqual({
        name: "Nikita",
        gender: "F",
        mother: "Ritu",
        father: "Avi",
        spouse: null,
        children: []
    });

    expect(kingFamily.members.length).toEqual(9)
})

test("Case 6: Check Relationships", () => {
    expect(kingFamily.getRelation("Avni", "Mother").name).toEqual("Alishka");
    expect(kingFamily.getRelation("Avni", "Father").name).toEqual("Yash");
    expect(kingFamily.getRelation("Manoj", "Mother")).toEqual("PERSON_NOT_FOUND");
    expect(kingFamily.getRelation("Nikita", "Paternal-Uncle")).toEqual("Nimit");
    expect(kingFamily.getRelation("Nikita", "Maternal-Uncle")).toEqual("NONE");
    expect(kingFamily.getRelation("Harsh", "Maternal-Uncle")).toEqual("Avi Nimit");
    expect(kingFamily.getRelation("Rohan", "Brother-In-Law")).toEqual("Avi Nimit");
    expect(kingFamily.getRelation("Ritu", "Brother-In-Law")).toEqual("Nimit");
    expect(kingFamily.getRelation("Ritu", "Sister-In-Law")).toEqual("Avni");
    expect(kingFamily.getRelation("Avni", "Brother")).toEqual("Avi Nimit");
    expect(kingFamily.getRelation("Avi", "Sister")).toEqual("Avni");
    expect(kingFamily.getRelation("Nikita", "Paternal-Grand-Father").name).toEqual("Yash");
    expect(kingFamily.getRelation("Nikita", "Paternal-Grand-Mother").name).toEqual("Alishka");
    expect(kingFamily.getRelation("Harsh", "Maternal-Grand-Mother").name).toEqual("Alishka");
    expect(kingFamily.getRelation("Harsh", "Maternal-Grand-Father").name).toEqual("Yash");
    expect(kingFamily.getRelation("Avni", "Siblings")).toEqual("Avi Nimit");
})