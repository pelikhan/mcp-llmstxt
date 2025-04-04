import { init } from "./src/llmstxt.mts"

script({
    accept: "none"
})
const { output } = env
const { docs, index } = await init()
output.heading(2, 'indexing')
for (const [id, { url }] of Object.entries(docs)) {
    output.heading(3, id)
    const { ok, text } = await host.fetchText(url + "llms-full.txt")
    if (ok && text) {
        const content = text.replace(
            /^\!\[\]\(<data:image\/svg\+xml,.*$/gm,
            "<!-- mermaid diagram -->"
        )
        await index.insertOrUpdate({
            filename: id,
            content
        })
    }
}