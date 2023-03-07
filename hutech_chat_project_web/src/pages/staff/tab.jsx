import styled from "styled-components";
export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  height: 3em;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 15%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${(props) => (props.active ? "" : "1px solid #3399ff")};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) => (props.active ? "#0099ff" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  height: 3em;
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: #3399ff;
  }
`;
export const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;
