/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as path from 'path';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands } from 'vscode';

export function getWebviewContent(json_file: vscode.Uri) {
    // html
  // <th> = columns
  // <td> = contents
  //let segment_event_rows = loadContent(json_file);
  // 

  let my_html = `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="jquery-3.4.1.min.js"></script>
	  <title>Your Segment Event Library</title>
  </head>
  <body>
    <table>
      <tr>
        <th>Event ID</th>
        <th>Type</th>
        <th>Event Name</th>
        <th>Property</th>
        <th>Code</th>
        <th>File Path</th>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
      </tr></table></body></html>`;
	return my_html;
  }

// Builds the HTML Table out of myList.
/*
export function loadContent(json_file: string) {
  let html = ``;
  for (var i = 0; i < json_file; i++) {
    var row_start$= $(`<tr>`);
    for (var j = 0; j <json_file[i]; j++) {
        if 
    }
    var row_end$ = $(`</tr>`);
  }

}

*/
