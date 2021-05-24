import React from 'react';


const Card = ({ title, desc }) => {

    return(
        <div className="card">
            <h2>{title}</h2>
            <p className="card-text">
            {desc}
            </p>
            <p style={{marginBottom:'-1%'}}><button>Use Template</button></p>
        </div>
    );
}

export { Card }