const Api = fetch('https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates');

const capitalize = (myStr) => 
  myStr.toLowerCase().split(' ').map(
    word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');

const limitByCategory = (arr, cat) => {
    if(cat === 'all'){
      return arr;
    }
    let filtered = [];
    for (let i = 0; i < arr.length; i++) {
      if( arr[i].category.includes(cat) ){
        filtered.push(arr[i]);
      }
    }
    return filtered;
}

const sortByAlphabeth = (arr, sort='asc') => {
    if(sort !== 'default'){
      arr.sort((a, b) => {
        var keyA = a.name, keyB = b.name;
        if (keyA < keyB) return (sort==='asc') ? -1 : 1;
        if (keyA > keyB) return (sort==='asc') ? 1 : -1;
        return 0;
      });
    }
    return arr;
}

const sortByDate = (arr, sort='asc') => {
    if(sort !== 'default'){
      arr.sort((a, b) => {
        var keyA = new Date(a.created), keyB = new Date(b.created);
        if (keyA < keyB) return (sort==='asc') ? -1 : 1;
        if (keyA > keyB) return (sort==='asc') ? 1 : -1;
        return 0;
      });
    }
    return arr;
}

const search = (arr, query) => {
    if(query === ''){
      return arr;
    }
    let filtered = [];
    for (let i = 0; i < arr.length; i++) {
      if( arr[i].name.indexOf(query) !== -1){
        filtered.push(arr[i]);
      }
    }
    return filtered;
}

export { Api, capitalize, limitByCategory, search, sortByDate, sortByAlphabeth }