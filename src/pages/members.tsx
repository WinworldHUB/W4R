import React from "react";
import PageLayout from "../lib/components/page-layout";
import data from "../lib/data/users.json";
import MembersDataTable from "../lib/components/member/members-data-table";

const Members = (pageProps: PageProps) => {
  return (
    <PageLayout {...pageProps}>
      <MembersDataTable data={data} />
    </PageLayout>
  );
};

export default Members;
