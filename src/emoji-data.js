const emojiData = [
  { sym: '😀', sc: ':face_smile' },
  { sym: '😁', sc: ':face_big_smile' },
  { sym: '😎', sc: ':face_sunglasses' },
  { sym: '😘', sc: ':face_kiss' },
  { sym: '😬', sc: ':grimace' },
  { sym: '🤐', sc: ':face_zipper' },
  { sym: '🤪', sc: ':face_crazy' },
  { sym: '🤡', sc: 'clown' },
  { sym: '🙌', sc: ':hands_framing' },
  { sym: '🙏', sc: ':hands_praying' },
  { sym: '🐶', sc: ':dog_spot' },
  { sym: '🚗', sc: ':car_red' },
  { sym: '❤️', sc: ':heart_red' },
  { sym: '🎂', sc: ':birthday_cake' },
  { sym: '🌳', sc: ':tree' },
  { sym: '🦅', sc: ':eagle_flying' },
  { sym: '⬆️', sc: ':arrow_up' },
  { sym: '➡️', sc: ':arrow_right' },
  { sym: '⬇️', sc: ':arrow_down' },
  { sym: '⬅️', sc: ':arrow_left' },
  { sym: '⚪', sc: ':white_circle' },
  { sym: '⚫', sc: ':black_circle' },
  { sym: '🔴', sc: ':red_circle' },
  { sym: '🔵', sc: ':blue_circle' }
];
export const emoji = emojiData.map(emoji => emoji.sym);
export const codes = emojiData.map(emoji => emoji.sc);
export default emojiData;
