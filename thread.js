self.onmessage = (event) => {
  if (event.data === 'click') {
    postMessage(slowFunction(3000));
  }

  if (event.data === 'terminate') {
    self.close();
  }
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

postMessage(slowFunction(3000));

