import { invoke } from "@tauri-apps/api/core";
import { homeDir, join } from '@tauri-apps/api/path'
import { exists } from "@tauri-apps/plugin-fs"

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

const runSshTest = async (resultEl: HTMLElement) => {
  const home = await homeDir()
  const sshPath = await join(home, '.ssh')
  try {
    if (await exists(sshPath)) {
      resultEl.innerHTML = `${sshPath} found`
    } else {
      resultEl.innerHTML = `${sshPath} NOT found`
    }
  } catch (e) {
    resultEl.innerHTML = `Unable to check exist for ${sshPath} - ${e}`
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let resultEl = document.querySelector("#result") as HTMLElement;
  var btn1 = document.getElementById("perform-test-1");
  if (btn1 != null) btn1.onclick = (async () => await runTest(true, resultEl));
  var btn2 = document.getElementById("perform-test-2");
  if (btn2 != null) btn2.onclick = (async () => await runTest(false, resultEl));
  var btn3 = document.getElementById("perform-test-3");
  if (btn3 != null) btn3.onclick = (async () => await runSshTest(resultEl));
});
