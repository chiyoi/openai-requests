import { OPENAI_API_ENDPOINT } from '.'
import { OpenAI } from 'openai'
import { EnvAPIKey } from './env'
import * as headers from './headers'

export async function threadsCreate(env: EnvAPIKey) {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...headers.ContentJSON,
      ...headers.AuthorizationAPIKey(env),
      ...headers.OpenAIBeta,
    }
  })
  if (!response.ok) throw new Error(`Threads Create error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Thread
}
