import PageLayout from "../lib/components/page-layout";
import data from "../lib/data/orders.json";
import OrdersDataTable from "../lib/components/orders-data-table";

const Home = () => {
  return (
    <PageLayout>
      <OrdersDataTable data={data} onRowClicked={() => {}} />
    </PageLayout>
  );
};

export default Home;
