self.onmessage = (event) => {
  const thread2 = new Worker("./thread2.js");

  thread2.postMessage({ timeout: event.data.timeout || 3000 });

  thread2.onmessage = (event) => {
    self.postMessage(event.data);
  }
};
