import data from "./resources.json"
import { LOCALE } from "./config"

class Resource {
  name!: string
  url!: string
  icon?: string
}

// Strip the schemahint
const { $schema: _schemaHint, ...localeBlocks } = data;
const byLocale = localeBlocks as Record<string, { resources: Resource[] } | undefined>

export const resources: Resource[] = byLocale[LOCALE]?.resources.map(r => ({...r, icon: `https://www.google.com/s2/favicons?domain=${r.url}&sz=64`})) ?? byLocale.enGb?.resources ?? []
