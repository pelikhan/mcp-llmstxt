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
const { index } = await init()
const docs = await index.search(question, { topK: 20 })
let tokens = 0
//output.appendContent("``````")
for (const doc of docs) {
    dbg(`chunk ${doc.content.length}c, ${doc.score}`)
    output.itemValue("" + tokens++, doc.score)
//    output.appendContent(doc.content + "\n\n")
    //   tokens = tokens + parsers.tokens(doc.content)
    //  if (tokens > 20000)
    //     break
}
//output.appendContent("``````")
