import React from 'react';
import { Card } from './Card';

const TemplatesLoader = ({ states }) => {

    if(states.length === 0 || states.templates.length === 0){
      return <span style={{width:'100%',textAlign:'center'}}>Loading</span>;
    }
    
    let templates = [];
    const boundary = (states.iterator+1)*states.limit;
    const upperBoundary = (boundary > states.length) ? states.length : boundary;
    const start = states.iterator*states.limit;

    for(let i = start; i < upperBoundary; i++){
      templates.push(states.templates[i]);
    }

    return(
    <>
      {( templates.length === 0)? <></>:
      templates.map((template, index) => (<Card title={template.name} desc={template.description} key={index} />))
      }
    </>
    );
}

export { TemplatesLoader }