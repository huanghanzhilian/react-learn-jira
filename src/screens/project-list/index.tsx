import React, { useState, useEffect } from "react";

import qs from "qs";

import { useMount, useDebounce, cleanObject } from "../../utils";
import { useHttp } from "utils/http";

import { SearchPanel } from "./search-panel";
import List from "./list";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 200);

  const client = useHttp();

  useEffect(() => {
    client("projects", {
      data: cleanObject(debouncedParam),
    }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
