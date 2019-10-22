/*
 * @Description:主文件
 * @Author: 吴文周
 * @Github: https://github.com/fodelf
 * @Date: 2019-10-21 18:05:02
 * @LastEditors: 吴文周
 * @LastEditTime: 2019-10-22 01:54:47
 */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const explain = require('./explain')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "learnCss" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  // let disposable = vscode.commands.registerCommand('extension.helloWorld')
  async function provideHover(document, position, token) {
    // The code you place here will be executed every time your command is executed
    const word = document.getText(document.getWordRangeAtPosition(position))
    let explainWord = await explain(word)
    let pre = ``
    return new vscode.Hover(pre + explainWord)
  }
  context.subscriptions.push(
    vscode.languages.registerHoverProvider('scss', { provideHover })
  )
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
