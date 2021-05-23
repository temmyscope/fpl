import React, { useState, useEffect } from 'react';
import Api  from './model/Api';
import { TemplatesLoader } from './components/TemplatesLoader';

const App = () => {
  const [states, setStates] = useState({
    templates: [], limit: 15, iterator: 0, length: 0,
    category: 'all', order: 'def', date: 'def'
  });

  const prev = () => setStates({
    ...states, iterator: (states.iterator > 0) ? states.iterator-1 : states.iterator
  });
  const next = () => setStates({
    ...states, iterator: (states.iterator*states.limit < states.length) ? states.iterator+1 : 0
  });

  useEffect(() => {

    Api.then(response => response.json())
    .then(json => {
      setStates({...states, templates: json, length: json.length });
      console.log(json);
    }).catch(err => []);
    
  }, [states]);

  return (
    <div className="App">

      <div className="page-head">
        <input type="search" placeholder="search template" className="myInput" />
        <span>Sort by: </span>
        <div>
          <select name="category" className="mySelects" onChange={(e) => setStates({...states, category: e.target.value})}>
            <option value="all">All</option>
            <option value="Education">Education</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Health">Health</option>
          </select>
          <label style={{color:'#8F8B8B',fontSize:'13px',position:'relative',left:'13px',top:'-68px'}}>Category</label>
        </div>
        <div>
          <select name="order" className="mySelects" onChange={(e) => setStates({...states, category: e.target.value})}>
            <option value="default">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <label style={{color:'#8F8B8B',fontSize:'13px',position:'relative',left:'13px',top:'-68px'}}>Order</label>
        </div>
        <div>
          <select name="date" className="mySelects" onChange={(e) => setStates({...states, category: e.target.value})}>
            <option value="default">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <label style={{color:'#8F8B8B',fontSize:'13px',position:'relative',left:'13px',top:'-68px'}}>Date</label>
        </div>
      </div>

      <div className="useless-line">
        <p style={{background: '#FFF4EA',padding:'6px'}}>
        Tada! Get started with a free template. Can’t find what you are looking for? Search from the 1000+ available templates
        </p>
      </div>
      
      <div className="topbase">
        <h4>All templates</h4>
        <h4 style={{color: 'grey'}}>{states.templates.length} templates</h4>
      </div>

      <div className="page-body">
        <div className="group">
          <TemplatesLoader states={states} />
        </div>
      </div>

      <div className="page-footer">
        <button className="btn" onClick={prev}>Previous</button>
        <span><button>{states.iterator+1}</button> of {Math.ceil(states.length/states.limit)} </span>
        <button className="btn" onClick={next}>Next <span style={{fontSize:'20px'}}>&#8250;</span></button>
      </div>

    </div>
  );
}

export default App;
