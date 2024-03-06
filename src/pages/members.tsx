import React, {useEffect} from "react";
import PageLayout from "../lib/components/page-layout";
// import data from "../lib/data/users.json";
import MembersDataTable from "../lib/components/member/members-data-table";
import useApi from "../lib/hooks/useApi";

const Members = (pageProps: PageProps) => {
  const { data, getData, postData } = useApi<Member[]>();
  useEffect(() => {
    getData("/members");
  }, []);
  const handleImportMembers= async(jsonData: Member[])=>{
    try {
      // Send the JSON data to the backend API using postData function
      const responseData = await postData(
        "/members",
        jsonData
      );
      console.log("Response from server:", responseData);
      getData("/members")
  
      // Handle response from the backend if needed
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  }
  return (
    <PageLayout {...pageProps}>
      <MembersDataTable
        data={data as Member[]}
        onDataImport={(data) => {
         handleImportMembers(data as Member[])
        }}
      />
    </PageLayout>
  );
};

export default Members;
