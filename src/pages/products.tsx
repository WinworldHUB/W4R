import PageLayout from "../lib/components/page-layout";
import ProductsDataTable from "../lib/components/product/products-data-table";
import useApi from "../lib/hooks/useApi";
import { useEffect } from "react";
import { PRODUCTS_APIS } from "../lib/constants/api-constants";
import { Product } from "../../awsApis";

const Products = (pageProps: PageProps) => {
  const { data: products, getData: getAllProducts } = useApi<Product[]>();
  const { data: importedProducts, postData: addProducts } = useApi<Product[]>();

  useEffect(() => {
    getAllProducts(PRODUCTS_APIS.GET_ALL_PRODUCTS_API);
  }, []);

  useEffect(() => {
    if (importedProducts) {
      alert("Imported successful");
    }
  }, [importedProducts]);

  return (
    <div>
      <PageLayout {...pageProps}>
        <ProductsDataTable
          data={products ?? []}
          onDataImport={(products) => {
            if (products && products.length > 0) {
              addProducts(PRODUCTS_APIS.IMPORT_PRODUCTS_API, products);
            }
          }}
        />
      </PageLayout>
    </div>
  );
};

export default Products;
