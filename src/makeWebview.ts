/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as path from 'path';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands } from 'vscode';
import { stringify } from 'querystring';
//json_file: vscode.Uri)
export function getWebviewContent(json_Uri: vscode.Uri, colorTheme: string): string {
   

    //let colorTheme: string = ``;
    let file_path = json_Uri.fsPath;
    let event_Json = require('fs').readFileSync(file_path, 'utf-8');
    
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

        <style>
            ${colorTheme}
        </style>

        <div id="jsGrid"></div>
        <script>
            const vscode = acquireVsCodeApi();
           
            
            $("#jsGrid").jsGrid({
    
                width: "100%",
                height: "100%",
                filtering: true,
                sorting: true,
                clearFilterButton: true, 
                paging: true,
                data: ${event_Json},
                autosearch: true,
                readOnly: true, 
                fields: [
                    { title: "Event ID", name: "eventID", type: "text", width: 50},
                    { title: "Event name", name: "eventName", type: "text", width: 80},
                    { title: "Category",name: "category", type: "text", width: 50},
                    { title: "Type", name: "type", type: "text", width: 25},
                    { title: "Property", name: "property", type: "text", width: 125},
                    { title: "File Path", name: "filePath", type: "text", width: 100 },
                    { title: "Line Number", name: "lineNumber", type: "number", width: 25},
                    { title: "Code", name: "code", type: "text"}
                
                ],
                rowDoubleClick: function(args) { 
                    vscode.postMessage({
                    command: 'alert',
                    line: (args.item).lineNumber,
                    path: (args.item).filePath})
                }
            
        });
        </script>
        </body>
        </html>`;
  }