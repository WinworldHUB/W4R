import PageLayout from "../lib/components/page-layout";
import data from "../lib/data/products.json";
import ProductsDataTable from "../lib/components/products-data-table";

const Products = (pageProps: PageProps) => {
  return (
    <div>
      <PageLayout {...pageProps}>
        <ProductsDataTable data={data} onRowClicked={() => {}} />
      </PageLayout>
    </div>
  );
};

export default Products;
