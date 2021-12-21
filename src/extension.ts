/* eslint-disable @typescript-eslint/naming-convention */
import path = require('path');
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
		
		let wsPath: string;
		let ws = workspace.workspaceFolders;
		if(ws === undefined) { 

			vscode.window.showWarningMessage("Workspace is undefined. Please select a workspace.");
			console.error("Workspace is undefined. Please select a workspace.");
		}	
		else if(ws !== undefined ){
			wsPath = ws[0].uri.fsPath;	
			await getFiles().then(async filePaths => {
			if(filePaths === null) {

				vscode.window.showWarningMessage("No JavaScript or JavaScript React files found in Workspace");
				console.error("No JavaScript or JavaScript React files found in Workspace");
			}
			else {
						
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
					var length = 0;
					
					for(var index = 0; index < filePaths.length; index++) {
							
						let output = await searchCode(filePaths[index]);
							 
							if(output!== null) {
								let code = output[0];
								let lineNumbers = output[1];
								let cleanedFilePath = filePaths[index].replace('\\','\\\\');
								//let cleanedFilePath = filePaths[index].match(/(?<=\\)(?:.(?!\\))+$/);
								let snippet = extractSnippet(code, lineNumbers);
								let events = exportToJson(code, cleanedFilePath, lineNumbers);
								
								snippet_array = snippet_array.concat(snippet);
								event_array = event_array.concat(events);
							}
							else {
								emptyFlag = emptyFlag + 1;
							};	
						};
						
						if (emptyFlag === filePaths.length) {
					
							vscode.window.showErrorMessage("No segment functions found in workspace files");
							console.log("No segment functions found in workspace files");
						}
						else {
							//vscode.window.showInformationMessage(`Success! ${event_array} segment events found`);
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
							
							vscode.window.showInformationMessage(`Success! ${event_array.length} segment events found`);
							console.log(`Success!${event_array.length} segment events found`);
							console.log(`${event_array.length}`);
						};	
					};	
				});
			};	
		});
	
	context.subscriptions.push(disposable1);
	
	//let currentPanel: vscode.WebviewPanel | undefined = undefined;

	let disposable2 = vscode.commands.registerCommand('segment-event-tracking.webview', () => {
		
		// Step 1
		const panel = vscode.window.createWebviewPanel(
			'segment-event-tracking',
			'Segment Events Library',
			vscode.ViewColumn.One,
			{
				enableScripts: true
			}
		  );

		// Facts: By default, webviews can only access resources in the following locations:
		// 1. Within your extension's install directory
		// 2. Within the user's currently active workspace
		// We can use the WebviewOptions.localResourceRoots to allow access to additional local resources
		let wsPath: any;
		let ws = workspace.workspaceFolders;
		if(ws!== undefined) { 

			wsPath = ws[0].uri.fsPath;
			
		// And get the special URI to use with the webview
		
		const onDiskPath = vscode.Uri.file(path.join(wsPath, 'segmentEventTable.json')
		  );
		let segment_events_json_file = panel.webview.asWebviewUri(onDiskPath);
		
		let colorTheme: string = ``;

		if(vscode.window.activeColorTheme.kind === 1) {
			
			colorTheme = `.jsgrid-header-row>.jsgrid-header-cell {
				background-color: #F06923;      /* orange */
				font-family: "Roboto Slab";
				font-size: 1.2em;
				color: black;
				font-weight: normal;
			  }
			  .jsgrid-row>.jsgrid-cell {
				background-color: white;
				color: black;
			  }
			  .jsgrid-alt-row>.jsgrid-cell {
				background-color: #F0F0F0;
				color: black;
			  }`;
	
			}
		else if(vscode.window.activeColorTheme.kind  === 2) {
			colorTheme = 
			`.jsgrid-header-row>.jsgrid-header-cell {
				background-color: #074687 ;      /* orange */
				font-family: "Roboto Slab";
				font-size: 1.2em;
				color: white;
				font-weight: normal;
			  }
			  .jsgrid-row>.jsgrid-cell {
				background-color: #282c34 ;
				color: white;
			  }
			  .jsgrid-alt-row>.jsgrid-cell {
				background-color: #24282e ;
				color: white;
			  }`;
			
			}
		else if(vscode.window.activeColorTheme.kind  === 3) {
			colorTheme = 
			`.jsgrid-header-row>.jsgrid-header-cell {
				background-color: black;      /* orange */
				font-family: "Roboto Slab";
				font-size: 1.2em;
				color: orange;
				font-weight: normal;
			  }
			  .jsgrid-row>.jsgrid-cell {
				background-color: black;
				color: orange;
			  }
			  .jsgrid-alt-row>.jsgrid-cell {
				background-color: black;
				color: orange;
			  }`;		
			};

		panel.webview.html = getWebviewContent(segment_events_json_file, colorTheme);
		vscode.window.onDidChangeActiveColorTheme(theme => {
			if(theme.kind === 1) {
				colorTheme = 
				`.jsgrid-header-row>.jsgrid-header-cell {
					background-color: #F06923;      /* orange */
					font-family: "Roboto Slab";
					font-size: 1.2em;
					color: black;
					font-weight: normal;
				  }
				  .jsgrid-row>.jsgrid-cell {
					background-color: white;
					color: black;
				  }
				  .jsgrid-alt-row>.jsgrid-cell {
					background-color: #F0F0F0;
					color: black;
				  }`;
			
				panel.webview.html = getWebviewContent(segment_events_json_file, colorTheme);
				}
			else if(theme.kind  === 2) {
				colorTheme = 
				`.jsgrid-header-row>.jsgrid-header-cell {
					background-color: #074687 ;      /* orange */
					font-family: "Roboto Slab";
					font-size: 1.2em;
					color: white;
					font-weight: normal;
				  }
				  .jsgrid-row>.jsgrid-cell {
					background-color: #282c34;
					color: white;
				  }
				  .jsgrid-alt-row>.jsgrid-cell {
					background-color:#202227 ;
					color: white;
				  }`;

				panel.webview.html = getWebviewContent(segment_events_json_file, colorTheme);
				}
			else if(theme.kind  === 3) {
				colorTheme = 
				`.jsgrid-header-row>.jsgrid-header-cell {
					background-color: black;      /* orange */
					font-family: "Roboto Slab";
					font-size: 1.2em;
					color: orange;
					font-weight: normal;
				  }
				  .jsgrid-row>.jsgrid-cell {
					background-color: black;
					color: orange;
				  }
				  .jsgrid-alt-row>.jsgrid-cell {
					background-color: black;
					color: orange;
				  }`;

				panel.webview.html = getWebviewContent(segment_events_json_file, colorTheme);     
				
				};
			});

		//panel.reveal(vscode.ViewColumn.Beside);
		panel.webview.onDidReceiveMessage(
			async message => {
			  switch (message.command) {
				case 'alert':
				  
				  let filePath: string = (message.path).replace('\\\\','\\');
				  //let filePathUri = await workspace.findFiles(`**/${(message.fileName).rep}`);
				  //let filePath = filePathUri[0];
				  workspace.openTextDocument(filePath).then(async doc => {
					
					vscode.window.showTextDocument(doc, vscode.ViewColumn.One, true).then(editor => {
						
						const position = editor.selection.active;
						let line: number = message.line - 1;
						var newPosition = position.with(line, 0);
						var newSelection = new vscode.Selection(newPosition, newPosition);
						let lineRange = new vscode.Range(line, 0, line, 10);
						editor.selection = newSelection;
						//let docHighlight = new vscode.DocumentHighlight(lineRange, 0);
						editor.revealRange(lineRange, 1);
					});	
					
				  });
				  return;
			  }
			},
			undefined,
			context.subscriptions
		  );
		};
	});
		context.subscriptions.push(disposable2);
}

