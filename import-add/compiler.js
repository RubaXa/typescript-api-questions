const ts = require('typescript');
const transformer = require('./transformer');
const fileName = `${__dirname}/input.ts`;

const program = ts.createProgram([fileName], {module: 'commonjs', target: ts.ScriptTarget.ES5});

const transformers = {before: [transformer], after: []};
const {emitSkipped, diagnostics} = program.emit(undefined, undefined, undefined, false, transformers);

if (emitSkipped) {
	throw new Error(diagnostics.map(diagnostic => diagnostic.messageText).join('\n'));
}
