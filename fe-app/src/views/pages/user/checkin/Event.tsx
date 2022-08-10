import React from 'react';

const CustomEvents = (event: any) => {
  const handleTime = (s: string) => {
    const arr = s.split(':');
    return +arr[0] * 3600 + +arr[1] * 60;
  };
  // console.log(event.title);
  return (
    <div className="text-center">
      {event.title.map((item: any, index: any) => {
        return (
          <div
            key={index}
            className={
              !!item && handleTime(item) > handleTime('9:01') && handleTime(item) < handleTime('18:00')
                ? 'badge badge-pill badge-danger mr-1'
                : 'badge badge-pill badge-success mr-1'
            }
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default CustomEvents;
