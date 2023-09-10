import Player from '@vimeo/player';
import _ from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.on(
  'timeupdate',
  _.throttle(event => {
    try {
      const inf = {
        duration: event.duration,
        percent: event.percent,
        seconds: event.seconds,
      };
      const serializedState = JSON.stringify(inf);
      localStorage.setItem('videoplayer-current-time', serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, 1000)
);

window.addEventListener('load', event => {
  try {
    const serializedState = localStorage.getItem('videoplayer-current-time');
    const inf =
      serializedState === null ? undefined : JSON.parse(serializedState);
    if (inf === undefined) {
      player.setCurrentTime(0);
    } else {
      player.setCurrentTime(inf.seconds);
    }
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
});
