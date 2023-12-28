import OpenAI from 'openai'
import { OPENAI_API_ENDPOINT } from '.'
import { EnvAPIKey } from './helpers/env'
import { standard } from './helpers/headers'

export async function createThread(params: OpenAI.Beta.ThreadCreateParams, env: EnvAPIKey) {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: standard(env),
    body: JSON.stringify(params),
  })
  if (!response.ok) throw new Error(`Create Thread error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Thread
}
