import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { addBug } from '../bugs';
import { configureStore } from '../configureStore';

describe('bugsSlice', () => {
  let  fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  })

  const bugsSlice = () => store.getState().entites.bugs;

  it('should add the bug to the store if it is saved to the server', async () => {
    //Arrange
    const bug = { description: 'abc' };
    const savedBug = { ...bug, id:1 };    
    fakeAxios.onPost('/bugs').reply(200, savedBug);    

    //Act
    await store.dispatch(addBug(bug));

    //Assert
    expect(bugsSlice().list).toContainEqual(savedBug);
  })

  it('should not add the bug to the store if it is saved to the server', async () => {
    //Arrange
    const bug = { description: 'abc' };  
    fakeAxios.onPost('/bugs').reply(500);    

    //Act
    await store.dispatch(addBug(bug));

    //Assert
    expect(bugsSlice().list).toHaveLength(0);
  })
})