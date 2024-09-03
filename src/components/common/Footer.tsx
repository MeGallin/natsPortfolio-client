// Updated path if HitCounter is in the same directory
import DateTime from './DateTime';
import Counter from '../Counter';

const Footer = () => {
  return (
    <footer>
      <DateTime />
      <div>
        Page Hits <Counter />
      </div>
    </footer>
  );
};

export default Footer;
