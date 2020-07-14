import React, { Component } from 'react';
import { emoji, codes } from './emoji-data';
import EmojiPaint from './components/EmojiPaint/emoji-paint';

import './app.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <EmojiPaint emoji={emoji} codes={codes} />
      </div>
    );
  }
}
