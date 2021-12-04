// Copyright (c) 2019 SegaraRai

import p5 from 'p5';

declare global {
  /**
   * loadSound() returns a new p5.SoundFile from a specified path. \
   * If called during preload(), the p5.SoundFile will be ready to play in time for setup() and draw(). \
   * If called outside of preload, the p5.SoundFile will not be ready immediately, so loadSound accepts a callback as the second parameter. \
   * Using a local server is recommended when loading external files.
   *
   * @param path path to a sound file (String).
   * Optionally, you may include multiple file formats
   * in an array. Alternately, accepts an object from
   * the HTML5 File API, or a p5.File.
   * @param successCallback Name of a function to
   * call once file loads
   * @param errorCallback Name of a function to call
   * if file fails to load. This function will receive
   * an error or XMLHttpRequest object with information
   * about what went wrong.
   * @param whileLoadingCallback Name of a function
   * to call while file is loading. That function will
   * receive progress of the request to load the sound
   * file (between 0 and 1) as its first parameter.
   * This progress does not account for the additional
   * time needed to decode the audio data.
   */
  function loadSound(
    path: string | string[],
    successCallback?: (...args: any[]) => any,
    errorCallback?: (...args: any[]) => any,
    whileLoadingCallback?: (...args: any[]) => any
  ): p5.SoundFile;

  /**
   * It is a good practice to give users control over starting audio playback.
   * This practice is enforced by Google Chrome's autoplay policy as of r70 (info), iOS Safari, and other browsers.
   * userStartAudio() starts the Audio Context on a user gesture.
   * It utilizes the StartAudioContext library by Yotam Mann (MIT Licence, 2016).
   * Read more at https://github.com/tambien/StartAudioContext.
   * Starting the audio context on a user gesture can be as simple as userStartAudio().
   * Optional parameters let you decide on a specific element that will start the audio context, and/or call a function once the audio context is started.
   *
   * @param elements This argument can be an Element, Selector String, NodeList, p5.Element, jQuery Element, or an Array of any of those.
   * @param callback Function: Callback to invoke when the AudioContext has started
   */
  function userStartAudio(elements?: any, callback?: (...args: any[]) => any): Promise<void>;
}
