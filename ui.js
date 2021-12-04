const seekbar = document.getElementById('seekbar');
const timeCurrent = document.getElementById('time-current');
const timeDuration = document.getElementById('time-duration');
const playButton = document.getElementById('play-button');
const interactionButton1 = document.getElementById('interaction-button1');
const interactionButton2 = document.getElementById('interaction-button2');
const interactionButton3 = document.getElementById('interaction-button3');
const interactionButton4 = document.getElementById('interaction-button4');
const elseButton1 = document.getElementById('else-button1');

let draggingSeekbar = false;

files.addEventListener('change', /** @param event {InputEvent} */ event => {
  /** @type {File | undefined} */
  const file = event.target.files[0];

  if (!/^audio\//.test(file.type)) {
    return;
  }

  lastTime = 0;
  seekbar.max = 0;
  seekbar.value = 0;
  timeCurrent.innerText = formatTime(0);
  timeDuration.innerText = formatTime(0);

  if (song) {
    song.stop();
  }

  globalEventTarget.dispatchEvent(new CustomEvent('durationset', {
    detail: 0,
  }));

  globalEventTarget.dispatchEvent(new CustomEvent('timeset', {
    detail: 0,
  }));

  globalEventTarget.dispatchEvent(new Event('statechange'));
  globalEventTarget.dispatchEvent(new Event('scenechange1'));
  globalEventTarget.dispatchEvent(new Event('statechange2'));
  globalEventTarget.dispatchEvent(new Event('statechange3'));
  globalEventTarget.dispatchEvent(new Event('statechange4'));

  song = loadSound(file, () => {
    globalEventTarget.dispatchEvent(new Event('songload'));
  });
});


seekbar.addEventListener('change', /** @param event {InputEvent} */ event => {
  draggingSeekbar = false;

  if (!song) {
    return;
  }

  const time = parseFloat(document.getElementById('seekbar').value);

  song.stop();
  song.jump(time);

  globalEventTarget.dispatchEvent(new CustomEvent('timeset', {
    detail: 0,
  }));

  globalEventTarget.dispatchEvent(new Event('statechange'));
  globalEventTarget.dispatchEvent(new Event('scenechange1'));
  globalEventTarget.dispatchEvent(new Event('statechange2'));
  globalEventTarget.dispatchEvent(new Event('statechange3'));
  globalEventTarget.dispatchEvent(new Event('statechange4'));
  globalEventTarget.dispatchEvent(new Event('statechange5'));

});

seekbar.addEventListener('mousedown', () => {
  if (!song) {
    return;
  }
  draggingSeekbar = true;
});

seekbar.addEventListener('mouseup', () => {
  draggingSeekbar = false;
});

playButton.addEventListener('click', () => {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }

  globalEventTarget.dispatchEvent(new Event('statechange'));
});

interactionButton1.addEventListener('click', () => {
  if (!song) {
    alert("曲をセットしてください。")
    return;
  }

  if (keyIs == false) {
    keyIs = true;
  } else {
    keyIs = false;
  }
  document.body.classList.toggle('color-dark', keyIs);

  globalEventTarget.dispatchEvent(new Event('statechange1'));
});

interactionButton2.addEventListener('click', () => {
  if (!song) {
    alert("曲をセットしてください。")
    return;
  }

  if(keyIs3 == false){
    keyIs3 = true;
  }else {
    keyIs3 = false;
  }

  globalEventTarget.dispatchEvent(new Event('statechange2'));
});

interactionButton3.addEventListener('click', () => {
  if (!song) {
    alert("曲をセットしてください。")
    return;
  }

  if(keyIs1 < 3){
    keyIs1 = keyIs1 + 1;
  }else {
    keyIs1 = 0;
  }

globalEventTarget.dispatchEvent(new Event('statechange3'));
});

interactionButton4.addEventListener('click', () => {
  if (!song) {
    alert("曲をセットしてください。")
    return;
  }

  if (keyIs6 == 0) {
    keyIs6 = 1;
  } else if(keyIs6 == 1){
    keyIs6 = 2;
  } else {
    keyIs6 = 0;
  }

globalEventTarget.dispatchEvent(new Event('statechange4'));
});

elseButton1.addEventListener('click', () => {
  if (!song) {
    alert("曲をセットしてください。")
    return;
  }

  if (song.isPlaying()) {
    if(automode == false){
      automode = true;
    }else {
      automode = false;
    }
  } else {
    alert("曲を再生してください。")
  }

globalEventTarget.dispatchEvent(new Event('statechange5'));
});


/**
 * format time in seconds to mm:SS
 * @param {number} time time in seconds
 */
function formatTime(time) {
  time = Math.round(time);
  return `${Math.floor(time / 60)}:${('0' + (time % 60)).substr(-2)}`;
}


function drawUI() {
  if (song) {
    //console.log(song.isPlaying(), song.currentTime());
    if (song.isPlaying()) {
      globalEventTarget.dispatchEvent(new CustomEvent('timeset', {
        detail: song.currentTime(),
      }));
    }
  }
}


globalEventTarget.addEventListener('songload', () => {
  globalEventTarget.dispatchEvent(new CustomEvent('durationset', {
    detail: song.duration(),
  }));
  globalEventTarget.dispatchEvent(new CustomEvent('timeset', {
    detail: 0,
  }));
  globalEventTarget.dispatchEvent(new Event('statechange'));
  globalEventTarget.dispatchEvent(new Event('scenechange1'));
  globalEventTarget.dispatchEvent(new Event('scenechange2'));
  globalEventTarget.dispatchEvent(new Event('scenechange3'));
  globalEventTarget.dispatchEvent(new Event('statechange4'));
  globalEventTarget.dispatchEvent(new Event('statechange5'));
});


globalEventTarget.addEventListener('durationset', (event) => {
  const duration = event.detail;

  seekbar.max = duration;
  timeDuration.innerText = formatTime(duration);
});

globalEventTarget.addEventListener('timeset', (event) => {
  const time = event.detail;
  const duration = song ? song.duration() : 1;

  if (!draggingSeekbar) {
    seekbar.value = time;
  }

  seekbar.style.setProperty('--progress', time / duration);

  timeCurrent.innerText = formatTime(time);
});

globalEventTarget.addEventListener('statechange', () => {
  playButton.innerText = song && song.isPlaying() ? playButton.dataset.pause : playButton.dataset.play;
});

globalEventTarget.dispatchEvent(new CustomEvent('durationset', {
  detail: 0,
}));

globalEventTarget.dispatchEvent(new CustomEvent('timeset', {
  detail: 0,
}));

globalEventTarget.dispatchEvent(new Event('statechange'));
globalEventTarget.dispatchEvent(new Event('scenechange1'));
globalEventTarget.dispatchEvent(new Event('statechange2'));
globalEventTarget.dispatchEvent(new Event('statechange3'));
globalEventTarget.dispatchEvent(new Event('statechange4'));
globalEventTarget.dispatchEvent(new Event('statechange5'));
