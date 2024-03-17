import { FC, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { dateFromString } from "../../utils/date-utils";
import { Member } from "../../awsApis";
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
            labelKey="name"
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
                    Name: <strong>{selectedMember?.name}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email: <strong>{selectedMember?.email}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Phone: <strong>{selectedMember?.phone ?? "NA"}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Membership:{" "}
                    <strong>
                      {selectedMember?.active ? "Active" : "Inactive"}
                    </strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Postal Code: <strong>{selectedMember?.zip ?? "NA"}</strong>
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
