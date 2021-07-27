import { CLink, CWidgetDropdown } from '@coreui/react';
import React from 'react';

export interface widgets {
    widget: {
        color: string;
        header: string;
        text: string;
        path: string;
        icon: any;
    };
}

const WidgetDropdown: React.FunctionComponent<widgets> = ({ widget }): React.ReactElement => {
    return (
        <CWidgetDropdown
            color={widget.color}
            header={widget.header}
            text={widget.text}
            footerSlot={
                <>
                    <CLink
                        className="text-center text-white text-decoration-none p-2"
                        style={{ opacity: 1 }}
                        to={widget.path}
                    >
                        Xem thêm
                    </CLink>
                </>
            }
            style={{ height: '200px' }}
        >
            {widget.icon}
        </CWidgetDropdown>
    );
};

export default WidgetDropdown;
