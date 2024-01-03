import OpenAI from 'openai'
import { OPENAI_API_ENDPOINT } from '.'
import { EnvAPIKey } from './helpers/env'
import { standard } from './helpers/headers'

export const createAssistant = async (env: EnvAPIKey, params: OpenAI.Beta.AssistantCreateParams) => {
  const endpoint = `${OPENAI_API_ENDPOINT}/assistants`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: standard(env),
    body: JSON.stringify(params),
  })
  if (!response.ok) throw new Error(`Create Assistant error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Assistant
}
