import React from "react";

const IpoAdvisory = () => {
  return (
    <>
      <div className="OurTeambanner has-prlx">
        {/* <h2 className=" fw-bold split2  ">Our Team</h2> */}
      </div>
      <div>
        <div className="founder container py-5">
          <h2 className="text-drop__line fs-1 fw-bold text-center py-4 ourFounder">
            IPO ADVISORY
          </h2>

          <div className="row align-items-center gy-5 ">
            <div className="col-12 col-sm-6">
              <img
                src="/ourTeam/boss1.png"
                alt="Team Img"
                loading="lazy"
                className="img-fluid text-drop__img-box"
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="col-12 col-sm-6 d-flex flex-column justify-content-center p-2 ">
              <div className="maintext">
                <p className="text-start text-drop__line fw-bold fs-4">
                  Suresh Mansharamani
                </p>
                <a href="https://www.linkedin.com/in/abhishek-raj-42490b21/">
                  <img
                    src="/linkedin2.png"
                    alt="teamImg"
                    loading="lazy"
                    className="links text-drop__line"
                  />
                </a>
              </div>
              <p className="text-start text-drop__line text-muted">
                Co-Founder
              </p>
              <p className="text-drop__line" style={{ textAlign: "justify" }}>
                Abhishek Raj is the CEO of Jenika Ventures, a real estate
                consultancy he established in 2020 with a vision to bring trust,
                transparency and innovation to the Indian property market. With
                more than a decade of experience in the Delhi/NCR real estate
                sector, he is widely respected for his proven track record,
                strategic foresight and client-first approach. Abhishek is an
                advocate by profession with a management degree from the United
                Kingdom, combines legal expertise with business acumen to
                deliver long-term value for clients, investors and developers.
                Under his leadership, Jenika Ventures became operational in 2021
                and quickly achieved ₹100 crore in first-year sales while
                forging partnerships with leading developers including Tata,
                DLF, Godrej and Elan. Beyond business, Abhishek is also an
                accomplished international-level snooker player.
              </p>
            </div>

            <div className="col-12 col-sm-6 d-flex flex-column justify-content-center p-2 order-sm-1 order-2">
              <div className="maintext">
                <p className="text-drop__line fw-bold fs-4">Abhinav Tondon</p>
                <a href=" https://www.linkedin.com/in/priyanka-marwha-61290948/">
                  <img
                    src="/linkedin2.png"
                    alt="teamImg"
                    loading="lazy"
                    className="links text-drop__line"
                  />
                </a>
              </div>
              <p className="text-drop__line text-muted">Founder and MD</p>
              <p className="text-drop__line" style={{ textAlign: "justify" }}>
                Priyanka Marwha is the Managing Director of Jenika Ventures. She
                has played a pivotal role in shaping the company’s growth and
                success. With more than a decade of experience in the Delhi-NCR
                Real Estate Market, she brings a wealth of knowledge, innovation
                and creativity to the business. Originally from the hospitality
                sector, Priyanka transitioned into real estate and quickly built
                strong industry expertise by working directly with some of the
                most prominent developers in the country. Her unique ability to
                combine client service excellence with a deep understanding of
                real estate dynamics has been instrumental in establishing
                Jenika Ventures as a trusted consultancy.
              </p>
            </div>

            <div className="col-12 col-sm-6 order-sm-2 order-1">
              <img
                src="/ourTeam/boss2.png"
                alt="teamImg"
                loading="lazy"
                className="img-fluid text-drop__img-box"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IpoAdvisory;
