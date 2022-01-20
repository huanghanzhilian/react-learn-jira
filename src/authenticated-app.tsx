import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";

import ProjectListScreen from "screens/project-list";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <button onClick={logout}>登出</button>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  );
};

export default AuthenticatedApp;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
`;

const Header = styled.header`
  grid-area: header;
  background-color: pink;
`;

const Main = styled.main`
  grid-area: main;
`;

const Nav = styled.nav`
  grid-area: nav;
  background-color: brown;
`;

const Aside = styled.aside`
  grid-area: aside;
  background-color: green;
`;
const Footer = styled.footer`
  grid-area: footer;
  background-color: yellow;
`;
