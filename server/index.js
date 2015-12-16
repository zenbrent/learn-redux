// Load babel so we can use all the es6 features. 
require("babel/register")({ stage: 1 });
require("./server.js").default();
