import React from "react";
import PageLayout from "../lib/components/page-layout";
import data from "../lib/data/users.json";
import MembersDataTable from "../lib/components/members-data-table";

const Members = () => {
  return (
    <PageLayout>
      <MembersDataTable data={data} />
    </PageLayout>
  );
};

export default Members;
