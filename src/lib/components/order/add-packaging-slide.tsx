import { FC } from "react";
import { Alert, Container } from "react-bootstrap";

interface AddPackagingSlideProps {
  selectedPackagingId: string;
  packagings: Packaging[];
  onSelectPackaging: (packaging: Packaging) => void;
}

const AddPackagingSlide: FC<AddPackagingSlideProps> = ({
  selectedPackagingId,
  packagings,
  onSelectPackaging,
}) => {
  return (
    <>
      {(packagings ?? []).map((packaging) => (
        <div
          key={packaging.id}
          className="hand-cursor"
          onClick={() => onSelectPackaging(packaging)}
        >
          <Alert
            variant={selectedPackagingId === packaging.id ? "primary" : "light"}
          >
            {packaging.title}
          </Alert>
          <Container>
            <p>{packaging.description}</p>
            <p>Minimum Order Quantity: {packaging.minQuantity}</p>
            <p>Maximum Order Quantity: {packaging.maxQuantity}</p>
          </Container>
        </div>
      ))}
    </>
  );
};

export default AddPackagingSlide;
