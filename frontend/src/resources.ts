import data from "./resources.json"
import { LOCALE } from "./config"

export type Resource = {
  name: string
  url: string
  icon: string
}

// Strip the schemahint
const { $schema: _schemaHint, ...localeBlocks } = data

const byLocale = localeBlocks as Record<string, { resources: Resource[] } | undefined>

export const resources: Resource[] = byLocale[LOCALE]?.resources ?? byLocale.enGb?.resources ?? []
