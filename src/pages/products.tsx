import { useEffect, useState } from "react";
import PageLayout from "../lib/components/page-layout";
// import data from "../lib/data/formatted_products.json";
import ProductsDataTable from "../lib/components/product/products-data-table";
import useApi from "../lib/hooks/useApi";

const Products = (pageProps: PageProps) => {
  // const [data,setData] = useState<Product[]>([])
  const { data, getData, postData } = useApi<Product[]>();
  useEffect(() => {
    getData("/products");
  }, []);
  const handleImportProduct = async(jsonData: Product[])=>{
    try {
      // Send the JSON data to the backend API using postData function
      const responseData = await postData(
        "/products/imports",
        jsonData
      );
      console.log("Response from server:", responseData);
      getData("/products")
  
      // Handle response from the backend if needed
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  }
  return (
    <div>
      <PageLayout {...pageProps}>
        <ProductsDataTable
          data={data ?? []}
          onRowClicked={() => {}}
          onDataImport={handleImportProduct}
        />
      </PageLayout>
    </div>
  );
};

export default Products;
