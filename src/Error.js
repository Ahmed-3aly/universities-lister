import React from 'react';
import './Error.css';

function Error() {
    return (
        <div
            className='Error'
            onClick={() => window.location.reload()}
        >
            <div>Error fetching data</div>;
        </div>
    );
}

export default Error;
