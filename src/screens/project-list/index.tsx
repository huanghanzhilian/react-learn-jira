import { useState } from "react";

import { useDebounce, useDocumentTitle } from "../../utils";
import { SearchPanel } from "./search-panel";
import List from "./list";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";
import { Row } from "components/lib";

const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useDebounce(useProjects(param), 200);
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        users={users || []}
        loading={isLoading}
        dataSource={list || []}
        projectButton={props.projectButton}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
