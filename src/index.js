import configureStore from './store/configureStore';
import { loadBugs, addBug, assignBugToUser } from './store/bugs';

const store = configureStore();

// UI Layer
store.dispatch(addBug({ description: 'bugguidy'}));
store.dispatch(loadBugs());

setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 3000);