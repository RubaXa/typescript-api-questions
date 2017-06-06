const ts = require('typescript');

module.exports = function transformer(context) {
	function addWrapper(expression) {
		return ts.createCall(
			ts.createIdentifier('externalWrapper'),
			undefined,
			[expression]
		);
	}

	return function (file) {
		let hasMessage = false;

		function visitNode(node) {
			if (node.kind === ts.SyntaxKind.StringLiteral && node.parent && node.parent.name.text === 'message') {
				hasMessage = true;
				node.parent = null;
				return addWrapper(node);
			}

			return node;
		}

		function visitNodeAndChildren(node, context) {
			if (node == null) {
				return node;
			}

			return ts.visitEachChild(
				visitNode(node, context),
				(childNode) => visitNodeAndChildren(childNode, context),
				context
			);
		}

		file = visitNodeAndChildren(file, context);

		if (hasMessage) {
			const importDecl = ts.createImportDeclaration(
				undefined,
				undefined,
				ts.createImportClause(ts.createIdentifier('externalWrapper')),
				ts.createLiteral('@external/wrapper')
			);

			file.statements = ts.createNodeArray([
				importDecl,
				...file.statements
			]);
		}

		return file;
	};
};
