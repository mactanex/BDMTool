"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalManager = void 0;
const vscode = require("vscode");
class TerminalManager {
    constructor() {
        this.nextTerminalId = 1;
    }
    async createBDMProjectTerminal(groupId, projectId) {
        const terminal = vscode.window.createTerminal(`BDM Terminal #${this.nextTerminalId++}`);
        const command = `mvn org.apache.maven.plugins:maven-archetype-plugin:3.1.2:generate -DgroupId="${groupId}" -DartifactId="${projectId}"  -DarchetypeArtifactId="archetype" -DarchetypeGroupId="com.bdm" -DarchetypeVersion="1.1.0" -DinteractiveMode=false`;
        terminal.sendText(command);
        terminal.sendText("exit 0");
        terminal.show();
        let i = 0;
        let pathW = '';
        vscode.workspace.workspaceFolders?.forEach(test => {
            if (i === 0) {
                pathW = test.uri.fsPath;
            }
        });
        let uri = vscode.Uri.file(pathW + `/${projectId}`);
        vscode.window.onDidCloseTerminal(async (t) => {
            await vscode.commands.executeCommand("vscode.openFolder", uri);
            if (t.exitStatus && t.exitStatus.code) {
                vscode.window.showInformationMessage(`Exit code: ${t.exitStatus.code}`);
            }
        });
    }
    async runTests() {
        const terminal = vscode.window.createTerminal(`BDM Terminal #${this.nextTerminalId++}`);
        terminal.sendText("mvn test");
        terminal.show();
    }
}
exports.TerminalManager = TerminalManager;
//# sourceMappingURL=TerminalManager.js.map