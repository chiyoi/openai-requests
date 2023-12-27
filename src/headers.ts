import { EnvAPIKey } from './env'

export const OpenAIBeta: HeadersInit = {
  'OpenAI-Beta': 'assistants=v1',
}

export const AuthorizationAPIKey: (env: EnvAPIKey) => HeadersInit = (env) => ({
  Authorization: `Bearer ${env.OPENAI_API_KEY}`,
})

export const ContentJSON: HeadersInit = {
  'Content-Type': 'application/json',
}
