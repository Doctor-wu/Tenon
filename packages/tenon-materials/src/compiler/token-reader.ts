import { JSXTokenizer } from "./tokenizer";

export class TokenReader {
  tokens: JSXTokenizer.IToken[] = [];
  pos: number = 0;

  constructor(tokens: JSXTokenizer.IToken[]) {
    this.tokens = tokens;
  }

  loadTokens(tokens: JSXTokenizer.IToken[]) {
    this.tokens = tokens;
    this.pos = 0;
  }

  read(): JSXTokenizer.IToken | null {
    if (this.pos < this.tokens.length) {
      return this.tokens[this.pos++];
    }
    return null;
  }

  peek(): JSXTokenizer.IToken | null {
    if (this.pos < this.tokens.length) {
      return this.tokens[this.pos];
    }
    return null;
  }

  unread(): void {
    if (this.pos > 0) {
      this.pos -= 1;
    }
  }
}
