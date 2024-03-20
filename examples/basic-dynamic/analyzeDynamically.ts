export function analyzeDynamically(nodes, elements, assignments, config) {
    // run the dynamic loop here
  
    let analysisResults = {
      1: [ // here is the frame/step number
        {
          node: 0,
          position: [0, 0, 0], // here is the new computed position 
        },
        {
          node: 2,
          position: [0, 0, 0],
        },
      ],
      2: [
        {
          node: 0,
          position: [0, 0, 0],
        },
        {
          node: 2,
          position: [0, 0, 0],
        },
      ],
    };

    return analysisResults;
  }