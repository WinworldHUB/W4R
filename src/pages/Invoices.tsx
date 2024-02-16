import React from 'react'
import PageLayout from '../lib/components/page-layout'
import InvoiceTable from '../lib/components/InvoiceTable'

const Invoices = () => {
  return (
    <div>
      <PageLayout isShowSideMenu>
        <InvoiceTable/>
      </PageLayout>
    </div>
  )
}

export default Invoices
