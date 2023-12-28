import { OPENAI_API_ENDPOINT } from '.'
import { OpenAI } from 'openai'
import { EnvAPIKey } from './helpers/env'
import * as headers from './helpers/headers'
import { Pager, PagerQuery, attachPagerQuery } from './helpers/pager'

export async function createThread(env: EnvAPIKey, options?: {
  messages?: OpenAI.Beta.Threads.Messages.ThreadMessage[],
  metadata?: { [key: string]: string },
}) {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers.standard(env),
    ...(options !== undefined && { body: JSON.stringify({ ...options }) }),
  })
  if (!response.ok) throw new Error(`Create Thread error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Thread
}

export async function createMessage(thread_id: string, role: 'user', content: string, env: EnvAPIKey, options?: {
  file_ids?: string[],
  metadata?: { [key: string]: string },
}) {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads/${thread_id}/messages`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers.standard(env),
    body: JSON.stringify({ role, content, ...options })
  })
  if (!response.ok) throw new Error(`Create Message error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Threads.ThreadMessage
}

export async function listMessages(thread_id: string, env: EnvAPIKey, query?: PagerQuery) {
  const endpoint = attachPagerQuery(`${OPENAI_API_ENDPOINT}/threads/${thread_id}/messages`, query)
  const response = await fetch(endpoint, { headers: headers.standard(env) })
  if (!response.ok) throw new Error(`List Messages error: ${await response.text()}`)
  return await response.json() as Pager<OpenAI.Beta.Threads.ThreadMessage>
}

export async function createRun(thread_id: string, assistant_id: string, env: EnvAPIKey, options?: {
  model?: string,
  instructions?: string,
  additional_instructions?: string,
  tools?: (OpenAI.Beta.Assistant.CodeInterpreter | OpenAI.Beta.Assistant.Retrieval | OpenAI.Beta.Assistant.Function)[],
  metadata?: { [key: string]: string },
}) {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads/${thread_id}/runs`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers.standard(env),
    body: JSON.stringify({ assistant_id, ...options })
  })
  if (!response.ok) throw new Error(`Create Run error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Threads.Run
}

export async function listRunSteps() { } // Working

export async function retrieveRun(thread_id: string, run_id: string, env: EnvAPIKey) {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads/${thread_id}/runs/${run_id}`
  const response = await fetch(endpoint, {
    headers: {
      ...headers.AuthorizationAPIKey(env),
      ...headers.OpenAIBetaAssistants,
    },
  })
  if (!response.ok) throw new Error(`Retrieve Run error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Threads.Run
}

export async function submitToolOutputsToRun() { } // Working

export async function cancelRun() { } // Working
