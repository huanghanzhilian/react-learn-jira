import { TaskType } from "types/task-type";
import { useHttp } from "./http";
import { useQuery } from "react-query";

export const useTaskTypes = () => {
  const client = useHttp();
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
