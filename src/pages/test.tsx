import PageLayout from "../lib/components/page-layout";
import { FC, useEffect } from "react";
import useApi from "../lib/hooks/useApi";
import { ListGroup, Image } from "react-bootstrap";

const TestPage: FC<PageProps> = (pageProps) => {
  const { data: cartoons, getData } = useApi<Cartoon2D[]>();
  /// useAPI Test
  useEffect(() => {
    getData("https://api.sampleapis.com/cartoons/cartoons2D");
  }, []);

  useEffect(() => {
    console.log(cartoons);
  }, [cartoons]);

  return (
    <PageLayout {...pageProps}>
      <ListGroup>
        {(cartoons ?? []).map((cartoon) => (
          <ListGroup.Item key={cartoon.id}>
            <Image
              rounded
              src={cartoon.image}
              width="50px"
              loading="lazy"
              title={cartoon.title}
              alt={cartoon.title}
            />
            {cartoon.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </PageLayout>
  );
};

export default TestPage;
