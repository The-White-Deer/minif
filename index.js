const reservedKeywords = {
    before: ['var', 'let', 'const', 'function', 'new', 'await', 'async', 'case', 'class', 'extends', 'private', 'static', 'return', 'in', 'of'],
    after: ['in', 'of']
};

const env = document.getElementById('env');

console.log(env.getBoundingClientRect().top);

const resize = {up: false, down: false};

reservedKeywords.string = "";
for (let word of reservedKeywords.before) {
    reservedKeywords.string += `(?<!${word})`;
}
reservedKeywords.string += "\\s";
for (let word of reservedKeywords.after) {
    reservedKeywords.string += `(?!${word})`;
}
reservedKeywords.regExp = new RegExp(reservedKeywords.string, "g");

const minifyButton = document.getElementById('minify-btn');
const maximiseButton = document.getElementById('maximise-btn');

const minify = (text) => {
    let minText = text
    .replace(/\}(?=\r?\n|\r)(?!;)|\)(?=\r?\n|\r)(?!;)(?!\s*.)/g, "$&;")
    .replace(/\r?\n\s*|\r\s*/g, "")
    .replace(reservedKeywords.regExp, "")
    .replace(/;(?=})/g, "");
    return minText;
}

minifyButton.addEventListener('click', () => {
    env.value = minify(env.value);
});