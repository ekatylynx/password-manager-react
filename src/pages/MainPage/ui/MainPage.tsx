import Sidebar from '@/components/Sidebar/ui/Sidebar';
import './index.scss';

const MainPage = () => {
  return (
    <div className="content">
      <Sidebar />
      <div className='layout-main'>
        <p>Auth! Password List</p>
      </div>
    </div>
  );
};

export default MainPage;
