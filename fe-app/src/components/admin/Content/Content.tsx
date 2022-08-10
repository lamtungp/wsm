import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';

import routes from '../../../routes/routesAdmin';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading ...</div>
  </div>
);

const Content: React.FunctionComponent = (): React.ReactElement => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, index) => {
              return (
                route.component && (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={() => (
                      <CFade>
                        <route.component />
                      </CFade>
                    )}
                  />
                )
              );
            })}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(Content);
