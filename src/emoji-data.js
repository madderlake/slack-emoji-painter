const emojiData = [
  { sym: '😀', sc: ':smile' },
  { sym: '🙄', sc: ':face_with_rolling_eyes:' },
  { sym: '😎', sc: ':sunglasses' },
  { sym: '😘', sc: ':kissing_face' },
  { sym: '😬', sc: ':grimace' },
  { sym: '🤐', sc: ':zipper_mouth_face' },
  { sym: '🤪', sc: ':zany_face' },
  { sym: '🤡', sc: 'clown_face' },
  { sym: '🙌', sc: ':raised_hands' },
  { sym: '🙏', sc: ':pray' },
  { sym: '🐶', sc: ':dog' },
  { sym: '🚗', sc: ':red_car' },
  { sym: '❤️', sc: ':heart' },
  { sym: '🎂', sc: ':birthday' },
  { sym: '🌳', sc: ':deciduous_tree' },
  { sym: '🦅', sc: ':eagle' },
  { sym: '❓', sc: ':question' },
  { sym: '⬆️', sc: ':arrow_up' },
  { sym: '➡️', sc: ':arrow_right' },
  { sym: '⬇️', sc: ':arrow_down' },
  { sym: '⬅️', sc: ':arrow_left' },
  { sym: '⚫', sc: ':black_circle' },
  { sym: '🔴', sc: ':red_circle' },
  { sym: '🔵', sc: ':blue_circle' }
];
export const emoji = emojiData.map(emoji => emoji.sym);
export const codes = emojiData.map(emoji => emoji.sc);
export default emojiData;
