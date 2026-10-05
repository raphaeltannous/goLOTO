// Fetch and instantiate WASM.
export const instantiateWASM = async (wasmModuleURL, importObject) => {
  let response = undefined;

  if (WebAssembly.instantiateStreaming) {
    response = await WebAssembly.instantiateStreaming(
      fetch(wasmModuleURL),
      importObject,
    );
  } else {
    const fetchAndInstantiate = async () => {
      const wasmBuffer = await fetch(wasmModuleURL).then(response => response.arrayBuffer());
      return WebAssembly.instantiate(wasmBuffer, importObject);
    };

    response = await fetchAndInstantiate();
  };

  return response;
}

const go = new Go();

const runWasm = async () => {
  const importObject = go.importObject;

  const wasmModule = await instantiateWASM("../goLOTO.wasm", importObject);

  go.run(wasmModule.instance);

  function setNextFetch() {
    const now = new Date();
    const currentSeconds = now.getSeconds();
    const currentMilliseconds = now.getMilliseconds();

    let targetSeconds;
    if (currentSeconds < 1) {
      targetSeconds = 1;
    } else if (currentSeconds < 31) {
      targetSeconds = 31;
    } else {
      targetSeconds = 61;
     }


     const delay = ((targetSeconds - currentSeconds) * 1000) - currentMilliseconds;

     setTimeout(() => {
       fetchDrand();

       setNextFetch();
     }, delay);
  }

  fetchDrand();
  setNextFetch();
};
runWasm();
