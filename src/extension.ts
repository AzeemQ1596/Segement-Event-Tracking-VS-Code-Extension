// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as vscode from 'vscode';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands } from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "segment-event-tracking" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	//let t = vscode.workspace.workspaceFolders[0].uri.path;
	
	let paths: string[];
	
	if (workspace.workspaceFolders == undefined) return;
        // Find all the php files to process
        workspace.findFiles('**/*.js', '').then(files => {
            
            var filePaths: string[] = [];
            // Get the objects path value for the current file system
            files.forEach(file => { filePaths.push(file.fsPath); });
            paths = filePaths;
            
			vscode.workspace.openTextDocument(filePaths[0]).then(doc => {
				let l = doc;
				console.log(l);
			});	

        });
	console.log("hello");
	let disposable = vscode.commands.registerCommand('segment-event-tracking.track', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage(`${paths}`);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
