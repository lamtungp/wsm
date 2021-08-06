import { CContainer, CLink } from '@coreui/react';
import React from 'react';

const ConfirmAccount: React.FunctionComponent = (): React.ReactElement => {
    React.useEffect(() => {
        document.title = '500 Error';
    }, []);

    return (
        <div className="align-items-center p-5">
            <CContainer className="text-center">
                <div className="bg-white shadow text-dark p-5">
                    <div className="notfound-404">
                        <h1>
                            5<span>0</span>0
                        </h1>
                    </div>
                    <p className="text-uppercase">
                        Oops! Something went wrong. We&apos;re looking to see what happened.
                    </p>
                    <CLink className="" to="/">
                        Go Back
                    </CLink>
                </div>
            </CContainer>
        </div>
    );
};

export default ConfirmAccount;
