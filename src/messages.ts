import OpenAI from 'openai'
import { OPENAI_API_ENDPOINT } from '.'
import { standard } from './internal/headers'
import { EnvAPIKey } from './internal/env'
import { withQuery } from './internal/query'
import { Pager } from './internal/pager'

export const createMessage = async (thread_id: string, env: EnvAPIKey, params: OpenAI.Beta.Threads.MessageCreateParams) => {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads/${thread_id}/messages`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: standard(env),
    body: JSON.stringify(params)
  })
  if (!response.ok) throw new Error(`Create Message error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Threads.ThreadMessage
}

export const listMessages = async (thread_id: string, env: EnvAPIKey, params: OpenAI.Beta.Threads.MessageListParams) => {
  const endpoint = withQuery(`${OPENAI_API_ENDPOINT}/threads/${thread_id}/messages`, params)
  const response = await fetch(endpoint, { headers: standard(env) })
  if (!response.ok) throw new Error(`List Messages error: ${await response.text()}`)
  return await response.json() as Pager<OpenAI.Beta.Threads.ThreadMessage>
}
