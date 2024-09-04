import { useEffect, useRef } from 'react';
import './AnimatedText.css';

const AnimatedText = () => {
  const wordsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const words = wordsRef.current?.querySelectorAll('.word');
    if (!words) return;

    words.forEach((word) => {
      const letters = word.textContent?.split('') || [];
      word.textContent = '';
      letters.forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.className = 'letter';
        word.append(span);
      });
    });

    let currentWordIndex = 0;
    const maxWordIndex = words.length - 1;
    (words[currentWordIndex] as HTMLElement).style.opacity = '1';

    const rotateText = () => {
      const currentWord = words[currentWordIndex] as HTMLElement;
      const nextWord =
        currentWordIndex === maxWordIndex
          ? (words[0] as HTMLElement)
          : (words[currentWordIndex + 1] as HTMLElement);

      // Rotate out letters of current word
      Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
          (letter as HTMLElement).className = 'letter out';
        }, i * 80);
      });

      // Reveal and rotate in letters of next word
      (nextWord as HTMLElement).style.opacity = '1';
      Array.from(nextWord.children).forEach((letter, i) => {
        (letter as HTMLElement).className = 'letter behind';
        setTimeout(() => {
          (letter as HTMLElement).className = 'letter in';
        }, 340 + i * 80);
      });

      currentWordIndex =
        currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };
    rotateText();
    const intervalId = setInterval(rotateText, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="rotating-text">
      <p ref={wordsRef}>
        <span className="word w-1">awesome</span>
        <span className="word w-2">beautiful</span>
        <span className="word w-3">creative</span>
        <span className="word w-4">fabulous</span>
        <span className="word w-5">interesting</span>
      </p>
    </div>
  );
};

export default AnimatedText;
