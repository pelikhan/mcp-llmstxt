export async function init() {
    const configFilename = "./llmstxt.json"
    const defaultCacheName = "llmstxt"

    const config: {
        docs: Record<string, { url: string }>
        indexName?: string
        indexOptions?: VectorIndexOptions
    } = await workspace.readJSON(configFilename)
    if (!config) {
        await workspace.writeText(configFilename, JSON.stringify({ urls: {} }, null, 2))
        cancel(`please configure ${configFilename} with urls`)
    }
    const { docs, indexName = "llmstxt", indexOptions = { cacheName: defaultCacheName, pageSeparator: "=!=!=!=!=!=", chunkSize: 500, chunkOverlap: 100 } } = config
    const index = await retrieval.index(indexName, indexOptions)

    return { docs, index }
}