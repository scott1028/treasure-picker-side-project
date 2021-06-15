import styled from 'styled-components';

export const Wrapper = styled.div`
  &.content {
    padding-left: 25px;
    padding-right: 25px;
  }
`;

export const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(150px, 350px);

  @media only screen and (max-width: 800px) {
    // NOTE: "minmax(150px)" will break the full RWD view
    // grid-template-columns: auto minmax(150px, auto);
    grid-template-columns: auto auto;
  }

  & > .main {
    display: grid;
    grid-template-rows: 80px 1fr;
  }

  & > .left-side {
    display: grid;
    grid-template-rows: 80px 1fr;
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;

  &.align-left {
    text-align: left;
    padding-left: 25px;
  }

  // NOTE: if sreen width is super small, your page will still be broken. I think it better to design another layout
  @media only screen and (max-width: 600px) {
    font-size: 1em;
    line-height: 1.5em;
    overflow-y: hidden;
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Button = styled.button`
  background-color: #333;
  color: #eee;
  border: none;
  line-height: 36px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 3px;
  cursor: pointer;

  &.float-right {
    float: right;
  }

  &.cross-btn {
    background-color: transparent;
    color: #333;
    padding-right: 5px;

    &:hover {
      background-color: transparent;
      color: #555;
    }
  }

  &:hover {
    background-color: #555;
  }
`;

export const Input = styled.input`
  border: #eee solid 2px;
  border-radius: 3px;
  height: 36px;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 120px;

  @media only screen and (max-width: 460px) {
    margin-bottom: 10px;
  }
`;

export const HorizontalStretch = styled.div`
  display: inline-block;
  width: ${({ size = 10 } = {}) => {
    return `${size}`
  }}px;
  height: 1px;
`;
