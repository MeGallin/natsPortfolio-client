import './BackgroundBlob.css';
const BackgroundBlob = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 100 100"
    >
      <path
        fill="#857CB3"
        className="out-top"
        d="m60,23.4c-10,25.2-21.2,41-46.2,46.2s-54.1-21.9-46.2-46.2S-11-17.1,13.8-22.9,69.4-.4,60,23.4Z"
      />
      <path
        fill="#ADA9BB"
        className="in-top"
        d="m44.2,23.4c-7.2,9-15.4,31.6-30.4,30.4s-31.1-14.8-30.4-30.4S-2.3,0,13.8-7s40.8,17.3,30.4,30.4Z"
      />
      <path
        fill="#ADA9BB"
        className="out-bottom"
        d="m112.6,81c5.3,15.9-18.8,34.1-30.4,30.4s-35.2-14.3-30.4-30.4,12.2-33.9,30.4-30.4c16.5,3.2,25.6,15.8,30.4,30.4Z"
      />
      <path
        fill="#857CB3"
        className="in-bottom"
        d="m102,81c2.1,10.8-9.2,22.3-19.9,19.9s-22.8-9.3-19.9-19.9,9.2-22.4,19.9-19.9,17.8,9.5,19.9,19.9Z"
      />
    </svg>
  );
};

export default BackgroundBlob;
