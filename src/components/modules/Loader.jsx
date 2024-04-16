import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const Div = styled.div`
  margin-top: 150px;
  text-align: center;
`;

const Span = styled.span`
  margin: auto;
  display: inline-block;
  box-sizing: border-box;
`;

function Loader() {
  return (
    <Div>
      <Span>
        <Oval
          height="30"
          width="30"
          secondaryColor="#ffc5c5"
          color="#a62626"
          ariaLabel="oval-loading"
        />
      </Span>
    </Div>
  );
}

export default Loader;
