/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as path from 'path';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands } from 'vscode';

export function getWebviewContent(json_file_path) {
    // html
  // <th> = columns
  // <td> = contents

  var segment_event_rows_array = require(json_file_path);
  let segment_event_rows = loadContent(segment_event_rows_array);
  // 

  let my_html = `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Your Segment Event Library</title>
  </head>
  <body>
    <table>
      <tr>
        <th>Event ID</th>
        <th>Category</th>
        <th>Event Name</th>
        <th>Code</th>
        <th>Type</th>
        <th>Property</th>
        <th>File Path</th>
      </tr>
      <tr>
        <td>tr_10s_680</td>
        <td>null</td>
        <td>10sales_account_connected</td>
        <td>analytics.track('10sales_account_connected',{plan:'spotify',accountType:'logistics'});</td>
        <td>track</td>
        <td>property":"plan:'spotify',accountType:'logistics'</td>
        <td>jquery-3.4.1.min.js</td>
      </tr>` + segment_event_rows +`</table></body></html>`
	return my_html;
  }

/*
{"eventID":"tr_10s_680",
  "category":"",
  "eventName":"10sales_account_connected'",
  "code":"analytics.track('10sales_account_connected',{plan:'spotify',accountType:'logistics'});",
  "type":"track",
  "property":"plan:'spotify',accountType:'logistics'",
  "filePath":"jquery-3.4.1.min.js"},


*/


// Builds the HTML Table out of myList.
export function loadContent(json_file) {
  let html = ``;
  for (var i = 0; i < json_file; i++) {
    var row_start$= $(`<tr>`);
    let content = ``;
    for (var j = 0; j <json_file[i]; j++) {
      content + ``;
        
    }
    var row_end$ = $(`</tr>`);
    let row = row_start$ + content + row_end$;
    html + row_end$;
  }

}


