import React from 'react';
import { CFooter } from '@coreui/react';

const Footer: React.FunctionComponent = (): React.ReactElement => {
    return (
        <CFooter fixed={false}>
            <div>
                <span className="ml-1">2021 &copy; WSMDev</span>
            </div>
            <div className="mfs-auto">
                <span className="mr-1">Powered by</span>
                <a className="text-danger" href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
                    LamTung
                </a>
            </div>
        </CFooter>
    );
};

export default React.memo(Footer);
