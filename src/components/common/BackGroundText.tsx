import React from 'react';
import { Typography } from '@mui/material';

const randomDesignParagraphs = [
  "Graphic design is the bridge where creativity and logic converge, transforming raw ideas into compelling visual narratives. It's more than an aesthetic endeavor; it's a dynamic form of communication that transcends cultural and linguistic barriers. A thoughtfully crafted design can capture the attention of a passerby, evoke emotions, and tell a story that resonates on a deep, personal level. In this dance of shapes, colors, and concepts, simplicity often shines brightest. Yet achieving simplicity is an intricate endeavor, requiring a designer to strip away the unnecessary while preserving the essence. Every curve of typography, every hue of color, and every element of the layout collaborates to create a visual symphony, crafting a language that speaks universally and profoundly.",
  'Graphic design exists at the magical intersection of analytical reasoning and boundless imagination. It is a field where structured thought meets boundless creativity, forming solutions that arent just seen but deeply felt. Beyond the surface beauty lies a purpose—a message that seeks to connect, inspire, or provoke. Each successful design is born from a narrative, a spark of an idea that grows and flourishes under the designers hand. The task of the designer is akin to that of a storyteller, bringing life to the intangible and making it visually tangible. Through this fusion of art and science, design becomes a powerful tool to communicate, evoke emotions, and leave an indelible mark on those who encounter it.',
  'In a world where milliseconds shape perceptions, graphic design is the unseen hand that builds bridges of trust and credibility between brands and their audiences. First impressions arent just fleeting moments—theyre foundational to relationships. Good design isnt merely about visual appeal; its about meaning, intent, and clarity. Without compelling content, even the most sophisticated designs fall flat, for content is the soul that design adorns. Designers act as interpreters, taking abstract concepts and molding them into visuals that engage, inform, and motivate. Through balance, harmony, and an acute focus on details, good design becomes an indispensable ally in a brands journey, underscoring the message and amplifying its impact.',
  'Typography, often understated, is a cornerstone of design that shapes how we perceive words before we even comprehend their meaning. It transforms language into an experience, giving each message its unique personality and voice. Selecting the right font isn’t a trivial decision; it’s an act of understanding the tone, purpose, and audience. The interplay of size, weight, spacing, and alignment is a deliberate choreography that dictates how words are read and felt. Whether bold and commanding or soft and elegant, typography sets the stage for communication, leaving subtle cues that enhance understanding and evoke emotion. It’s not just the words that speak—their arrangement sings a song of its own.',
  'Design is an intricate dance of order and creativity, where every shape, color, and element plays a role in a larger narrative. Like a puzzle, every piece has its purpose, and the designer’s task is to find where each fits perfectly. Balancing the chaos of ideas with the clarity of execution demands both intuition and precision. The choice of imagery, the interplay of positive and negative space, and the alignment of elements work in harmony to create a seamless whole. Its a process that blends trial and error, bursts of inspiration, and moments of meticulous refinement. When every piece locks into place, the result is a visual masterpiece that is as functional as it is beautiful.',
  'At its core, graphic design is problem-solving in its most artistic form. It’s about looking beyond the surface and crafting visuals that not only catch the eye but also serve a strategic purpose. Each design, whether a sleek logo, an engaging website, or a captivating ad campaign, is a story crafted to inspire action. The true power of design lies in its ability to simplify complex ideas and deliver them with clarity and elegance. A successful design doesn’t just decorate—it communicates, persuades, and transforms. By marrying aesthetics with intent, graphic design transcends its visual appeal, becoming a driver of engagement, a teller of stories, and a catalyst for results',
];

const getRandomParagraph = () => {
  return randomDesignParagraphs[
    Math.floor(Math.random() * randomDesignParagraphs.length)
  ];
};

const BackgroundText: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '86vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -5,
        overflow: 'hidden',
        opacity: 0.1,
        pointerEvents: 'none',
        backgroundColor: 'transparent',
        padding: '2rem',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '2.8rem',
          fontWeight: 'bold',
          textAlign: 'right',
          color: (theme) => theme.palette.text.primary,

          lineHeight: 1.5,
        }}
      >
        {getRandomParagraph()}
      </Typography>
    </div>
  );
};

export default BackgroundText;
