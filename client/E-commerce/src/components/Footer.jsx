const Footer = () => {
  return (
    <div className="">
      <footer className="footer footer-center bg-base-300 text-base-content p-4 absolute right-0 left-0 bottom-0  ">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - ProShop</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
