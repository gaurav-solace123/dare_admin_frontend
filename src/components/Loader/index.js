// components/Loader.js
import ImageComponent from '../Img';
import{getLocalImagePath} from '../utils/common'

const Loader = () => {
    return (
      <div className="loader">
        <div className="loader-inner">
          <ImageComponent src={getLocalImagePath('loading_ei.gif')}  alt="Loading..." />
        </div>
      </div>
    );
  };
  
  export default Loader;
  