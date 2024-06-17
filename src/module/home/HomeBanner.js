import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyle = styled.div`
  min-height: 520px;
  padding: 40px 0;
  margin: auto 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .banner-content {
    max-width: 600px;
    color: white;
  }
  .banner-image {
    max-width: 400px;
    max-height: 400px;
  }
  .banner-heading {
    font-size: 36px;
    margin-bottom: 20px;
  }
  .banner-desc {
    line-height: 1.75;
    margin-bottom: 40px;
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyle>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Sunflower Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              tempore accusantium, fuga explicabo minus obcaecati consequuntur
              tempora eum quae error aliquam enim! Adipisci, aliquid repellat!
            </p>
            <Button
              type="button"
              style={{ maxWidth: 300 }}
              kind="secondary"
              to="sign-up"
            >
              Lẹcc gô
            </Button>
          </div>
          <div className="banner-image">
            <img src="/banner.png" alt="banner" className="" />
          </div>
        </div>
      </div>
    </HomeBannerStyle>
  );
};

export default HomeBanner;
