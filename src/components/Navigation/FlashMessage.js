import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const FlashMessage = ({ title, duration, type }) => {
  const { createFlashMessagesHandler } = useContext(AppContext);
  useEffect(() => {
    setTimeout(() => {
      createFlashMessagesHandler({
        title: '',
        duration: 0,
        type: '',
      });
    }, 1500);
  }, []);
  return (
    <div className="floating-alerts">
      <div
        className={`alert alert-${type} text-center floating-alert shadow-sm`}
      >
        {title}
      </div>
    </div>
  );
};

export default FlashMessage;
