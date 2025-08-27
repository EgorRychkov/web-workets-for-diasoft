self.onmessage = (event) => {
  self.postMessage(slowFunction(event.data.timeout || 3000));
};

const slowFunction = (timeout = 3000) => {
  let start = performance.now();
  let x = 0;
  let i = 0;

  do {
    i += 1;
    x += (Math.random() - 0.5) * i;
  } while (performance.now() - start < timeout);

  return x + ' thread2.js';
}

