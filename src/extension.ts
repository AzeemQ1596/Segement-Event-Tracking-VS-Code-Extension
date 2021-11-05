/* eslint-disable @typescript-eslint/naming-convention */
var fs = require('fs');
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
		
		const homedir = require('os').homedir();
		let snippetPath = homedir.toString().concat("\\code\\segment-event-tracking\\segment_snippets.json");
		let snippetUri = vscode.Uri.file(snippetPath);
		const encoder = new TextEncoder();
		//workspace.fs.writeFile(snippetUri, encoder.encode(" "));
		require('fs').writeFileSync(snippetPath, "sgdihs;fsd");	
		
		await getFiles().then(async filePaths => {
		if(filePaths === null) {

				vscode.window.showErrorMessage("Error! Workspace is undefined. Please select a workspace.");
				console.error("Error! Workspace is undefined. Please select a workspace.");
			}
			else {
					vscode.window.showInformationMessage(`${filePaths}`);
					let documentText = await readFiles(filePaths);
					for(var index = 0; index < documentText.length; index++){
						
						searchText(documentText[index]);
					};
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

async function searchText(docText: string) {

	//let obj = JSON.parse(jsonString);
	// 1) Identify
	interface identify_obj {
		userId : string;
		type : string;
		file_name : number;
		line_beginning : number;
		line_end : string;
	}

	// 2) Group
	interface group_obj {
		groupId : string;
		type : string;
		file_name : number;
		line_beginning : number;
		line_end : string;
	}

	// 1&2) Both can have traits that we can add 
	interface trait_obj {
		trait : string
	}

	// 3) Track
	interface track_obj {
		event_name : string;
		type : string;
		file_name : number;
		line_beginning : number;
		line_end : string;
		property : string[];
	}

	// 4) Page
	interface page_obj {
		event_name : string;
		category : string;
		type : string;
		file_name : number;
		line_beginning : number;
		line_end : string;
		property : string[];
	}

	
	// regex to see if it's a valid segment event
	let segment_indicator = /(analytics.)((.|\n|))*?(;\n)/g;
	
	// let code be a string 
	let code: string[];
	
	// see if the code we brought in; docText fits the regex
	let searchResult = docText.match(segment_indicator);
	console.log(`the search result code blocK: " + ${searchResult}`);
	
	let events: string[]; // declaring an array to hold event details

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

		if (is_identify.exec(item)) {
			return null;

		} if (is_track.exec(item)) {
			// Output: an array and return with: event name, properties, event type
			// so we can now find the file name and line number
		
			// 1) Find event name or if it's null
			let track_event_indicator = /(?<=\(\").+?(?=\"\,)/; // regex to manipulate for segment event name
			
			let name = track_event_indicator.exec(item); // manipulating for segment event name and storing it in event_name
			console.log(`The event name we extracted by using regex: ${name}`);
			//track_event.push(event_name); // adding the event name to the array
			//console.log("The track event array after adding the event name: " + track_event);
			return name;

		}

			//let obj: MyObj = JSON.parse('{ "eventName": e}') taking this out for now
			// 2) Find properties
			/*
			for (let i = 0; i < code.length; i++) {
				
				i++
			}*/
			
		if (is_page.exec(docText)) {
			return null;

		} if (is_group.exec(docText)) {
			return null;

		}
	
	});
	
	}

// this method is called when your extension is deactivated
export function deactivate() {}