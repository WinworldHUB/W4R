export const isMemberContains = (member: Member, value: string): boolean => {
  return (
    member["Customer name"].toString().includes(value) ||
    member["Customer email"].includes(value) ||
    member.Status.includes(value) ||
    member["Payment method brand"].toString().includes(value) ||
    (member["Created at"] ?? "").includes(value) ||
    (member["Last Order Date"] ?? "").includes(value)
  );
};
