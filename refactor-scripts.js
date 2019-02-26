// REDUX REFACTOR GUIDE
// Import Redux CDN or install NPM Package
// Import Expect or Jest CDN or install NPM Package

// Initial State
let songLyricsArray = "START OF SONG, Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', ');

const initialState = {
  lyricsArray: songLyricsArray,
  lyricLineIndex: 0
}

// Reducer
const lyricChangeReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'NEXT_LYRIC':
      let nextLineIndex = state.lyricLineIndex + 1;
      newState = {
        lyricsArray: state.lyricsArray,
        lyricLineIndex: nextLineIndex
      }
      return newState;

    case 'RESTART_SONG':
      newState = initialState;
      return newState;

    default:
      return state;
  }
}

// Store
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);

// Tests
expect(lyricChangeReducer(initialState, { type: null })).toEqual(initialState);

expect(store.getState()).toEqual(initialState);

expect(lyricChangeReducer(initialState, { type: 'NEXT_LYRIC' })).toEqual({
  lyricsArray: songLyricsArray,
  lyricLineIndex: 1
});

// DISPLAY LOGIC
// Rendering
const displayPhrase = () => {
  const lyricsDisplay = document.getElementById('words');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  const currentLyric = store.getState().lyricsArray[store.getState().lyricLineIndex];
  const lyricAsTextNode = document.createTextNode(currentLyric);
  lyricsDisplay.appendChild(lyricAsTextNode);
}

window.onload = function() {
  displayPhrase();
}

// SUBSCRIBE TO REDUX STORE
store.subscribe(displayPhrase);

//Event Listener
function userClick() {
  const currentState = store.getState();
  if (currentState.lyricLineIndex === currentState.lyricsArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG'});
  } else {
    store.dispatch({ type: 'NEXT_LYRIC'});
  }
}
