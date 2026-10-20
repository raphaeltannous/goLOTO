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
  const wasmStatus = document.getElementById("wasm-status");
  const wasmStatusIcon = document.getElementById("wasm-status-icon");
  const wasmStatusText = document.getElementById("wasm-status-text");

  const importObject = go.importObject;

  const wasmModule = await instantiateWASM("../goLOTO.wasm", importObject);

  go.run(wasmModule.instance);

  wasmStatus.classList = "alert valid";
  wasmStatusIcon.classList.replace("ph-spinner-gap", "ph-check-circle");
  wasmStatusText.textContent = "Initialized"
};

runWasm();
