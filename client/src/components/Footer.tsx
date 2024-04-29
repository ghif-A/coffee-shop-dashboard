const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="text-center text-muted" style={{ backgroundColor: '#be9b7b' }}>
      <section className="p-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 mx-auto">
              <h6 className="text-uppercase fw-bold mb-4">
                Coffee Shop Analytics Dashboard
              </h6>
              <p>
                Coffee Shop Analytics Dashboard Website by Ghiffari Ahmadijaya. This website is solely for a personal project related to the S assignment.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-4" style={{ backgroundColor: '#6f4e37', color: '#d3d3d3' }}>
        © {currentYear} Coffee Shop Analytics Dashboard. All rights reserved.
        <br />
        This work is provided under the <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer" style={{ color: '#d3d3d3' }}>CC0 1.0 Universal (CC0 1.0) Public Domain Dedication</a>. No copyright or related rights are claimed.
      </div>
    </footer>
  );
};

export default Footer;
