import { createSlice } from "@reduxjs/toolkit";
//with createSlice you don't have to explicitly create actions on a reducer.

let lastId = 0

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // maps actions => action handlers
    bugAdded: (bugs, action) => {
      //you can write mutating code here cuz the redux toolkit will transform it into immutable
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      return bugs.filter(bug => bug.id !== action.payload.id)
    }    
  }
})

export const {bugAdded, bugResolved, bugRemoved} = slice.actions;
export default slice.reducer;

