import React, { useState, useEffect } from 'react';
import { Api }  from './model/Models';
import { TemplatesLoader } from './components/TemplatesLoader';

const App = () => {
  const [states, setStates] = useState({
    templates: [], limit: 15, iterator: 0, length: 0,
    category: 'all', order: 'default', date: 'default', query: ''
  });

  const prev = () => setStates({
    ...states, iterator: (states.iterator > 0) ? states.iterator-1 : states.iterator
  });
  const next = () => setStates({
    ...states, iterator: (states.iterator*states.limit < states.length) ? states.iterator+1 : 0
  });

  useEffect(() => {

    //load templates before first render
    Api.then(response => response.json())
    .then(json => {
      setStates({...states, templates: json, length: json.length });
      console.log(json);
    }).catch(err => []);
    
  }, [states]);

  const chooseCategory = (e) => setStates({
    ...states, category:  e.target.value, order: 'default', date: 'default', query: ''
  });
  const chooseOrderSort = (e) => setStates({...states, order: e.target.value});
  const chooseDateSort = (e) => setStates({...states, date: e.target.value });
  const searchTemplates = (e) => setStates({...states, query: e.target.value });

  return (
    <div className="App">

      <div className="page-head">
        <input 
          type="search" placeholder="search template" className="myInput"
          onChange={searchTemplates} value={states.query}
        />
        <span>Sort by: </span>
        <div>
          <select id="cat" name="category" className="mySelects" onChange={chooseCategory} value={states.category}>
            <option value="all">All</option>
            <option value="Education">Education</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Health">Health</option>
          </select>
          <label style={{color:'#8F8B8B',fontSize:'13px',position:'relative',left:'13px',top:'-68px'}}>Category</label>
        </div>
        <div>
          <select id="order" name="order" className="mySelects" onChange={chooseOrderSort} value={states.order}>
            <option value="default">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <label style={{color:'#8F8B8B',fontSize:'13px',position:'relative',left:'13px',top:'-68px'}}>Order</label>
        </div>
        <div>
          <select id="date" name="date" className="mySelects" onChange={chooseDateSort} value={states.date}>
            <option value="default">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <label style={{color:'#8F8B8B',fontSize:'13px',position:'relative',left:'13px',top:'-68px'}}>Date</label>
        </div>
      </div>

      <div className="useless-line">
        <p style={{background: '#FFF4EA',padding:'6px'}}>
        <i id="caution" style={{marginRight:'2px'}} >  i </i> 
        Tada! Get started with a free template. Can’t find what you are looking for? Search from the 1000+ available templates
        </p>
      </div>
      
      <TemplatesLoader states={states} />
      
      <div className="page-footer">
        <button className="btn" onClick={prev}>Previous</button>
        <span><button>{states.iterator+1}</button> of {Math.ceil(states.length/states.limit)} </span>
        <button className="btn" onClick={next}>Next <span style={{fontSize:'20px'}}>&#8250;</span></button>
      </div>

    </div>
  );
}

export default App;