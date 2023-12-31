import { createAssistant, createMessage, createRun, createThread, listMessages, retrieveRun } from './src'
import { EnvAPIKey } from './src/internal/env'
import { IRequest, Router, error, json } from 'itty-router'

export default {
  fetch: (request: Request, env: EnvAPIKey, ctx: ExecutionContext) => router()
    .handle(request, env, ctx)
    .catch(error),
}

function router() {
  const router = Router()
  router.all('/ping', () => new Response('Pong!'))
  router.all('/example', example)
  router.all('*', () => error(404, 'Endpoint not exist.'))
  return router
}

async function example(request: IRequest, env: EnvAPIKey) {
  console.debug('Example: Create an assistant, a thread, add a message, run the threads and get the response.')
  const assistant = await createAssistant(env, {
    name: "Math Tutor",
    instructions: "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-1106-preview",
  })
  console.debug(`Assistant created: ${assistant.id}`)
  const thread = await createThread(env, {})
  console.debug(`Thread created: ${thread.id}`)
  const message = await createMessage(thread.id, env, {
    role: "user",
    content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
  })
  console.debug(`Message created: ${message.id}`)
  let run = await createRun(thread.id, env, {
    assistant_id: assistant.id,
    instructions: "Please address the user as Jane Doe. The user has a premium account.",
  })
  console.debug(`Run created: ${run.id}`)
  while (run.status !== 'completed') run = await retrieveRun(thread.id, run.id, env)
  console.debug(`Run completed.`)
  const messages = await listMessages(thread.id, env, {})
  return json(messages)
}
