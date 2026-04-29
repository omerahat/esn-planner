export type Member = {
  id: string;
  name: string;
  color: string;
};

export type PlannerEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  assignedMemberIds: string[];
};
