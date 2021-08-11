import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../../views/pages/error/ErrorFallback';

import { Content, Sidebar, Footer, Header } from './index';

const Layout: React.FunctionComponent = (): React.ReactElement => {
  return (
    <>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Header />
          </ErrorBoundary>
          <div className="c-body">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Content />
            </ErrorBoundary>
          </div>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Footer />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Layout;
