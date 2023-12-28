import OpenAI from 'openai'
import { OPENAI_API_ENDPOINT } from '.'
import { AuthorizationAPIKey, OpenAIBetaAssistants, standard } from './helpers/headers'
import { EnvAPIKey } from './helpers/env'
import { Pager } from './helpers/pager'
import { withQuery } from './helpers/query'

export async function createRun(thread_id: string, params: OpenAI.Beta.Threads.RunCreateParams, env: EnvAPIKey) {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads/${thread_id}/runs`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: standard(env),
    body: JSON.stringify(params),
  })
  if (!response.ok) throw new Error(`Create Run error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Threads.Run
}

export async function listRunSteps(thread_id: string, run_id: string, params: OpenAI.Beta.Threads.Runs.StepListParams, env: EnvAPIKey) {
  const endpoint = withQuery(`${OPENAI_API_ENDPOINT}/threads/${thread_id}/runs/${run_id}/steps`, params)
  const response = await fetch(endpoint, { headers: standard(env) })
  if (!response.ok) throw new Error(`List Run Steps error: ${await response.text()}`)
  return await response.json() as Pager<OpenAI.Beta.Threads.Runs.Steps.RunStep>
}

export async function retrieveRun(thread_id: string, run_id: string, env: EnvAPIKey) {
  const endpoint = `${OPENAI_API_ENDPOINT}/threads/${thread_id}/runs/${run_id}`
  const response = await fetch(endpoint, {
    headers: {
      ...AuthorizationAPIKey(env),
      ...OpenAIBetaAssistants,
    },
  })
  if (!response.ok) throw new Error(`Retrieve Run error: ${await response.text()}`)
  return await response.json() as OpenAI.Beta.Threads.Run
}

export async function submitToolOutputsToRun() { } // Working

export async function cancelRun() { } // Working