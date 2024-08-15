import './Spinner.css';
const Spinner = () => {
  return (
    <>
      <div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
