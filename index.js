const KEYS = [
  "capLevelToPlayerSize",
  "manifestLoadingMaxRetry",
  "levelLoadingMaxRetry",
  "fragLoadingMaxRetry",
  "autoStartLoad",
  "maxBufferSize",
  "maxBufferLength",
  "maxMaxBufferLength",
  "nudgeMaxRetry",
  "nudgeOffset",
  "lowLatencyMode",
  "startFragPrefetch",
  "maxLoadingDelay",
  "debug"
]

const video = document.getElementById('video')
const mediaSrc = document.getElementsByName("mediaSrc")[0]

function btnClick () {
  start()
  console.log("1 - CLICK! **")
  console.time("L O A D")
  console.timeLog("L O A D")
  load(getForm())
}

video.addEventListener("playing", () => {
  console.log("2 - PLAYING! ** ")
  console.timeEnd("L O A D")
  end()
})

function getForm () {
  const config = {}
  KEYS.forEach(param => {
    const input = document.getElementsByName(param)
    if (input.length === 1 && input[0].type === 'number') {
      if (input[0].value === "") return
      config[param] = input[0].value === "-1" ? Infinity : parseFloat(input[0].value)
    } else if (input[0].type === 'radio') {
      config[param] = input[0].checked
    }
  })
  return config
}

function load (hlsConfig = {}) {
  if (Hls.isSupported()) {
    const hls = new Hls(hlsConfig)
    hls.attachMedia(video)
    hls.loadSource(mediaSrc.value)
    if (!hlsConfig.autoStartLoad) hls.startLoad(-1)

    video.autoplay = true
    video.controls = true
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play()
    })
  }
}

let startTime, endTime, started = false
function start() {
  endtime = 0
  startTime = performance.now()
  started = true
}
function end() {
  if (!started) return
  endTime = performance.now()
  const timeDiff = (endTime - startTime) / 1000
  document.getElementById("elapsedTime").innerText = parseFloat(timeDiff).toFixed(3)  + " segs. ( Click => Playing Event )"
  document.getElementById("elapsedTime").style.color = "white"
  started = false
}