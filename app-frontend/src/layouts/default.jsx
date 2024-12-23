import Navbar from "../components/Navbar";

function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <main className="mt-[64px]">{children}</main>
        </div>
    );
}

export default Layout;
