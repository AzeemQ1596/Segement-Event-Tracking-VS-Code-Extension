/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as path from 'path';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands } from 'vscode';
import { stringify } from 'querystring';
//json_file: vscode.Uri)
export function getWebviewContent(json_Uri: vscode.Uri) {
   

    vscode.window.showInformationMessage(`Webview open`);
    let file_path = json_Uri.fsPath;
    let event_Json = require('fs').readFileSync(file_path, 'utf-8');
    let event_array = [JSON.parse(`${event_Json}`)];
    vscode.window.showInformationMessage(`Success! ${event_Json} segment events found`);
  
    return `<html lang="en">
  
    <head>
        <meta charset="UTF-8">
        <title>Segment Report</title>
        <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
        <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
        <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" </script>
        <script src = "https://code.jquery.com/ui/1.12.1/jquery-ui.css"</script>
    
      
        </head>
            
        <body>
        <div id="jsGrid"></div>
        <script>
            const vscode = acquireVsCodeApi()
           
            
            $("#jsGrid").jsGrid({
                width: "auto",
                height: "400px",
        
                filtering: true,
                editing: false,
                inserting: false,
                sorting: true,
                paging: true,
                autoload: true,
                controller: {

                   
                    insertItem: $.noop,
                    updateItem: $.noop,
                    deleteItem: $.noop
                },
                data: ${event_Json},
                autosearch: true,  
                readOnly: true, 
                fields: [
                    { name: "eventID", type: "text"},
                    { name: "eventName", type: "text" },
                    { name: "category", type: "text"},
                    { name: "type", type: "text"},
                    { name: "property", type: "text", width: "auto"},
                    { name: "filePath", type: "text"},
                    { name: "lineNumber", type: "number"},
                    { name: "code", type: "text"}
                ]
            }).filterToolbar({
                "stringResult": true,
                "searchOperators": true
            });
        </script>
        </body>
        </html>`;
  }