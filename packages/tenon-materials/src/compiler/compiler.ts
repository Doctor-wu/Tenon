import { AST } from "./ast";
import { createTokenizer, JSXTokenizer, Tokenizer } from "./tokenizer";
import { Transform } from "./transform";

export module JSXCompiler {
  export interface compileFileOptions {
    path: string;
  }

  export interface ICompiler {
    tokenizer: JSXTokenizer.ITokenizer;
    astParser: AST.IParse;
    transformer: Transform.Transformer;
    tokens: JSXTokenizer.IToken[];
    ast?: AST.ASTNode;

    compile(template: string): Transform.JSXElement;
  }

  export class Compiler implements ICompiler {
    tokenizer: JSXTokenizer.ITokenizer = createTokenizer(Tokenizer);
    astParser: AST.IParse = new AST.Parse([]);
    transformer: Transform.Transformer = new Transform.Transformer();
    tokens: JSXTokenizer.IToken[] = [];
    ast?: AST.ASTNode;
    jsxElement?: Transform.JSXElement;

    compile(template: string) {
      // console.log("================== Compile Start ====================");
      this.tokens = this.tokenizer.run(template);
      this.ast = this.astParser.createAST(this.tokens);
      this.ast = this.transformer.extractASTParserNode(this.ast);
      this.jsxElement = this.transformer.transform2JSXElement(this.ast);
      // console.log("Transform Success!");
      // console.log("================== Compile Success! ====================");
      return this.jsxElement;
    }
  }
}
