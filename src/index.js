import configureStore from './store/configureStore';
import { 
  bugAdded, 
  bugResolved, 
  bugRemoved, 
  bugAssignedToUser, 
  getBugsByUser, 
  getUnresolvedBugs
} from './store/bugs';
import{ projectAdded }from './store/projects';
import { userAdded } from './store/users';

const store = configureStore();

store.subscribe(() => {
  console.log('Store changed.')
})

store.dispatch(userAdded({ name: "Petra" }));
store.dispatch(userAdded({ name: "Mel" }));


store.dispatch(projectAdded({ name: "Project 1" })); 

store.dispatch(bugAdded({ description:"Bug 1" }));
store.dispatch(bugAdded({ description:"Bug 2" }));
store.dispatch(bugAdded({ description:"Bug 3" }));
store.dispatch(bugAssignedToUser({ userId: 1, bugId: 1 }));
store.dispatch(bugResolved({ id: 1 }));

const unresolvedBugs = getUnresolvedBugs(store.getState());
const bugs = getBugsByUser(1)(store.getState());
console.log(unresolvedBugs);
console.log(bugs);