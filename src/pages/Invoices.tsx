import PageLayout from "../lib/components/page-layout";
import InvoiceDataTable from "../lib/components/invoice-data-table";
import data from "../lib/data/invoice.json";

const Invoices = () => {
  return (
    <div>
      <PageLayout isShowSideMenu>
        <InvoiceDataTable data={data} onRowClicked={() => {}} />
      </PageLayout>
    </div>
  );
};

export default Invoices;
