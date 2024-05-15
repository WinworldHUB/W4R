import { useEffect, useState } from "react";
import PageLayout from "../lib/components/page-layout";
import MembersDataTable from "../lib/components/member/members-data-table";
import useApi from "../lib/hooks/useApi";
import { MEMBERS_APIS } from "../lib/constants/api-constants";
import { Member } from "../lib/awsApis";
import PageLoading from "../lib/components/pageLoading";
import { Modal } from "react-bootstrap";
import { MemberImportLog } from "../lib/constants";

const Members = (pageProps: PageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: members, getData: getAllMembers } = useApi<Member[]>();
  const { postData: addMembers } = useApi<MemberImportLog>();
  const [failedImport, setFailedImport] = useState<Member[]>([]);

  useEffect(() => {
    getAllMembers(MEMBERS_APIS.GET_ALL_MEMBERS_API);
  }, []);

  const uploadMembers = (data: Member[]) => {
    setFailedImport([]);
    setIsLoading(true);
    addMembers(MEMBERS_APIS.IMPORT_MEMBERS_API, data).then((value) => {
      getAllMembers(MEMBERS_APIS.GET_ALL_MEMBERS_API);
      setIsLoading(false);

      console.log(value);

      setFailedImport(value?.failedImport ?? []);
    });
  };

  return (
    <PageLayout {...pageProps}>
      {members ? (
        <MembersDataTable
          data={members}
          onDataImport={(data) => {
            if (data && data.length > 0) {
              uploadMembers(data);
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

      <Modal
        show={failedImport?.length > 0}
        centered
        size="xl"
        scrollable
        onHide={() => setFailedImport([])}
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Import failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MembersDataTable
            data={failedImport}
            isEditable={false}
            title={`${failedImport?.length} members failed to import`}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={() => uploadMembers(failedImport)}
          >
            Retry
          </button>
        </Modal.Footer>
      </Modal>
    </PageLayout>
  );
};

export default Members;
