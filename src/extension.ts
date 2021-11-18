/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands } from 'vscode';
import { getWebviewContent } from './makeWebview.js';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "segment-event-tracking" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	let disposable1 = vscode.commands.registerCommand('segment-event-tracking.track', async() => {
		// The code you place here will be executed every time your command is executed
		
		await getFiles().then(async filePaths => {
		if(filePaths === null) {

				vscode.window.showErrorMessage("Error! Workspace is undefined. Please select a workspace.");
				console.error("Error! Workspace is undefined. Please select a workspace.");
			}
			else {
					//vscode.window.showInformationMessage(`${filePaths}`);
					let documentText = await readFiles(filePaths);
					let wsPath: string;
					let ws = workspace.workspaceFolders;
					if(ws!== undefined) { 

						wsPath = ws[0].uri.fsPath;
						

						//vscode.window.showInformationMessage(`${wsPath}`);
						var event_array: any[] = [];
						var snippet_array: any = [];

						require('fs').writeFileSync(wsPath.concat("\\segmentEventTable.json"), "", function (err: any) {
							if (err) {
								vscode.window.showErrorMessage("Error! Could not create segmentEventTable.json file");
								throw err;}
							console.log('File is created successfully.'); });
						
						require('fs').writeFileSync(wsPath.concat("\\.vscode\\segmentSnippet.code-snippets"), "{", function (err: any) {
							if (err) {
								vscode.window.showErrorMessage("Error! Could not edit segmentSnippet.code-snippets file. Make sure .vscode folder exists in your folder");
								throw err;}
							console.log('File is created successfully.'); });
						
							
						var emptyFlag = 0;
						var emptyBool: boolean;
						var length = 0;
					
						for(var index = 0; index < documentText.length; index++) {
							
							
							let code = searchCode(documentText[index]);

							if(code!== null) {
								
								let cleanedFilePath = filePaths[index].match(/(?<=\\)(?:.(?!\\))+$/);
								let snippet = extractSnippet(code, cleanedFilePath);
								let events = exportToJson(code, cleanedFilePath);
								
								snippet_array = snippet_array.concat(snippet);
								event_array = event_array.concat(events);

							}
							else {
								emptyFlag = emptyFlag + 1;
							}	
						};
						
						if (emptyFlag === documentText.length) {
					
							vscode.window.showErrorMessage("No segment functions found in workspace files");
							console.log("No segment functions found in workspace files");
						}
						else {
						
							let eventJson = JSON.stringify(event_array);
							length = length + event_array.length;
							require('fs').appendFile(wsPath.concat("\\segmentEventTable.json"), eventJson, function (err: any) {
								if (err) {
									vscode.window.showErrorMessage("Error! Could not edit segmentEventTable.json file");
									throw err;}
								console.log('File is created successfully.'); });
					
								require('fs').appendFile(wsPath.concat("\\.vscode\\segmentSnippet.code-snippets"), `${snippet_array} }`, function (err: any) {
									if (err) {
										vscode.window.showErrorMessage("Error! Could not edit segmentSnippet.code-snippets file");
										throw err;}
									console.log('File is created successfully.'); });
							
							console.log(`${event_array.length}`);
						}
						
					}
				
				};
				
			});	
				
	});
	
	context.subscriptions.push(disposable1);

	let disposable2 = vscode.commands.registerCommand('segment-event-tracking.webview', () => {
		
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{}
		  );
	
		  // And set its HTML content
		  panel.webview.html = getWebviewContent();
		});
	context.subscriptions.push(disposable2);
}

async function getFiles(): Promise<string[] | null> {

	let paths: string[];
	return workspace.findFiles('**/*.js' || '**/*.jsx', '').then(files => {
            
        var filePaths: string[] = [];
    	// Get the objects path value for the current file system
		files.forEach(file => { filePaths.push(file.fsPath); });
		if(filePaths.length === 0) {
			return null;
		}
		else {
			console.log("JavaScript Files found");
        	return filePaths;
			}
		});
	}

async function readFiles(paths: string[]): Promise<string[]> {

	let docText: string[] = [];
	for(var index = 0; index < paths.length; index++) { 

		let doc = await workspace.openTextDocument(paths[index]);
		docText.push(doc.getText());	
	};
	return docText;	
}

function searchCode(docText: string): RegExpMatchArray | null {

		// regex to see if it's a valid segment event
	//let segment_indicator = /(analytics.)((.|\n|))*?(\);)/gm;
	let segment_indicator = new RegExp(/(analytics.)((.|\n|))*?(\);)/, 'g');
	// see if the code we brought in; docText fits the regex
	let searchResult: RegExpMatchArray | null;
	let newDocText = docText.replace(/(\r\n|\n|\r)/g, " ");
	searchResult = newDocText.match(segment_indicator);
	//console.log(`${searchResult}`);
	return searchResult;
}

function extractSnippet(code: RegExpMatchArray | null, filePath: RegExpMatchArray | null): string[] {
	
	let snippetArray: string[] = [];  // declaring an array to hold event details
	let eventName_indicator = /(?<=\(\").+?(?=\")/g;
	let eventType_indicator = /(analytics)((.|\n|))*?(?=\()/g;
	vscode.window.showInformationMessage("is this working?");
	// if the code has the template of a generic segment event, we now check if they are one of the four types of segment events:
	code?.forEach(c => {
		
		let name = c.match(eventName_indicator); // manipulating for segment event name and storing it in event_name
		let eventType = c.match(eventType_indicator);
		let cleanedCode = c.replace(/"/g, "'");
		let snip = 
			`"${name} + ${filePath}": {
				"prefix": ["${eventType}"],
				"body": "${cleanedCode}"
			   }`;

		snippetArray.push(snip);
	});		
	return snippetArray;
	}

function exportToJson(code: RegExpMatchArray | null, filePath: RegExpMatchArray | null): any[] {

	// 1. find what kind of segment event it is and if it matches the format of a segment event
	// 2. if yes, then cut the code down to the properties only
	// 3. using match() function, find a list of all the properties or if it is empty
	// 4. if there's more than 0 properties, then add them into a data structure (linked list)
	let is_identify = /(analytics.identify)((.|\n|))*?(;\n)/;
	let is_track = /(analytics.track)((.|\n|))*?(;\n)/;
	let is_page = /(analytics.page)((.|\n|))*?(;\n)/;
	let is_group = /(analytics.group)((.|\n|))*?(;\n)/;
	
	let eventName_indicator = /(?<=\(\").+?(?=\"\,)/;
	let prop_indicator = /(?<=\{)((.|\n|))*?(?=\}\))/g;
	
	let event_array: any[] = [];
	
	code?.forEach(c => {
		let cleanedCode = c.replace(/"/g, "'");
		let name = c.match(eventName_indicator);
		let prop = cleanedCode.match(prop_indicator);
		let type = cleanedCode.match(/(?<=analytics.).*(?=\()/);
		let obj = {		
			eventName: name?.toString(),
			code: cleanedCode,
			type: type?.toString(),
			property: prop?.toString(),
			filePath: filePath?.toString()
		};
		
		event_array.push(obj);
	});
	
	//console.log(`Event Array ${event_array}`);
	
	return event_array;
}
// this method is called when your extension is deactivated
export function deactivate() {}