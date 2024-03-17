import { FC } from "react";
import { Container } from "react-bootstrap";

const PageLoading: FC = () => {
  return (
    <Container className="text-center">
      <img className="remove-bg" src="/assets/images/loader-01.gif" alt="" />
    </Container>
  );
};

export default PageLoading;
