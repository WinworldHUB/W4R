import PageLayout from "../lib/components/page-layout";
import { FC, useEffect } from "react";
import useApi from "../lib/hooks/useApi";
import { ListGroup, Image, Card, Button } from "react-bootstrap";
import { TEST_APIS } from "../lib/constants/api-constants";

const TestPage: FC<PageProps> = (pageProps) => {
  const { data: testUserResponse, getData } = useApi<TestUserResponse>();
  const { data: createdTestUser, postData } = useApi<CreatedTestUser>();

  const newTestUser = {
    name: "morpheus",
    job: "leader",
  };

  /// useAPI Test
  useEffect(() => {
    getData(TEST_APIS.GET_API);
  }, []);

  useEffect(() => {
    if (testUserResponse) {
      console.log(testUserResponse);
    }
  }, [testUserResponse]);

  useEffect(() => {
    if (createdTestUser) {
      console.log(createdTestUser);
      alert(`${createdTestUser?.id} user created`);
    }
  }, [createdTestUser]);

  return (
    <PageLayout {...pageProps}>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title>Users</Card.Title>
          <Button
            onClick={() =>
              postData(TEST_APIS.POST_API, JSON.stringify(newTestUser))
            }
          >
            Create
          </Button>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {(testUserResponse?.data ?? []).map((testUser) => (
              <ListGroup.Item key={testUser.id}>
                <Image
                  rounded
                  src={testUser.avatar}
                  width="50px"
                  loading="lazy"
                  title={testUser.first_name}
                  alt={testUser.last_name}
                />
                {testUser.first_name}
                {testUser.last_name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </PageLayout>
  );
};

export default TestPage;
