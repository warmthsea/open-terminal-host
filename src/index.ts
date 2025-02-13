import type { ExtensionContext } from 'vscode'
import { StatusBarAlignment, commands, window } from 'vscode'
import { config } from './config'

// import { StatusBarAlignment, Uri, commands, env, window, workspace } from 'vscode'
// const workspaceFolders = workspace.workspaceFolders
// const cwd = workspaceFolders ? workspaceFolders[0].uri.fsPath : undefined

function getTerminalsInfo() {
  const terminals = window.terminals
  const terminalInfo = terminals.map((terminal) => {
    return {
      name: terminal.name,
      processId: terminal.processId,
      creationOptions: terminal.creationOptions,
    }
  })
  return terminalInfo
}

function runDev() {
  const userTerminal = window.createTerminal('Terminal')
  userTerminal.sendText(config.script)
  userTerminal.show()
}

export function activate(context: ExtensionContext) {
  const statusBar = window.createStatusBarItem(StatusBarAlignment.Left, 2)
  statusBar.command = 'OpenTerminalHost.openProject'
  statusBar.text = '$(inspect)'
  statusBar.tooltip = 'Open Server'
  statusBar.show()

  const openProjectCommand = commands.registerCommand('OpenTerminalHost.openProject', () => {
    // env.openExternal(Uri.parse(url))
    const terminal = getTerminalsInfo()
    if (!terminal.length) {
      runDev()
    }
    else {
      const terminals = window.terminals
      terminals.forEach(terminal => terminal.dispose())
      runDev()
    }
  })

  context.subscriptions.push(openProjectCommand)
}

export function deactivate() {
}
