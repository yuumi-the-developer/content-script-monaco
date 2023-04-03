function init_monaco_editor() {
    monaco.editor.create(document.getElementById('monaco-container'), {
        value: monaco_script,
        language: 'markdown',
        theme: "vs-dark"
    })
}


const monaco_script = `
\`\`\`javascript
function executeFunc(func, args, id, callback) {
    return chrome.scripting.executeScript(
        {
            target: { tabId: id },
            func: func,
            args: args,
            world: "ISOLATED"
        }, callback)
}

function injectFiles(id, files) {
    return chrome.scripting.executeScript(
        {
            target: { tabId: id },
            files: files,
            world: "ISOLATED"
        })
}
\`\`\`
`