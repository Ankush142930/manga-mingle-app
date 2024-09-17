// Function to return random emojis
export const emojiList = [
  '😀',
  '😂',
  '🥰',
  '😎',
  '😍',
  '🤔',
  '😴',
  '🥳',
  '🤖',
  '👽',
  '👻',
  '💀',
  '🎃',
  '🧙‍♂️',
  '🐶',
  '🐱',
  '🐸',
  '🐧',
  '🐥',
  '🐢',
  '🦄',
  '🍕',
  '🍔',
  '🍩',
  '🍪',
  '🍓',
  '🍉',
  '⚽',
  '🏀',
  '🎸',
  '🚗',
  '✈️',
  '🌈',
  '⭐',
  '🌍',
  '🔥',
  '🎈',
  '🎉',
  '🎁',
  '💡',
];

const generateRandomEmojis = () => {
  return emojiList[Math.floor(Math.random() * emojiList.length)];
};

export default generateRandomEmojis;
