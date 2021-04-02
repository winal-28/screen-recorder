const startRecordingBtn = document.querySelector(".start-recording");
const stopRecordingBtn = document.querySelector(".stop-recording");
const screenVideo = document.querySelector(".screen-video");
let recorder, stream;

// Function for recording....

async function startRecording() {
  // Creates the main screen stream

  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" },
  });

  // The recorder
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = (e) => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    screenVideo.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

startRecordingBtn.addEventListener("click", () => {
  startRecording();

  startRecordingBtn.setAttribute("disabled", true);
  stopRecordingBtn.removeAttribute("disabled");
});

stopRecordingBtn.addEventListener("click", () => {
  stopRecordingBtn.setAttribute("disabled", true);
  startRecordingBtn.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});

// Screen recording in JS!
