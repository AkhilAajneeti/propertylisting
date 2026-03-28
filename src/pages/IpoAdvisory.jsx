import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
const IpoAdvisory = () => {
  useEffect(() => {
    // Wait for fonts to load before animation
    document.fonts.ready.then(() => {
      gsap.set(".split2", { opacity: 1 });

      const splitElements = document.querySelectorAll(".split2");

      splitElements.forEach((el) => {
        const split = new SplitType(el, { types: "words" });

        gsap.from(split.words, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        });
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div className="utilities IPOBanner">
        {/* <h1 className="split2">IPO ADVISORY</h1> */}
      </div>

      <div className="container">
        <section class="advisors">
          <div class="advisors__header">
            <p class="advisors__eyebrow">Our Advisory Team</p>
          </div>

          <div class="advisor-card">
            <div class="advisor-card__img">
              <img
                src="/ourTeam/Suresh-Mansharamani.png"
                alt="Suresh Mansharamani"
                loading="lazy"
              />
            </div>
            <div class="advisor-card__body">
              <p class="advisor-card__tag">Strategic Initiative</p>
              <h2 class="advisor-card__title">
                A Strategic Initiative
                <br />
                by Jenika Ventures
              </h2>
              <p class="advisor-card__subtitle">
                Guided by Suresh Mansharamani
              </p>
              <p class="advisor-card__text">
                Jenika Ventures brings a focused and structured approach to SME
                IPO advisory, combining market expertise with real
                entrepreneurial success. This vertical is strengthened by the
                guidance of Suresh Mansharamani, who transformed his journey
                from earning ₹300 per month to leading a company that achieved a
                300x oversubscribed IPO in 1995, successfully listing on the
                Bombay Stock Exchange. At Jenika Ventures, the objective is
                clear — to prepare businesses not just for listing, but for
                long-term performance in public markets. The advisory framework
                emphasizes IPO readiness assessment, financial structuring,
                compliance alignment, valuation positioning and investor
                confidence building. With practical IPO execution experience and
                deep understanding of SME challenges, this collaboration ensures
                that growing enterprises receive strategic clarity, disciplined
                planning and a scalable roadmap. Jenika Ventures IPO Advisory is
                built for ambitious businesses ready to move from private growth
                to public credibility — with structure, strategy and sustainable
                value creation at its core.
              </p>
            </div>
          </div>

          <div class="advisor-card advisor-card--reversed">
            <div class="advisor-card__body order-1 order-sm-0">
              <p class="advisor-card__tag">CFO Advisory</p>
              <h2 class="advisor-card__title">
                Chief Financial Officer
                <br />
                (CFO) Advisory
              </h2>
              <p class="advisor-card__subtitle">
                Financial Strategy, Structure &amp; Governance
              </p>
              <p class="advisor-card__text">
                A strong financial foundation is essential for businesses aiming
                to scale, attract investment, and prepare for capital market
                opportunities. At Jenika Ventures, the CFO advisory function is
                strengthened by the expertise of Tanuj Keswani, a Chartered
                Accountant with over a decade of experience guiding SMEs toward
                financial clarity and structured growth. Holding a Doctorate in
                Business Administration specializing in Cash Flow Management and
                Shareholder Value, he combines academic depth with practical
                execution. His experience includes working with Fortune 50
                companies during his tenure with a Big 4 consulting firm and
                advising 500+ businesses through his professional ventures.
                Through his role with Jenika Ventures, he helps businesses build
                scalable financial systems, strengthen governance practices and
                prepare for fundraising and IPO readiness — ensuring companies
                develop the financial discipline and strategic foundation
                required for sustainable growth and long-term market
                opportunities.
              </p>
            </div>
            <div class="advisor-card__img order-0 order-sm-1">
              <img
                src="/ourTeam/Structure-Governance.png"
                alt="Tanuj Keswani"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IpoAdvisory;
