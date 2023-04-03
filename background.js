chrome.contextMenus.create({
    id: "monaco-open",
    title: `Open Monaco Editor`,
    contexts: ["page"]
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "monaco-open") {
        open_monaco_editor(tab)
    }
})

async function open_monaco_editor(tab) {
    let initialized = (await executeFunc(toggle_monaco_container, [], tab.id))[0].result

    if (!initialized) {
        await injectFiles(tab.id, [
            'monaco-editor/min/vs/editor/editor.main.nls.js',
            'monaco-editor/min/vs/editor/editor.main.js'
        ])
    
        await injectFiles(tab.id, monaco_language_files)
        
        executeFunc(() => {
            init_monaco_editor()
        }, [], tab.id)
    }
}

function toggle_monaco_container() {
    let initialized = true

    let container = document.getElementById('monaco-container')
    if (!container) {
        initialized = false

        container = document.createElement("div")
        container.id = 'monaco-container'
        container.style.position = "fixed"
        container.style.top = "50%"
        container.style.left = "50%"
        container.style.transform = "translate(-50%, -50%)"
        container.style.width = "800px"
        container.style.height = "500px"
        container.style.outline = "dashed"
        container.style.outlineOffset = "+10pxx"

        document.body.appendChild(container)

        window.addEventListener('click', function (e) {
            if (container.style.display !== "none" && !container.contains(e.target)) {
                container.style.display = "none"
            }
        })

        let root_path = chrome.runtime.getURL("")
        require.config({
            paths: {
                vs: root_path + 'monaco-editor/min/vs'
            }
        })
    } else if (container.style.display === "none") {
        container.style.display = "block"
    } else {
        container.style.display = "none"
    }

    return initialized
}


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

const monaco_language_files = [
    'monaco-editor/min/vs/basic-languages/abap/abap.js',
    'monaco-editor/min/vs/basic-languages/apex/apex.js',
    'monaco-editor/min/vs/basic-languages/azcli/azcli.js',
    'monaco-editor/min/vs/basic-languages/bat/bat.js',
    'monaco-editor/min/vs/basic-languages/bicep/bicep.js',
    'monaco-editor/min/vs/basic-languages/cameligo/cameligo.js',
    'monaco-editor/min/vs/basic-languages/clojure/clojure.js',
    'monaco-editor/min/vs/basic-languages/coffee/coffee.js',
    'monaco-editor/min/vs/basic-languages/cpp/cpp.js',
    'monaco-editor/min/vs/basic-languages/csharp/csharp.js',
    'monaco-editor/min/vs/basic-languages/csp/csp.js',
    'monaco-editor/min/vs/basic-languages/css/css.js',
    'monaco-editor/min/vs/basic-languages/cypher/cypher.js',
    'monaco-editor/min/vs/basic-languages/dart/dart.js',
    'monaco-editor/min/vs/basic-languages/dockerfile/dockerfile.js',
    'monaco-editor/min/vs/basic-languages/ecl/ecl.js',
    'monaco-editor/min/vs/basic-languages/elixir/elixir.js',
    'monaco-editor/min/vs/basic-languages/flow9/flow9.js',
    'monaco-editor/min/vs/basic-languages/freemarker2/freemarker2.js',
    'monaco-editor/min/vs/basic-languages/fsharp/fsharp.js',
    'monaco-editor/min/vs/basic-languages/go/go.js',
    'monaco-editor/min/vs/basic-languages/graphql/graphql.js',
    'monaco-editor/min/vs/basic-languages/handlebars/handlebars.js',
    'monaco-editor/min/vs/basic-languages/hcl/hcl.js',
    'monaco-editor/min/vs/basic-languages/html/html.js',
    'monaco-editor/min/vs/basic-languages/ini/ini.js',
    'monaco-editor/min/vs/basic-languages/java/java.js',
    'monaco-editor/min/vs/basic-languages/javascript/javascript.js',
    'monaco-editor/min/vs/basic-languages/julia/julia.js',
    'monaco-editor/min/vs/basic-languages/kotlin/kotlin.js',
    'monaco-editor/min/vs/basic-languages/less/less.js',
    'monaco-editor/min/vs/basic-languages/lexon/lexon.js',
    'monaco-editor/min/vs/basic-languages/liquid/liquid.js',
    'monaco-editor/min/vs/basic-languages/lua/lua.js',
    'monaco-editor/min/vs/basic-languages/m3/m3.js',
    'monaco-editor/min/vs/basic-languages/markdown/markdown.js',
    'monaco-editor/min/vs/basic-languages/mips/mips.js',
    'monaco-editor/min/vs/basic-languages/msdax/msdax.js',
    'monaco-editor/min/vs/basic-languages/mysql/mysql.js',
    'monaco-editor/min/vs/basic-languages/objective-c/objective-c.js',
    'monaco-editor/min/vs/basic-languages/pascal/pascal.js',
    'monaco-editor/min/vs/basic-languages/pascaligo/pascaligo.js',
    'monaco-editor/min/vs/basic-languages/perl/perl.js',
    'monaco-editor/min/vs/basic-languages/pgsql/pgsql.js',
    'monaco-editor/min/vs/basic-languages/php/php.js',
    'monaco-editor/min/vs/basic-languages/pla/pla.js',
    'monaco-editor/min/vs/basic-languages/postiats/postiats.js',
    'monaco-editor/min/vs/basic-languages/powerquery/powerquery.js',
    'monaco-editor/min/vs/basic-languages/powershell/powershell.js',
    'monaco-editor/min/vs/basic-languages/protobuf/protobuf.js',
    'monaco-editor/min/vs/basic-languages/pug/pug.js',
    'monaco-editor/min/vs/basic-languages/python/python.js',
    'monaco-editor/min/vs/basic-languages/qsharp/qsharp.js',
    'monaco-editor/min/vs/basic-languages/r/r.js',
    'monaco-editor/min/vs/basic-languages/razor/razor.js',
    'monaco-editor/min/vs/basic-languages/redis/redis.js',
    'monaco-editor/min/vs/basic-languages/redshift/redshift.js',
    'monaco-editor/min/vs/basic-languages/restructuredtext/restructuredtext.js',
    'monaco-editor/min/vs/basic-languages/ruby/ruby.js',
    'monaco-editor/min/vs/basic-languages/rust/rust.js',
    'monaco-editor/min/vs/basic-languages/sb/sb.js',
    'monaco-editor/min/vs/basic-languages/scala/scala.js',
    'monaco-editor/min/vs/basic-languages/scheme/scheme.js',
    'monaco-editor/min/vs/basic-languages/scss/scss.js',
    'monaco-editor/min/vs/basic-languages/shell/shell.js',
    'monaco-editor/min/vs/basic-languages/solidity/solidity.js',
    'monaco-editor/min/vs/basic-languages/sophia/sophia.js',
    'monaco-editor/min/vs/basic-languages/sparql/sparql.js',
    'monaco-editor/min/vs/basic-languages/sql/sql.js',
    'monaco-editor/min/vs/basic-languages/st/st.js',
    'monaco-editor/min/vs/basic-languages/swift/swift.js',
    'monaco-editor/min/vs/basic-languages/systemverilog/systemverilog.js',
    'monaco-editor/min/vs/basic-languages/tcl/tcl.js',
    'monaco-editor/min/vs/basic-languages/twig/twig.js',
    'monaco-editor/min/vs/basic-languages/typescript/typescript.js',
    'monaco-editor/min/vs/basic-languages/vb/vb.js',
    'monaco-editor/min/vs/basic-languages/xml/xml.js',
    'monaco-editor/min/vs/basic-languages/yaml/yaml.js'
]