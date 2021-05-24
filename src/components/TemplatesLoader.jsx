import React from 'react';
import { Card } from './Card';
import { capitalize, limitByCategory, search, sortByDate, sortByAlphabeth }  from '../model/Models';

const TemplatesLoader = ({ states }) => {
    var templatesArray = states.templates;

    if(states.length === 0){
      return (<span id="placeholder" style={{display:'flex',justifyContent:'center',width:'100%',textAlign:'center'}}>
        Templates Loading... please wait
      </span>);
    }
    //search through templates if query state is not empty
    templatesArray = (states.query !== '')? search(templatesArray, states.query) : templatesArray;

    //limit the total content by category filter
    templatesArray = (states.category !== 'all')? limitByCategory(templatesArray, states.category) : templatesArray;

    //sort templates using alphatical order
    templatesArray = (states.order !== 'default')? sortByAlphabeth(templatesArray, states.order) : templatesArray;   

    //sort templates using date order
    templatesArray = (states.date !== 'default')? sortByDate(templatesArray, states.date) : templatesArray;

    //if after all the back and forth, If It's empty, just return this block
    if(templatesArray.length === 0){
      return(<span id="placeholder" style={{display:'flex',justifyContent:'center',width:'100%',textAlign:'center'}}>
        No results was found
      </span>);
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
      <div className="topbase">
        <h4>{capitalize(states.category)} templates</h4>
        <h4 style={{color: 'grey'}}>{templatesArray.length} templates {states.query !== '' && 'Found'}</h4>
      </div>

      <div className="page-body">
        <div className="group">
        {templates.map((template, index) => (<Card title={template.name} desc={template.description} key={index} />))}
        </div>
      </div>
    </>
    );
}

export { TemplatesLoader }