import { createSlice } from "@reduxjs/toolkit";
//with createSlice you don't have to explicitly create actions on a reducer.
import { createSelector } from 'reselect';


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

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex(bug => bug.id === bugId);
      bugs[index].userId = userId;
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      return bugs.filter(bug => bug.id !== action.payload.id)
    }    
  }
});

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } = slice.actions;
export default slice.reducer;

//Selector

  //Memoization
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs, 
  bugs => bugs.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => bug.userId === userId)
);