import PageLayout from "../lib/components/page-layout";
import data from "../lib/data/orders.json";
import OrdersDataTable from "../lib/components/orders-data-table";

const Home = (pageProps: PageProps) => {
  return (
    <PageLayout {...pageProps}>
      <OrdersDataTable data={data} onRowClicked={() => {}} />
    </PageLayout>
  );
};

export default Home;
