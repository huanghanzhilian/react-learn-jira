import React, { useState, useEffect } from "react";

import { useMount, useDebounce, cleanObject } from "../../utils";
import { useHttp } from "utils/http";

import { SearchPanel } from "./search-panel";
import List from "./list";
import styled from "@emotion/styled";
import { Typography } from "antd";

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const debouncedParam = useDebounce(param, 200);

  const client = useHttp();

  useEffect(() => {
    setIsLoading(true);
    client("projects", {
      data: cleanObject(debouncedParam),
    })
      .then((res) => {
        setList(res);
        setError(null);
      })
      .catch((err) => {
        setList([]);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users} loading={isLoading} dataSource={list} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
