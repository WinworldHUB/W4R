import React from "react";
import PageLayout from "../lib/components/page-layout";
import data from "../lib/data/users.json";
import UserTable from "../lib/components/userTable";

const Users = () => {
  return (
    <PageLayout>
      <UserTable data={data} />
    </PageLayout>
  );
};

export default Users;
