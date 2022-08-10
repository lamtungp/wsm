import React from 'react';

const FallbackError = () => {
  React.useEffect(() => {
    document.title = 'Error';
  }, []);

  return (
    <div className="align-items-center p-5">
      <div className="text-center container">
        <h3 className="text-uppercase">Oops!!Something went wrong. We&apos;re looking to see what happened.</h3>
      </div>
    </div>
  );
};

export default FallbackError;
