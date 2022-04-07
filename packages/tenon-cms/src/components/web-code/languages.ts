import * as monaco from "monaco-editor";

let initd = false;
export function initLanguages() {
  if (initd) return;
  monaco.languages.registerCompletionItemProvider('javascript', {
    // @ts-ignore
    provideCompletionItems(model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const createComplete = _textUntilPosition => {
        // // 切割成数组
        // const words = _textUntilPosition.split(' ');
        // // 取当前输入值
        // const activeStr = words[words.length - 1];
        return [
          {
            label: '$pageState',
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: '页面状态',
            insertText: '$pageState',
          },
          {
            label: '$comp',
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: '组件实例',
            insertText: '$comp',
          },
          {
            label: '$events',
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: '页面事件',
            insertText: '$events',
          },
          {
            label: '$router',
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: '路由',
            insertText: '$router',
          },
        ];
      };
      const suggestions = createComplete(textUntilPosition);
      return {
        suggestions
      };
    },
  });
  initd = true;
}