const input = {tag: "JAVASCRIPT"};
const toLowerCase = str => str.tag.toLowerCase();
const addParenteses = str => `(${str})`
const output = addParenteses(toLowerCase(input));

console.log(output);