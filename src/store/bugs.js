import { createSlice } from "@reduxjs/toolkit";
//with createSlice you don't have to explicitly create actions on a reducer.
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null //for caching
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    // maps actions => action handlers
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugAdded: (bugs, action) => {
      //you can write mutating code here cuz the redux toolkit will transform it into immutable
      bugs.list.push(action.payload);
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
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

const { // these event actions shouldn't be exported because are internal to the app.
  bugAdded, 
  bugResolved, 
  bugRemoved, 
  bugAssignedToUser, 
  bugsReceived,
  bugsRequested,
  bugsRequestFailed } = slice.actions;

export default slice.reducer;

// Having the command actions in another module would require the export of the event actions (reducers). By the principle of cohesion, keep the actions and the reducers together.

//Action creators
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  //caching
  const { lastFetch } = getState().entities.bugs;

  const diffInMins = moment().diff(moment(lastFetch), 'minutes');

  if (diffInMins < 10) return; //as best practice keep the time you want the caching to be valid in a config file

  dispatch(apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError: bugsRequestFailed.type
  }));
};

export const addBug = bug => apiCallBegan({
  url,
  method: "post",
  data: bug,
  onSuccess: bugAdded.type
});

export const resolveBug = id => apiCallBegan({
  url: url + "/" + id,
  method: "patch",
  data: { resolved: true },
  onSuccess: bugResolved.type
})

export const assignBugToUser = (bugId, userId) => apiCallBegan({
  url: url + "/" + bugId,
  method: "patch",
  data: { userId },
  onSuccess: bugAssignedToUser.type
})


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