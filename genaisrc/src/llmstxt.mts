export async function init() {
    const configFilename = "./llmstxt.json"
    const defaultCacheName = "llmstxt"

    const config: {
        urls: Record<string, string>
        indexName?: string
        indexOptions?: VectorIndexOptions
    } = await workspace.readJSON(configFilename)
    if (!config) {
        await workspace.writeText(configFilename, JSON.stringify({ urls: {} }, null, 2))
        cancel(`please configure ${configFilename} with urls`)
    }
    const { urls, indexName = "llmstxt", indexOptions = { cacheName: defaultCacheName } } = config
    const index = await retrieval.index(indexName, indexOptions)

    return { urls, index }
}