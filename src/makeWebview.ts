/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands } from 'vscode';

export function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  <script>

 
      $("#jsGrid").jsGrid({
          height: "90%",
          width: "100%",
   
          filtering: true,
          editing: true,
          sorting: true,
          paging: true,
          autoload: true,
   
          pageSize: 15,
          pageButtonCount: 5,
   
          deleteConfirm: "Do you really want to delete the client?",
   
          controller: db,
   
          fields: [
              { name: "Name", type: "text", width: 150 },
              { name: "Age", type: "number", width: 50 },
              { name: "Address", type: "text", width: 200 },
              { name: "Country", type: "select", items: db.countries, valueField: "Id", textField: "Name" },
              { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
              { type: "control" }
          ]
      });
   
    </script>
  </body>
  </html>`;
  }