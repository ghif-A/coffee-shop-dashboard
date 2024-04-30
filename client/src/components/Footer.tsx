const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-center text-muted"
      style={{ backgroundColor: "#be9b7b" }}
    >
      <section className="p-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 mx-auto">
              <h6 className="text-uppercase fw-bold mb-4">
                Coffee Shop Analytics Dashboard
              </h6>
              <p>
                Coffee Shop Analytics Dashboard by Ghiffari Ahmadijaya. This
                website is solely for a personal project related to the S
                assignment.
              </p>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://github.com/ghif-A/coffee-shop-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#d3d3d3" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1024px-GitHub_Invertocat_Logo.svg.png"
              alt="GitHub"
              style={{ width: "24px", height: "24px", verticalAlign: 'middle' }}
            />
          </a>
        </div>
      </section>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "#6f4e37", color: "#d3d3d3" }}
      >
        Copyright © {currentYear} Coffee Shop Analytics Dashboard. This work is
        dedicated to the{" "}
        <a
          href="https://creativecommons.org/publicdomain/zero/1.0/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#d3d3d3" }}
        >
          CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
        </a>
        . No copyright or related rights are claimed.
      </div>
    </footer>
  );
};

export default Footer;
