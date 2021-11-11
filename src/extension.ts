/* eslint-disable @typescript-eslint/naming-convention */
var fs = require('fs');
import { AnyPtrRecord } from 'dns';
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
	
	let disposable = vscode.commands.registerCommand('segment-event-tracking.track', async() => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
	
		const os = require('os');
		const fs = require('fs');
		let oS = os.platform();
		console.log(oS);
		/*
		const homedir = require('os').homedir();
		let snippetPath = homedir.toString().concat("\\code\\segment-event-tracking\\segment_snippets.json");
		let snippetUri = vscode.Uri.file(snippetPath);
		const encoder = new TextEncoder();
		//workspace.fs.writeFile(snippetUri, encoder.encode(" "));
		require('fs').writeFileSync(snippetPath, "azeem");	*/
		


		await getFiles().then(async filePaths => {
		if(filePaths === null) {

				vscode.window.showErrorMessage("Error! Workspace is undefined. Please select a workspace.");
				console.error("Error! Workspace is undefined. Please select a workspace.");
			}
			else {
					vscode.window.showInformationMessage(`${filePaths}`);
					let documentText = await readFiles(filePaths);
					
					let wsPath: string;
					let ws = workspace.workspaceFolders;
					if(ws!== undefined) { 

						wsPath = ws[0].uri.fsPath;
						

						vscode.window.showInformationMessage(`${wsPath}`);
					
						require('fs').writeFileSync(wsPath.concat("\\segmentEventTable.json"), "{ \n", function (err: any) {
							if (err) {throw err;}
							console.log('File is created successfully.'); });
						
						require('fs').writeFileSync(wsPath.concat("\\.vscode\\segmentSnippet.code-snippets"), "{ \n", function (err: any) {
							if (err) {throw err;}
							console.log('File is created successfully.'); });

						for(var index = 0; index < documentText.length; index++){
						
							let e = searchText(documentText[index], filePaths[index]);
							

							require('fs').appendFile(wsPath.concat("\\.vscode\\segmentSnippet.code-snippets"), `${e}`, function (err: any) {
								if (err) {throw err;}
								console.log('File is created successfully.'); });
							
							if(index!==documentText.length) {
								require('fs').appendFile(wsPath.concat("\\.vscode\\segmentSnippet.code-snippets"), ",", function (err: any) {
								if (err) {throw err;}
								console.log('File is created successfully.'); });
							}	
						};
						
						require('fs').appendFile(wsPath.concat("\\.vscode\\segmentSnippet.code-snippets"), "}", function (err: any) {
							if (err) {throw err;}
							console.log('File is created successfully.'); });
						//vscode.window.showInformationMessage(`${event_array}`);
					}
			
				};
				
			});	
	});
	context.subscriptions.push(disposable);
}

async function getFiles(): Promise<string[] | null> {

	let paths: string[];
	return workspace.findFiles('**/*.js', '').then(files => {
            
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

function searchText(docText: string, filePaths: string): string[] {

	//let obj = JSON.parse(jsonString);
	
	// regex to see if it's a valid segment event
	let segment_indicator = /(analytics.)((.|\n|))*?(;\n)/g;
	
	let eventArray: string[] = [];  // declaring an array to hold event details
	
	// see if the code we brought in; docText fits the regex
	let searchResult = docText.match(segment_indicator);
	//console.log(`the search result code blocK: " + ${searchResult}`);
	
	// 1. find what kind of segment event it is and if it matches the format of a segment event
	// 2. if yes, then cut the code down to the properties only
	// 3. using match() function, find a list of all the properties or if it is empty
	// 4. if there's more than 0 properties, then add them into a data structure (linked list)
	let is_identify = /(analytics.identify)((.|\n|))*?(;\n)/;
	let is_track = /(analytics.track)((.|\n|))*?(;\n)/;
	let is_page = /(analytics.page)((.|\n|))*?(;\n)/;
	let is_group = /(analytics.group)((.|\n|))*?(;\n)/;
	let event_name: string;
	// if the code has the template of a generic segment event, we now check if they are one of the four types of segment events:
	searchResult?.forEach(item => {
		
		let event_indicator = /(?<=\(\").+?(?=\"\,)/g;
		let prop_indicator = /(?<={)((.|\n|))*?(?=})/g;

		let name = item.match(event_indicator); // manipulating for segment event name and storing it in event_name
		//console.log(`The event name we extracted by using regex: ${name}`);

		if (is_identify.exec(item)) {
			
			let snip = 
			   `${escape(`${item}`)}: {
				"prefix": ["analytics"],
				"body": ${escape(`${item}`)},
				"event_name": ${escape(`${name?.toString()}`)},
				"type" : "identify",
				"file_path" : ${escape(`${filePaths}`)},
				"line_number" : " "
			   }`;			
				
			eventArray.push(snip);
	
		} if (is_track.exec(item)) {
			
			let prop = item.match(prop_indicator);
			let newItem = (item.replace(/"/g, "'")).replace(/(\r\n|\n|\r)/gm, "");
			let snip = 
			`"${name?.toString()}": {
				"prefix": ["analytics"],
				"body": "${newItem}",
			   }`;
			
			eventArray.push(snip);

		}

		if (is_page.exec(item)) {
			let prop = item.match(prop_indicator);
			let snip = 
			  `${escape(`${item}`)}: {
				"prefix": ["analytics"],
				"body": ${escape(`${item}`)},
				"event_name": ${escape(`${name?.toString()}`)},
				"type" : "identify",
				"property" : ${escape(`${prop?.toString()}`)},
				"file_path" : ${escape(`${filePaths}`)},
				"line_number" : " "
			   }`;
			
			eventArray.push(snip);

		} if (is_group.exec(item)) {
			
			let snip = 
			`${escape(`${item}`)}: {
				"prefix": ["analytics"],
				"body": ${escape(`${item}`)},
				"event_name": ${escape(`${name?.toString()}`)},
				"type" : "identify",
				"file_path" : ${escape(`${filePaths}`)},
				"line_number" : " "
			   }`;

			eventArray.push(snip);
		}

	});	
	return eventArray;
	}

// this method is called when your extension is deactivated
export function deactivate() {}