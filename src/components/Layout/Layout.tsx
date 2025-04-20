import { Link, Outlet } from "react-router-dom";
import "./styles.css";

const Layout = () => {
  return (
    <>
      <header className="app-header">
        <nav>
          <Link to="/">Drag & Drop</Link>
          <Link to="/crypto">Bitcoin Tracker</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
