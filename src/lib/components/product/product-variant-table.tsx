import { ExpanderComponentProps } from "react-data-table-component";
import { Product } from "../../awsApis";
import { Table } from "react-bootstrap";

const VariantsTableComponent = (product: ExpanderComponentProps<Product>) => {
  const variants = JSON.parse(
    product.data.variants ?? "[]"
  ) as ProductVariant[];
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th className="bg-primary text-white shadow">Size</th>
          <th className="bg-primary text-white shadow">Price</th>
        </tr>
      </thead>
      <tbody>
        {(variants ?? []).map((variant) => (
          <tr key={variant.size}>
            <td>{variant.size}</td>
            <td>{variant.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default VariantsTableComponent;
