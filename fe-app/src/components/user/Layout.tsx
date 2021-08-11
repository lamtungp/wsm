import React from 'react';

import { Content, Sidebar, Footer, Header } from './index';

const Layout: React.FunctionComponent = (): React.ReactElement => {
  return (
    <>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <Header />
          <div className="c-body">
            <Content />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
