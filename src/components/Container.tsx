import Sidebar from "./Sidebar.tsx";
import JobItemContent from "./JobItemContent.tsx";

const Container = ()=> {

  return (
    <div className="container">
      <Sidebar />
      <JobItemContent />
    </div>
  );
}

export default Container;
