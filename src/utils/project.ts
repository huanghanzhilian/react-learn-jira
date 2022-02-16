import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  // const client = useHttp();
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = useCallback(
  //   () => client("projects", { data: cleanObject(param || {}) }),
  //   [param, client]
  // );
  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects });
  // }, [param]);

  // return result;

  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  // const { run, ...asyncResult } = useAsync();
  // const client = useHttp();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };

  const client = useHttp();
  const queryclient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryclient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  // const { run, ...asyncResult } = useAsync();
  // const client = useHttp();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };

  const client = useHttp();
  const queryclient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryclient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
