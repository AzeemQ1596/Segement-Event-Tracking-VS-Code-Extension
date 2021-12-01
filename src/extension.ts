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
							};	
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
							
							vscode.window.showInformationMessage(`Success! ${event_array.length} segment events found`);
							console.log(`Success!${event_array.length} segment events found`);
							console.log(`${event_array.length}`);
						};
						
					};
					
				};
				
			});	
				
	});
	
	context.subscriptions.push(disposable1);

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

		  
		// Get path to resource on disk
		// Azeem's help needed on finding the path
		// We should ideally save this data on User's local space

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

		panel.webview.html = getWebviewContent(segment_events_json_file);
		};
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
	console.log(`${searchResult}`);
	return searchResult;
}

function extractSnippet(code: RegExpMatchArray | null, filePath: RegExpMatchArray | null): string[] {
	
	let snippetArray: string[] = [];  // declaring an array to hold event details
	let eventName_indicator = /((?<=\(\")|(?<=\(\')).+?((?<=\")|(?<=\'))/g;
	let eventType_indicator = /(analytics)((.|\n|))*?(?=\()/g;
	let prop_indicator = /(?<=\{)((.|\n|))*?(?=\})/g;
	// if the code has the template of a generic segment event, we now check if they are one of the four types of segment events:
	code?.forEach(c => {
		let cleanedCode = (c.replace(/"/g, "'")).replace(/\s/g,"");
		
		let eventType = cleanedCode.match(eventType_indicator);
		let name: RegExpMatchArray | null = [];
		let prop = cleanedCode.match(prop_indicator) || "";
		let type = cleanedCode.match(/(?<=analytics.).*(?=\()/);
		let snip: string = ``; 
		if(type?.toString() === "page") {
			name = cleanedCode.match(/((?<=\"\,\")|(?<=\'\,\')).+?((?<=\")|(?<=\'))/g);
		}
		else{
			name = cleanedCode.match(eventName_indicator);
		};
		if(prop!=="") {
			snip = `"${name} + ${prop} + ${filePath}": {
				"prefix": ["${eventType}"],
				"body": "${cleanedCode}"
			   }`;
		}
		else {
			snip = `"${name} + ${filePath}": {
				"prefix": ["${eventType}"],
				"body": "${cleanedCode}"
			   }`;
		};
	
		snippetArray.push(snip);
	});		
	return snippetArray;
	}
	let ilist: number[] = [];
	function uniqueID(min: number, idList: number[]): number {

    let id = Math.floor(Math.floor(Math.random()*10000)+100);
    while(idList.includes(id)){
        id = Math.floor(Math.floor(Math.random()*10000)+100);
    };
    ilist.push(id);
    return id;
}

function exportToJson(code: RegExpMatchArray | null, filePath: RegExpMatchArray | null): any[] {

	// 1. find what kind of segment event it is and if it matches the format of a segment event
	// 2. if yes, then cut the code down to the properties only
	// 3. using match() function, find a list of all the properties or if it is empty
	// 4. if there's more than 0 properties, then add them into a data structure (linked list)
	/*
	let is_identify = /(analytics.identify)((.|\n|))*?(;\n)/;
	let is_track = /(analytics.track)((.|\n|))*?(;\n)/;
	let is_page = /(analytics.page)((.|\n|))*?(;\n)/;
	let is_group = /(analytics.group)((.|\n|))*?(;\n)/;*/
	
	let min = 100;
	let eventName_indicator = /((?<=\(\")|(?<=\(\')).+?((?<=\")|(?<=\'))/g;
	let prop_indicator = /(?<=\{)((.|\n|))*?(?=\})/g;
	
	let event_array: any[] = [];
	
	code?.forEach(c => {
		
		let cleanedCode = (c.replace(/"/g, "'")).replace(/\s/g,"");
		let name: RegExpMatchArray | null = [];
		let prop = cleanedCode.match(prop_indicator);
		let type = cleanedCode.match(/(?<=analytics.).*(?=\()/);
		let cat: RegExpMatchArray | null = [];
		let eventID: string = "";
		let obj: any = {};
		if(type?.toString() === "page") {
			cat = cleanedCode.match(eventName_indicator);
			name = cleanedCode.match(/((?<=\"\,\")|(?<=\'\,\')).+?((?<=\")|(?<=\'))/g);
		}
		else{
			name = cleanedCode.match(eventName_indicator);
		};
		if(name!== null && type!== null) {
			
			let id = uniqueID(min, ilist);
			eventID = type[0].slice(0,2).concat("_").concat(name[0].slice(0,3)).concat("_").concat(`${id}`);
		};
		
			obj = {
			eventID: eventID,
			category: cat?.toString(),	
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