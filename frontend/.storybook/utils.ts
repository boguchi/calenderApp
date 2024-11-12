import { http, HttpResponse } from 'msw'

/**
 * mswのhandlersを作成
 * @param url - リクエスト先のURL
 * @param data - mock用のデータ
 *
 * @see 使用例\
 * parameters: {\
 * msw: {\
 * handlers: getHttpResponse('url', data)\
 * }\
 * }
 */
export const getHttpResponse = (url: string, data: any) => {
  return [
    http.get(url, () => {
      return HttpResponse.json(data)
    })
  ]
}
