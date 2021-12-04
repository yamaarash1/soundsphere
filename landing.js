let songBlob = null;


function gotoMainPage(file) {
  // メインページに遷移する

  document.getElementById('startbtn').disabled = true;
  document.getElementById('fileselectbtn').disabled = true;

  lastTime = 0;
  seekbar.max = 0;
  seekbar.value = 0;
  timeCurrent.innerText = formatTime(0);
  timeDuration.innerText = formatTime(0);

  globalEventTarget.dispatchEvent(new CustomEvent('durationset', {
    detail: 0,
  }));

  globalEventTarget.dispatchEvent(new CustomEvent('timeset', {
    detail: 0,
  }));

  globalEventTarget.dispatchEvent(new Event('statechange'));

  song = loadSound(file, () => {
    globalEventTarget.dispatchEvent(new Event('songload'));

    // UI更新（ページ遷移）
    showPage('page-main');
  });

  // UI更新（読み込み中）
  document.getElementById('loading').hidden = false;
}


document.getElementById('files').addEventListener('change', /** @param event {InputEvent} */ event => {
  /** @type {File | undefined} */
  const file = event.target.files[0];

  if (!/^audio\//.test(file.type)) {
    return;
  }

  document.getElementById('filename').value = file.name;

  const url = URL.createObjectURL(file);

  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      songBlob = blob;
      URL.revokeObjectURL(url);
    });
});


document.getElementById('startbtn').addEventListener('click', event => {
  if (!songBlob) {
    alert('曲をセットしてください。');
    return;
  }

  gotoMainPage(songBlob);
});


document.getElementById('tempStartbtn').addEventListener('click', event => {
  fetch('https://k.azma.work/assets/Alan Walker - Fade.mp3')
    .then(res => res.blob())
    .then(blob => {
      songBlob = blob;
      gotoMainPage(songBlob);
    });
});


document.getElementById('fileselectbtn').addEventListener('click', event => {
  document.getElementById('files').click();
});
