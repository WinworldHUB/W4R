import { useEffect, useState } from "react";
import PageLayout from "../lib/components/page-layout";
import MembersDataTable from "../lib/components/member/members-data-table";
import useApi from "../lib/hooks/useApi";
import { MEMBERS_APIS } from "../lib/constants/api-constants";
import { Member } from "../lib/awsApis";
import PageLoading from "../lib/components/pageLoading";
import { Modal } from "react-bootstrap";
const Members = (pageProps: PageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
              setIsLoading(true);
              addMembers(MEMBERS_APIS.IMPORT_MEMBERS_API, data).then(() => {
                getAllMembers(MEMBERS_APIS.GET_ALL_MEMBERS_API);
                setIsLoading(false);
              });
            }
          }}
        />
      ) : (
        <PageLoading />
      )}

      <Modal show={isLoading} centered>
        <Modal.Header closeButton={false} className="bg-light">
          <Modal.Title>Working</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PageLoading />
        </Modal.Body>
      </Modal>
    </PageLayout>
  );
};

export default Members;
