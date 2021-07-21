import { NextApiHandler } from 'next'
import {
  apiResolver,
  __ApiPreviewProps,
} from 'next/dist/next-server/server/api-utils'
import { RequestOptions, createMocks } from 'node-mocks-http'

const API_PREVIEW_PROPS: __ApiPreviewProps = {
  previewModeId: 'preview-mode-id',
  previewModeSigningKey: 'signing-key',
  previewModeEncryptionKey: 'encryption-key',
}

/**
 * Returns the `Response` of the API route handler
 * given a particular request.
 */
export async function testApiHandler(
  handler: NextApiHandler,
  requestOptions?: RequestOptions
): Promise<Response> {
  const { req, res } = createMocks(requestOptions)
  await apiResolver(req, res, '', handler, API_PREVIEW_PROPS, false)

  return new Response(res._getData(), {
    status: res.statusCode,
    statusText: res.statusMessage,
    headers: res._getHeaders() as HeadersInit,
  })
}
