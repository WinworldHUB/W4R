import PageLayout from "../lib/components/page-layout";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useAuthentication from "../lib/hooks/useAuthentication";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../lib/contexts/appcontext";

const SignIn = () => {
  const {
    error: loginError,
    isUserSignedIn,
    signInUser,
    signOutUser,
  } = useAuthentication();

  const { appState, setAppState } = useContext(AppContext);

  useEffect(() => {
    setAppState({ ...appState, isUserLoggedIn: isUserSignedIn });
  }, [isUserSignedIn]);

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  return (
    <PageLayout menuItems={[]} selectedMenuId={0} isShowSideMenu={false}>
      <Row className="d-flex justify-content-center">
        <Col xs="4">
          {!isUserSignedIn && (
            <Card>
              <Card.Header>
                <Card.Title>Sign In</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Label htmlFor="txtUsername">Username</Form.Label>
                <Form.Control
                  type="email"
                  id="txtUsername"
                  placeholder="Enter your email address"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
                <br />
                <Form.Label htmlFor="txtPassword">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="txtPassword"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <div className="w-75">
                  <span className="text-danger">{loginError ?? ""}</span>
                </div>
                <Button
                  onClick={() => {
                    signInUser(credentials);
                  }}
                >
                  Sign In
                </Button>
              </Card.Footer>
            </Card>
          )}
          {isUserSignedIn && (
            <Card>
              <Card.Header>
                <Card.Title>Sign out</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  You are logged in. To sign-out use the Sign Out button below.
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <div className="w-75">
                  <span className="text-danger">{loginError ?? ""}</span>
                </div>
                <Button onClick={signOutUser}>Sign Out</Button>
              </Card.Footer>
            </Card>
          )}
        </Col>
      </Row>
    </PageLayout>
  );
};

export default SignIn;
