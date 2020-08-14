import React from 'react';
import { emoji, codes } from './emoji-data';
import EmojiPaint from './components/EmojiPaint';

import './app.css';

const App = () => {
  return (
    <div className="app">
      <EmojiPaint emoji={emoji} codes={codes} />
    </div>
  );
};

export default App;
