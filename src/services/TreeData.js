import data from '../services/treeData.json';

// This service could in reality be a lot more complicated than what this is, but:
// 1.) There could be other components that might want tree data
// 2.) It's separating the concerns of fetching the data and displaying it.
const getTreeData = (year) => {

    // If using the real API, then we could do something like this...
    // return fetch('https://public.ecologi.com/trees')
    //     .then(response => response.json());
    
    // But since we're not, just return our fake data.
    return Promise.resolve(data.filter((item) => item.year == year));
}

export {
    getTreeData,
}