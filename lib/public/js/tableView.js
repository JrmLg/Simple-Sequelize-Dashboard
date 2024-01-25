console.log("I'm on client side")

async function test() {
  const res = await fetch(window.location.href + '/api')
  const data = await res.json()

  console.log(data)
}

test()