async function getFiles(): Promise<string[] | null> {

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

async function searchCode(filePath: string): Promise<[RegExpMatchArray | null, number[]] | null> {

	// regex to see if it's a valid segment event
	//let segment_indicator = /(analytics.)((.|\n|))*?(\);)/gm;
	let segment_indicator = new RegExp(/(analytics.(track|page|group|identify))((.|\r\n|\n|\r)*?)(;)/, 'gm');
	// see if the code we brought in; docText fits the regex
	let regexResult: RegExpMatchArray | null;
	let lineNumbers: number[] = [];
	let doc = await workspace.openTextDocument(filePath);
	for(let line = 0; line < doc.lineCount; line++) {
		let lineText = doc.lineAt(line);
		if((lineText.text).match(/analytics.(track|page|group|identify)/)) {
		
			lineNumbers.push(line+1);
					 
		};
	};
	let newDocText = doc.getText();
	
	regexResult = newDocText.match(segment_indicator);

	return [regexResult, lineNumbers];
}

let itr1 = 0;

function extractSnippet(code: RegExpMatchArray | null,  lineNumbers: number[]): string[] {
	
	let snippetArray: string[] = [];  // declaring an array to hold event details
	let eventName_indicator = /((?<=\(\")|(?<=\(\')).+?((?=\")|(?=\'))/g;
	let eventType_indicator = /(?<=analytics.).*(?=\()/g;
	let prop_indicator = /(?<=\{)((.|\n|))*?(?=\})/g;
	// if the code has the template of a generic segment event, we now check if they are one of the four types of segment events:
	code?.forEach((c, index) => {
		let cleanedCode = (c.replace(/"/g, "'")).replace(/\s/g,"");
		//let line = lineNumbers[index];
		let eventType = cleanedCode.match(eventType_indicator);
		let name: RegExpMatchArray | null | string = [];
		let eventID: string = "";
		//let prop = cleanedCode.match(prop_indicator) || "";
		let type = cleanedCode.match(/(?<=analytics.).*(?=\()/);
		let snip1: string = ``;
		
		if(type?.toString() === "page") {
			name = cleanedCode.match(/((?<=\"\,\")|(?<=\'\,\')).+?((?<=\")|(?<=\'))/g);
			if(name === null) {
				name = cleanedCode.match(eventName_indicator);
			}
		}
		else{
			name = cleanedCode.match(eventName_indicator);
		};
		if(type!== null) {
			
			if(name === null) {
				
				name = "";
				itr1 = itr1 + 1;
				eventID = type[0].slice(0,2).concat("_").concat(`${itr1}`);
			}
			else {
				itr1 = itr1 + 1;
				eventID = type[0].slice(0,2).concat("_").concat(name[0].slice(0,3)).concat("_").concat(`${itr1}`);
			};

		};
		snip1 = `"${eventID}": {
			"prefix": ["${name}","${eventID}", "${eventType}","${cleanedCode}"],
			"body": "${cleanedCode}"
			}`;
			
		snippetArray.push(snip1);
	});		
	return snippetArray;
	}

let itr2 = 0;

function exportToJson(code: RegExpMatchArray | null, filePath: string, lineNumbers: number[]): any[] {

	// 1. find what kind of segment event it is and if it matches the format of a segment event
	// 2. if yes, then cut the code down to the properties only
	// 3. using match() function, find a list of all the properties or if it is empty
	// 4. if there's more than 0 properties, then add them into a data structure (linked list)
	/*
	let is_identify = /(analytics.identify)((.|\n|))*?(;\n)/;
	let is_track = /(analytics.track)((.|\n|))*?(;\n)/;
	let is_page = /(analytics.page)((.|\n|))*?(;\n)/;
	let is_group = /(analytics.group)((.|\n|))*?(;\n)/;*/

	let eventName_indicator = /((?<=\(\")|(?<=\(\')).+?((?=\")|(?=\'))/g;
	let prop_indicator = /(?<=\{)((.|\n|))*?(?=\})/g;
	
	let event_array: any[] = [];
	
	code?.forEach((c, index) => {
		
		let cleanedCode = (c.replace(/"/g, "'")).replace(/\s/g,"");
		let line = lineNumbers[index];
		let name: RegExpMatchArray | null | string= [];
		let prop = cleanedCode.match(prop_indicator) || "";
		let type = cleanedCode.match(/(?<=analytics.).*(?=\()/) || "";
		let cat: RegExpMatchArray | null | string= [];
		let eventID: string = "";
		let obj: any = {};
		if(type?.toString() === "page") {
			cat = cleanedCode.match(eventName_indicator);
			name = cleanedCode.match(/((?<=\"\,\")|(?<=\'\,\')).+?((?=\")|(?=\'))/g);
			if(name === null) {
				name = cleanedCode.match(eventName_indicator);
				cat = "";
			};
		}
		else{
			name = cleanedCode.match(eventName_indicator);
			
		};
		if(type!== null) {
			
			if(name === null) {
				
				name = "";
				itr2 = itr2 + 1;
				eventID = type[0].slice(0,2).concat("_").concat(`${itr2}`);
			}
			else {
				itr2 = itr2 + 1;
				eventID = type[0].slice(0,2).concat("_").concat(name[0].slice(0,3)).concat("_").concat(`${itr2}`);
			};

		};
			obj = {
			eventID: eventID,				
			eventName: name?.toString(),
			category: cat?.toString(),
			type: type?.toString(),
			property: prop?.toString(),
			filePath: filePath.toString(),
			lineNumber: line,
			code: cleanedCode	
		};
		event_array.push(obj);
	});
	
	//console.log(`Event Array ${event_array}`);
	
	return event_array;
}
// this method is called when your extension is deactivated
export function deactivate() {}