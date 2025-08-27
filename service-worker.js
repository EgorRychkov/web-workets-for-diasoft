const cache = {
  result: null
};

const slowFunction = (timeout = 3000) => {
  let start = performance.now();
  let x = 0;
  let i = 0;

  do {
    i += 1;
    x += (Math.random() - 0.5) * i;
  } while (performance.now() - start < timeout);

  return x;
}

const recalculate = (timeout) => {
  cache.result = slowFunction(timeout);
  return cache.result;
}

const getCachedResult = (timeout) => {
  const cachedResult = cache.result;

  if (cachedResult) {
    return cachedResult;
  } else {
    return recalculate(timeout);
  }
}

const broadcast = async (msg) => {
  const clients = await self.clients.matchAll();

  for (const client of clients) {
    client.postMessage(msg);
  }
}

self.addEventListener('activate', async (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('message', async (event) => {
  if (event.data?.action === "getCached") {
    const result = getCachedResult(event.data.timeout);
    await broadcast(result + ' getCached');
  }

  if (event.data?.action === "recalculate") {
    const result = recalculate(event.data.timeout);
    await broadcast(result + ' recalculate');
  }
});
