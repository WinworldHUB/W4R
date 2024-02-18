import PageLayout from "../lib/components/page-layout";
import InvoiceDataTable from "../lib/components/invoice-data-table";
import data from "../lib/data/invoice.json";

const Invoices = (pageProps: PageProps) => {
  return (
    <div>
      <PageLayout {...pageProps}>
        <InvoiceDataTable data={data} onRowClicked={() => {}} />
      </PageLayout>
    </div>
  );
};

export default Invoices;
