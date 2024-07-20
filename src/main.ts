import { invoke } from "@tauri-apps/api/core";

const runTest = async (useNumberArray: boolean, resultEl: HTMLElement) => {
  let value = useNumberArray ? {
    name: 'TestWithNumberArray',
    data: [1, 2, 3, 4, 5]
  } : {
    name: 'TestWithUIntArray',
    data: Uint8Array.from([1, 2, 3, 4, 5])
  }

  try {
    resultEl.textContent = 'Success: ' + await invoke("convert", { value })
  } catch (e) {
    resultEl.textContent = `${e}`
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let resultEl = document.querySelector("#result") as HTMLElement;
  var btn1 = document.getElementById("perform-test-1");
  if (btn1 != null) btn1.onclick = (async () => await runTest(true, resultEl));
  var btn1 = document.getElementById("perform-test-2");
  if (btn1 != null) btn1.onclick = (async () => await runTest(false, resultEl));
});
