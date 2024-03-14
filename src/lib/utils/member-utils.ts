import { Member } from "../../../awsApis";

export const isMemberContains = (member: Member, value: string): boolean => {
  return (
    member.name.toString().includes(value) ||
    member.email.includes(value)
  );
};
