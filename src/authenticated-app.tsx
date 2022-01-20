import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";

import ProjectListScreen from "screens/project-list";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={1}>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>组员</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

export default AuthenticatedApp;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: pink;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  background-color: red;
`;
