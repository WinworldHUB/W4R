import { FC, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { dateFromString } from "../../utils/date-utils";
import { Member } from "../../../../awsApis";
interface AddMemberSlideProps {
  selectedMember: Member;
  members: Member[];
  onSelectedMember: (member: Member) => void;
}

const AddMemberSlide: FC<AddMemberSlideProps> = ({
  selectedMember,
  members,
  onSelectedMember,
}) => {
  return (
    <Container className="min-400">
      <Row>
        <Col xs="auto">Select member:</Col>
        <Col>
          <Typeahead
            id="select-member-slide-typeahead"
            options={members}
            labelKey="Customer name"
            onChange={(selected: unknown[]) => {
              const member = selected[0] as Member;

              if (member) {
                onSelectedMember(member);
              }
            }}
          />
        </Col>
      </Row>
      {selectedMember && (
        <Row className="pt-3">
          <Col>
            <Card>
              <Card.Header>
                <Card.Title>Member details</Card.Title>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    Name: <strong>{selectedMember?.["Customer name"]}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email: <strong>{selectedMember?.["Customer email"]}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phone: <strong>{selectedMember?.["Customer phone"]}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Membership:{" "}
                    <strong>{selectedMember?.["Line 0 title"]}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Last order date:{" "}
                    <strong>
                      {dateFromString(selectedMember?.["Last order date"]) ??
                        selectedMember?.["Last order date"]}
                    </strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Last order amount:{" "}
                    <strong>{selectedMember?.["Last order amount"]}</strong>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AddMemberSlide;
