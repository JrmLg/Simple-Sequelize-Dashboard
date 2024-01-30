async function parseJson(res) {
  try {
    const json = await res.json()
    return {
      data: json,
      status: res.status,
      ok: res.ok,
      statusText: res.statusText,
      error: json?.error || '',
    }
  } catch (err) {
    console.log("Can't parse json : ", err)
  }
}

async function parseFile(res) {
  try {
    return await res.blob()
  } catch (err) {
    console.log("Can't parse file : ", err)
  }
}

async function fetchBackend({ method, url, data, parsingStrategy }) {
  const headers = {
    Accept: 'application/json',
  }

  let body = null
  if (data) {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
    body = JSON.stringify(data)
  }

  try {
    const res = await fetch(url, { method, headers, body })

    if (res.redirected) throw new Error('Bad url : ' + url)

    if (!res.ok) {
      console.log('Bad response : ', res, 'At url :', url)
      return res
    }

    if (parsingStrategy) {
      return await parsingStrategy(res)
    } else {
      return res
    }
  } catch (err) {
    console.log('Error on fetchBackend: ', err, 'At url :', url)
  }
}

function expandUrl(url) {
  if (url.startsWith('./')) {
    return url.replace('.', window.location.href)
  }
  return url
}

const backend = {
  async get(url) {
    return fetchBackend({
      method: 'GET',
      url: expandUrl(url),
    })
  },

  async getFile(url) {
    return fetchBackend({
      method: 'GET',
      parsingStrategy: parseFile,
      url: expandUrl(url),
    })
  },

  async post(url, data) {
    return fetchBackend({
      method: 'POST',
      parsingStrategy: parseJson,
      url: expandUrl(url),
      data,
    })
  },
}

export default backend
