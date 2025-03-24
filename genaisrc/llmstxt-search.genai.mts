import { init } from "./src/llmstxt.mts"

script({
    accept: "none",
    parameters: {
        question: {
            type: "string",
            description: "the question to ask to the documentations",
            required: true
        }
    }
})

const { vars, output, dbg } = env
const { question } = vars
const { index, searchOptions } = await init()
const docs = await index.search(question, searchOptions)
docs.sort((l, r) => l.filename.localeCompare(r.filename))
for (const doc of docs) {
    dbg(`chunk ${doc.content.length}c, ${doc.score}`)
}
output.appendContent(docs.map(({ content }) => content).join("\n\n"))
