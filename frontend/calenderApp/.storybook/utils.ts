import { http, HttpResponse } from 'msw'

export const getHttpResponse = (url: string, data: any) => {
  return [
    http.get(url, () => {
      return HttpResponse.json(data)
    })
  ]
}
