// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import { TextEncoder } from 'util';
import * as vscode from 'vscode';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "segment-event-tracking" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	/*
	if (workspace.workspaceFolders === undefined) { return; };
        // Find all the php files to process
    workspace.findFiles('/*.js', '').then(files => {
            
        var filePaths: string[] = [];
    	// Get the objects path value for the current file system
        files.forEach(file => { filePaths.push(file.fsPath); });
        paths = filePaths;
			
		filePaths.forEach(f => { 
			workspace.openTextDocument(f).then(doc => {
				let text = doc.getText();
				searchText(text);
			});

	});*/
	let filePaths = await getFiles();
	//readFiles(filePaths);
	let disposable = vscode.commands.registerCommand('segment-event-tracking.track', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage(`${filePaths}`);
	});

	context.subscriptions.push(disposable);
}

async function getFiles() {

	let paths: string[];
		
    return workspace.findFiles('**/*.js', '').then(files => {
            
        var filePaths: string[] = [];
    	// Get the objects path value for the current file system
        files.forEach(file => { filePaths.push(file.fsPath); });
        return filePaths;

	});
	
}
/*
function readFiles(paths: string[]) {

	paths.forEach(f => { 
		workspace.openTextDocument(f).then(doc => {
			let text = doc.getText();
			searchText(text);
		});
	});
}

function writeToSnippet(code: string, lineNo: number, fileName: string, event: string) {
	
	
}


function searchText(docText: string): string[] | false {
    
    let segment_indicator = /(analytics.)((.|\n|))*?(;\n)/;

	// for each line in the text file
    let code: string[];
	// replace file with an actual value
    let searchResult = segment_indicator.exec(docText);
	if (searchResult) {
		// 1) Write a snippet to find a chunk of code to send to the function
		for(let s of searchResult){
		
		// 2) send to validate_segment_code to check if it is a segment event
		if (validate_segment_code(s) == 'identify') {
			// send to check for event names
			if (check_identify(s) == true) {
				// send to determine the id and event properties
			}
		} (if validate_segment_code(s) == false) {
			return false;
		}

	}
    
    }
    return code;
}
/*
	// 2) Check if it is a segment call by checking:
	// 3) analytics.__name__({})
	// 4) if yes, then extract five things:
	//       a) type of event
	//       b) event name or id
	//       c) properties
	//       d) line where this segment event is called
	//       e) what file this is in 



// Javascript program for checking
// balanced brackets
 
// Function to check if brackets are balanced
function validate_segment_code(code: string) {
	
    let segment_type = ''
 
    // First, see if it's a segment event by checking if it has a segment spec type
    for(let i = 0; i < code.length; i++)
    {

		if (i==0 && code[i]=='.') {
			// check if the next word is: identify, track, group, page
			if (code[i+1:i+9] == 'identify') {
				segment_type = 'identify';
				return segment_type;
			} if (code[i+1:i+6] == 'track') {
				segment_type = 'track';
				return segment_type;
			} if (code[i+1:i+6] == 'group') {
				segment_type = 'group';
				return segment_type;
			} if (code[i+1:i+5] == 'page') {
				segment_type = 'page';
				return segment_type;
			} else {
				return false // it is not a segment event
			}

        }
    }
 


// 1.1. Identify
// Case 1: Common
/*
	// Case 1: Common
	analytics.identify(“_id__”, {
		“1”: “example”,
		“2”: “example”
		}
		)
		;
	
	
	// Case 2: Edge case: anonymous user
	analytics.identify({
	“1”: “example”,
	“2”: “example”,
	“3”: “example”
	}
	);
*/
/*
function check_identify(code: string) {
	// code that starts with an open bracket

	let stack = [];

/*
		// Case 1: Common
		analytics.identify(“_id__”, {
			“1”: “example”,
			“2”: “example”
			}
			)
			; 

    for(let i = 0; i < code.length; i++) {
		let x = code[i];

		// Base case: code at i=0 must be '('
		if (i==0 && x=='(') {
			stack.push(x);
			continue;
		}

		if (x == '{')
		{
			// Push the element in the stack
			stack.push(x);
			continue;
		}

		// If current character is not opening
		// bracket, then it must be closing.
		// So stack cannot be empty at this point.
		if (stack.length == 0)
			return false;
			
		let check;
		switch (x){
		case ')':
			check = stack.pop();
			if (check == '{')
				return false;
			break;

		case '}':
			check = stack.pop();
			if (check == '(')
				return false;
			break;
		}

	// Check Empty Stack
	return (stack.length == 0);
}
}
*/
// this method is called when your extension is deactivated
export function deactivate() {}