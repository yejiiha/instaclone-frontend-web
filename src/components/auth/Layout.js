import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 95px;
  max-width: 930px;
  width: 100%;
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}

export default Layout;
