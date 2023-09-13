export module JSXTokenizer {
  export interface ITokenizerConstructor {
    new (): ITokenizer;
  }

  export type TokenizerParamter = string;

  export interface IToken {
    type: Symbol | null;
    value: string;
  }

  export interface IStateExcutor {
    (char: string): IStateExcutor | undefined;
  }

  export type REType = {
    [props: string]: RegExp;
  };

  export interface ITokenizer {
    currentToken: IToken;
    tokens: IToken[];
    RE: REType;
    run(input: JSXTokenizer.TokenizerParamter): IToken[];
    searchBeginTagStart: IStateExcutor;
    searchJSXIdentifier: IStateExcutor;
    searchFirstCommentBar: IStateExcutor;
    searchSecondCommentBar: IStateExcutor;
    searchCommentContent: IStateExcutor;
    searchCommentEnd: IStateExcutor;
    searchJSXAttributeKey: IStateExcutor;
    foundBackFlashInAttribute: IStateExcutor;
    searchJSXAttributeValue: IStateExcutor;
    foundAttributeQuote: IStateExcutor;
    foundJSXBeginTagEnd: IStateExcutor;
    resetCurrentToken(): void;
    emit(token: IToken): void;
    pop(): IToken | undefined;
  }

  export const TagStartType = Symbol("TagStartType");
  export const JSXIdentifierType = Symbol("JSXIdentifier");
  export const JSXAttributeKey = Symbol("JSXAttributeKey");
  export const Equator = Symbol("Equator");
  export const JSXAttributeValue = Symbol("JSXAttributeValue");
  export const TagEndType = Symbol("TagEndType");
  export const BackFlash = Symbol("BackFlash");
  export const Text = Symbol("Text");
  export const Comment = Symbol("Comment");
}

