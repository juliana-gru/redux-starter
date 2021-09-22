import { createSlice } from "@reduxjs/toolkit";
//with createSlice you don't have to explicitly create actions on a reducer.
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

let lastId = 0

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    // maps actions => action handlers
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },
    bugAdded: (bugs, action) => {
      //you can write mutating code here cuz the redux toolkit will transform it into immutable
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      return bugs.list.filter(bug => bug.id !== action.payload.id)
    }    
  }
});

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser, bugsReceived } = slice.actions;
export default slice.reducer;

//Action creators
const url = "/bugs";
export const loadBugs = () => apiCallBegan({
  url,
  onSuccess: bugsReceived.type,
});



//Selector

  //Memoization
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs, 
  bugs => bugs.list.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.list.filter(bug => bug.userId === userId)
);