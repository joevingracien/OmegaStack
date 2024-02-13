import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from '@sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {locate} from './presentation/locate'

export default defineConfig({
  name: 'default',
  title: 'Sanity',

  projectId: 'lskyzkda',
  dataset: 'production',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: 'http://localhost:5173/',
      locate,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