export class Tokenizer implements JSXTokenizer.ITokenizer {
  tokens: JSXTokenizer.IToken[] = [];
  currentQuote: string | undefined;
  currentToken: JSXTokenizer.IToken = {
    type: Symbol("INIT"),
    value: "",
  };
  RE: JSXTokenizer.REType = {
    LETTERS: /[a-zA-Z0-9\-]/,
    ATTRIBUTEKEY: /[a-zA-Z0-9-@:$\.]/,
    ATTRIBUTEVALUE: /[^\"\'\`]/,
    Text: /[^>]/,
    commentContent: /[^-]/,
    Quote: /['"`]/,
  };

  run(input: JSXTokenizer.TokenizerParamter): JSXTokenizer.IToken[] {
    this.tokens = [];
    let state: JSXTokenizer.IStateExcutor | void = this.searchBeginTagStart;
    for (const char of input) {
      if (state !== undefined) {
        // 忽略换行
        if (/\r\n|\r|\n/.test(char)) continue;
        state = state.call(this, char);
      }
    }

    return this.tokens;
  }

  searchBeginTagStart(char: string): JSXTokenizer.IStateExcutor {
    if (char === "<") {
      this.emit(this.currentToken);
      this.emit({
        type: JSXTokenizer.TagStartType,
        value: char,
      });
      this.resetCurrentToken();
      return this.searchJSXIdentifier;
    }

    if (this.RE.Quote.test(char)) {
      this.currentToken.type = JSXTokenizer.Text;
      this.currentToken.value += `\\${char}`;
      return this.searchBeginTagStart;
    }

    if (this.RE.Text.test(char)) {
      this.currentToken.type = JSXTokenizer.Text;
      this.currentToken.value += char;
      return this.searchBeginTagStart;
    }

    throw TypeError("UnExcepted Error");
  }

  searchJSXIdentifier(char: string): JSXTokenizer.IStateExcutor {
    if (this.RE.LETTERS.test(char)) {
      this.currentToken.type = JSXTokenizer.JSXIdentifierType;
      this.currentToken.value += char;
      return this.searchJSXIdentifier;
    }
    if (char === " ") {
      this.emit(this.currentToken);
      this.resetCurrentToken();
      return this.searchJSXAttributeKey;
    }
    if (char === "/") {
      this.emit({
        type: JSXTokenizer.BackFlash,
        value: char,
      });
      return this.searchJSXIdentifier;
    }
    if (char === ">") {
      this.emit(this.currentToken);
      this.resetCurrentToken();
      this.emit({
        type: JSXTokenizer.TagEndType,
        value: char,
      });
      return this.searchBeginTagStart;
    }
    if (char === "!") {
      let lastToken = this.pop();
      if (
        lastToken !== undefined &&
        lastToken.type !== JSXTokenizer.TagStartType
      ) {
        throw TypeError(`UnExcepted char ${char}`);
      }
      this.currentToken = {
        type: JSXTokenizer.Comment,
        value: "<!",
      };
      return this.searchFirstCommentBar;
    }

    throw TypeError("UnExcepted Error");
  }

  searchFirstCommentBar(char: string): JSXTokenizer.IStateExcutor {
    if (char === "-") {
      this.currentToken.value += char;
      return this.searchSecondCommentBar;
    }
    throw TypeError("UnExcepted Error");
  }

  searchSecondCommentBar(char: string): JSXTokenizer.IStateExcutor {
    if (char === "-") {
      this.currentToken.value += char;
      return this.searchCommentContent;
    }
    throw TypeError("UnExcepted Error");
  }

  searchCommentContent(char: string): JSXTokenizer.IStateExcutor {
    if (this.RE.commentContent.test(char)) {
      this.currentToken.value += char;
      return this.searchCommentContent;
    } else if (char === "-") {
      this.currentToken.value += char;
      return this.searchCommentEnd;
    }

    throw TypeError("Unexpeted Error");
  }

  searchCommentEnd(char: string): JSXTokenizer.IStateExcutor {
    if (char === "-") {
      this.currentToken.value += char;
      return this.searchCommentEnd;
    } else if (char === ">") {
      this.currentToken.value += char;
      this.emit(this.currentToken);
      this.resetCurrentToken();
      return this.searchBeginTagStart;
    } else {
      this.currentToken.value += char;
      return this.searchCommentContent;
    }
  }

  searchJSXAttributeKey(char: string): JSXTokenizer.IStateExcutor {
    if (char === " ") {
      this.emit(this.currentToken);
      this.resetCurrentToken();
      return this.searchJSXAttributeKey;
    }
    if (this.RE.ATTRIBUTEKEY.test(char)) {
      this.currentToken.type = JSXTokenizer.JSXAttributeKey;
      this.currentToken.value += char;
      return this.searchJSXAttributeKey;
    }

    if (char === "=") {
      this.emit(this.currentToken);
      this.resetCurrentToken();
      this.emit({
        type: JSXTokenizer.Equator,
        value: char,
      });
      return this.searchJSXAttributeValue;
    }

    if (char === ">") {
      this.emit(this.currentToken);
      this.resetCurrentToken();
      this.emit({
        type: JSXTokenizer.TagEndType,
        value: char,
      });
      return this.foundJSXBeginTagEnd;
    }

    if (char === "/") {
      this.emit({
        type: JSXTokenizer.BackFlash,
        value: char,
      });
      return this.foundBackFlashInAttribute;
    }
    
    throw TypeError("UnExcepted Error");
  }

  foundBackFlashInAttribute(char: string): JSXTokenizer.IStateExcutor {
    if (char === ">") {
      this.emit({
        type: JSXTokenizer.TagEndType,
        value: char,
      });
      return this.foundJSXBeginTagEnd;
    }
    throw TypeError("Should Be > after /");
  }

  @jumpSpace
  searchJSXAttributeValue(char: string): JSXTokenizer.IStateExcutor {
    if (this.RE.Quote.test(char)) {
      this.currentQuote = char;
      this.currentToken.type = JSXTokenizer.JSXAttributeValue;
      this.currentToken.value = "";
      return this.foundAttributeQuote;
    }

    throw TypeError("UnExcepted Error");
  }

  foundAttributeQuote(char: string): JSXTokenizer.IStateExcutor {
    if (this.RE.ATTRIBUTEVALUE.test(char)) {
      this.currentToken.type = JSXTokenizer.JSXAttributeValue;
      this.currentToken.value += char;
      return this.foundAttributeQuote;
    }

    if (char === this.currentQuote) {
      this.currentToken.type = JSXTokenizer.JSXAttributeValue;
      // this.currentToken.value += char;
      this.emit(this.currentToken, true);
      this.resetCurrentToken();
      return this.searchJSXAttributeKey;
    }

    if (this.RE.Quote.test(char)) {
      this.currentToken.value += `${char}`;
      return this.foundAttributeQuote;
    }
    throw TypeError("UnExcepted Error");
  }

  foundJSXBeginTagEnd(char: string): JSXTokenizer.IStateExcutor {
    if (char === "<") {
      this.emit(this.currentToken);
      this.currentToken = {
        type: JSXTokenizer.TagStartType,
        value: char,
      };
      this.emit(this.currentToken);
      this.resetCurrentToken();
      return this.searchJSXIdentifier;
    }

    if (this.RE.Quote.test(char)) {
      this.currentToken.type = JSXTokenizer.Text;
      this.currentToken.value += `\\${char}`;
      return this.foundJSXBeginTagEnd;
    }
    this.currentToken.type = JSXTokenizer.Text;
    this.currentToken.value += char;
    return this.foundJSXBeginTagEnd;
  }

  resetCurrentToken() {
    if (this.currentToken === null) return;
    this.currentToken = {
      type: Symbol("INIT"),
      value: "",
    };
  }

  emit(token: JSXTokenizer.IToken, force?: boolean): void {
    if ((!token.value || !token.value.trim()) && !force) return;

    this.tokens.push(token);
  }

  pop(): JSXTokenizer.IToken | undefined {
    return this.tokens.pop();
  }
}

function jumpSpace(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  let method = descriptor.value;
  let jumpSpaceFunc = function (this: JSXTokenizer.ITokenizer, char: string) {
    if (char === " ") return jumpSpaceFunc;
    return method.call(this, char);
  };
  descriptor.value = jumpSpaceFunc;
}

export function createTokenizer(
  Tokenizer: JSXTokenizer.ITokenizerConstructor
): JSXTokenizer.ITokenizer {
  return new Tokenizer();
}
