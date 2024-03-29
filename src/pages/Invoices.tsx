import PageLayout from "../lib/components/page-layout";
import InvoiceDataTable from "../lib/components/invoice/invoice-data-table";
import data from "../lib/data/invoice.json";
import { Invoice } from "../lib/awsApis";
import useApi from "../lib/hooks/useApi";
import { INVOICES_APIS } from "../lib/constants/api-constants";
import { useEffect } from "react";

const Invoices = (pageProps: PageProps) => {

  const {
    data: invoices,
    getData: getAllInvoices,

  } = useApi<Invoice[]>();
  useEffect(() => {
    getAllInvoices(INVOICES_APIS.GET_ALL_INVOICES_API);
  }, []);

  return (
    <div>
      <PageLayout {...pageProps}>
        <InvoiceDataTable data={invoices} onRowClicked={() => {}} />
      </PageLayout>
    </div>
  );
};

export default Invoices;
