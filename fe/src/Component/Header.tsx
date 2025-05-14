import { MainContent } from "./MainContent";
import { Sidebar } from "./SideBar";

export const Header = ({ children }: any) => {
  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </div>
  );
};
