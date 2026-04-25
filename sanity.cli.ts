import { defineCliConfig } from 'sanity/cli'

const projectId = '4w0mj8fg'
const dataset = 'production'

export default defineCliConfig({ api: { projectId, dataset } })
