import { useEffect } from "react";
import PageLayout from "../lib/components/page-layout";
import MembersDataTable from "../lib/components/member/members-data-table";
import useApi from "../lib/hooks/useApi";
import { MEMBERS_APIS } from "../lib/constants/api-constants";
import { Member } from "../lib/awsApis";
import PageLoading from "../lib/components/pageLoading";
const Members = (pageProps: PageProps) => {
  const {
    data: members,
    getData: getAllMembers,
    postData: addMembers,
  } = useApi<Member[]>();

  useEffect(() => {
    getAllMembers(MEMBERS_APIS.GET_ALL_MEMBERS_API);
  }, []);

  return (
    <PageLayout {...pageProps}>
      {members ? (
        <MembersDataTable
          data={members}
          onDataImport={(data) => {
            if (data && data.length > 0) {
              addMembers(MEMBERS_APIS.IMPORT_MEMBERS_API, data).then(() => {
                getAllMembers(MEMBERS_APIS.GET_ALL_MEMBERS_API);
              });
            }
          }}
        />
      ) : (
        <PageLoading />
      )}
    </PageLayout>
  );
};

export default Members;
