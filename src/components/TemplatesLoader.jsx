import React from 'react';
import { Card } from './Card';
import { limitByCategory, search, sortByDate, sortByAlphabeth }  from '../model/Models';

const TemplatesLoader = ({ states }) => {
    var templatesArray = states.templates;

    if(states.length === 0){
      return <span style={{width:'100%',textAlign:'center'}}>Loading</span>;
    }

    templatesArray = (states.query !== '')? search(templatesArray, states.query) : templatesArray;

    templatesArray = (states.category !== 'all')? limitByCategory(templatesArray, states.category) : templatesArray;

    templatesArray = (states.order !== 'default')? sortByAlphabeth(templatesArray, states.order) : templatesArray;   

    templatesArray = (states.date !== 'default')? sortByDate(templatesArray, states.date) : templatesArray;

    if(templatesArray.length === 0){
      return <span style={{width:'100%',textAlign:'center'}}>No results was found</span>;
    }

    let templates = [];
    const boundary = (states.iterator+1)*states.limit;
    const upperBoundary = (boundary > states.length) ? states.length : boundary;
    const start = states.iterator*states.limit;

    for(let i = start; i < upperBoundary; i++){
      templates.push(templatesArray[i]);
    }

    return(
    <>
      {(templates.length === 0)? <></>:
      templates.map((template, index) => (<Card title={template.name} desc={template.description} key={index} />))
      }
    </>
    );
}

export { TemplatesLoader }