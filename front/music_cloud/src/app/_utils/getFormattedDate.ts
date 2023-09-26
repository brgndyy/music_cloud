import moment from "moment";

export const getFormattedDate = (createdAt: string) => {
  return moment(createdAt).fromNow();
};
