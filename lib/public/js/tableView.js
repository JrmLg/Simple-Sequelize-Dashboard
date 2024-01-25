console.log("I'm on client side")

async function test() {
  const result = await fetch(window.location.href + '/api')
  console.log(result)
}

test()
