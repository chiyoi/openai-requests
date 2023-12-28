import OpenAI from 'openai'
import { OPENAI_API_ENDPOINT } from '.'
import { standard } from './helpers/headers'
import { EnvAPIKey } from './helpers/env'
import { withQuery } from './helpers/query'
import { Pager } from './helpers/pager'

export async function createMessage(thread_id: string, params: OpenAI.Beta.Threads.MessageCreateParams, env: EnvAPIKey) {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads/${thread_id}/messages`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: standard(env),
    body: JSON.stringify(params)
  })
  if (!response.ok) throw new Error(`Create Message error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Threads.ThreadMessage
}

export async function listMessages(thread_id: string, params: OpenAI.Beta.Threads.MessageListParams, env: EnvAPIKey) {
  const endpoint = withQuery(`${OPENAI_API_ENDPOINT}/threads/${thread_id}/messages`, params)
  const response = await fetch(endpoint, { headers: standard(env) })
  if (!response.ok) throw new Error(`List Messages error: ${await response.text()}`)
  return await response.json() as Pager<OpenAI.Beta.Threads.ThreadMessage>
}
