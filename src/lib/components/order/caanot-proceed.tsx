import { FC } from "react";
import { Alert } from "react-bootstrap";

interface CannotProceedProps {
  message?: string;
}

const CannotProceed: FC<CannotProceedProps> = ({ message }) => {
  return <Alert variant="danger">{message ?? "Cannot proceed"}</Alert>;
};

export default CannotProceed;
