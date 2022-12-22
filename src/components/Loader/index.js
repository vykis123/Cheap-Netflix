import "./index.scss";

const Loader = () => {
  return (
    <div className="loader-bg">
      <div className="loader">
        <span className="loader__text">NETFLIX</span>
        <div id="loader" className="nfLoader"></div>
      </div>
    </div>
  );
};

export default Loader;
