import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  FETCH_PUBLIC_IDEAS_FAILURE,
  FETCH_PUBLIC_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_SINGLE_IDEA_FAILURE,
  FETCH_SINGLE_IDEA_SUCCESS,
  DELETE_SINGLE_IDEA_FAILURE,
  DELETE_SINGLE_IDEA_SUCCESS,
  CREATE_IDEA_FAILURE,
  CREATE_IDEA_SUCCESS,
  EDIT_IDEA_FAILURE,
  EDIT_IDEA_SUCCESS
} from '../../src/actions/actionTypes';

import {
  createIdeaSuccess,
  createIdeaFailure,
  createIdeas,
  fetchAllPublicIdeas,
  fetchAllPublicIdeasFailure,
  fetchAllPublicIdeasSuccess,
  fetchUserIdeas,
  fetchUserIdeasFailure,
  fetchUserIdeasSuccess,
  fetchSingleIdea,
  fetchSingleIdeaFailure,
  fetchSingleIdeaSuccess,
  deleteIdea,
  deleteIdeaFailure,
  deleteIdeaSuccess,
  editIdeaSuccess,
  editIdeaFailure,
  editIdeas
} from '../../src/actions/ideaActions';

import mockItems from '../__mocks__/mockItems';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

jest.mock('react-router');


window.localStorage = mockLocalStorage;
const token = jwt.sign({ id: 1, user: 'Gbenga' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { ideas, idea } = mockItems;
const response = {
  status: 200,
  message: 'Ideas fetched successfully',
  ideas
};


describe('createidea ', () => {
  it('should create createIdeaSuccess action response', () => {
    const expectedAction = {
      type: CREATE_IDEA_SUCCESS,
      newIdea: idea
    };
    expect(createIdeaSuccess(idea)).toEqual(expectedAction);
  });

  it('should create an idea', () => {
    const expectedAction = {
      type: CREATE_IDEA_FAILURE,
      message: 'an error occured while processing your request'
    };
    expect(createIdeaFailure('an error occured while processing your request'))
      .toEqual(expectedAction);
  });

  it(
    'should dispatch a sucessful action when an idea is created succesfully',
    () => {
      response.newidea = response.ideas;

      fetchMock.postOnce(
        '/api/v1/idea',
        JSON.stringify(response)
      );

      const initialState = {};
      const store = mockStore(initialState);
      const actions = store.getActions();
      const expectedActions = [
        {
          type: CREATE_IDEA_SUCCESS,
          newIdea: response.ideas
        },
      ];
      return store.dispatch(createIdeas(response.ideas))
        .then(() => {
          expect(actions).toEqual(expectedActions);
          store.clearActions();
          fetchMock.reset();
        })
        .catch();
    }
  );
});
describe('Fetch idea Action', () => {
  it('should create fetchIdeasSuccess action response', () => {
    const expectedAction = {
      type: FETCH_PUBLIC_IDEAS_SUCCESS,
      ideas
    };
    expect(fetchAllPublicIdeasSuccess(ideas)).toEqual(expectedAction);
  });

  it('should create an action to receive fetchPublicIdeas error', () => {
    const expectedAction = {
      type: FETCH_PUBLIC_IDEAS_FAILURE,
      message: 'kd'
    };
    expect(fetchAllPublicIdeasFailure('kd')).toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    fetchMock.getOnce(
      '/api/v1/ideas',
      JSON.stringify(response)
    );

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: FETCH_PUBLIC_IDEAS_SUCCESS,
        ideas: response.ideas
      },
    ];
    return store.dispatch(fetchAllPublicIdeas())
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});


describe('Fetch user ideas Action', () => {
  it('should create fetchUserIdeasSuccess action response', () => {
    const expectedAction = {
      type: FETCH_USER_IDEAS_SUCCESS,
      ideas
    };
    expect(fetchUserIdeasSuccess(ideas)).toEqual(expectedAction);
  });

  it('should create an action to receive fetchPublicIdeas error', () => {
    const expectedAction = {
      type: FETCH_USER_IDEAS_FAILURE,
      message: 'an error occured'
    };
    expect(fetchUserIdeasFailure('an error occured')).toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    fetchMock.get(
      '/api/v1/user/ideas',
      JSON.stringify(response)
    );

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: FETCH_USER_IDEAS_SUCCESS,
        ideas: response.ideas
      },
    ];
    return store.dispatch(fetchUserIdeas())
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

describe('Fetch single idea Action', () => {
  const id = 'dljdljfdkkldflkdjfio9049u4';

  it('should create fetchSingleIdeaSuccess action response', () => {
    const expectedAction = {
      type: FETCH_SINGLE_IDEA_SUCCESS,
      idea
    };
    expect(fetchSingleIdeaSuccess(idea)).toEqual(expectedAction);
  });

  it('should create an action to receive fetchSingleIdea error', () => {
    const expectedAction = {
      type: FETCH_SINGLE_IDEA_FAILURE,
      message: 'an error occured'
    };
    expect(fetchSingleIdeaFailure('an error occured')).toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    fetchMock.get(
      `/api/v1/idea/${id}`,
      JSON.stringify(response)
    );

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: FETCH_SINGLE_IDEA_SUCCESS,
      },
    ];
    return store.dispatch(fetchSingleIdea(id))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

describe('Delete idea Action', () => {
  const id = 'dljdljfdkkldflkdjfio9049u4';

  it('should create deleteIdeaSuccess action response', () => {
    const expectedAction = {
      type: DELETE_SINGLE_IDEA_SUCCESS
    };
    expect(deleteIdeaSuccess()).toEqual(expectedAction);
  });

  it('should create fetchSingleIdea error', () => {
    const expectedAction = {
      type: DELETE_SINGLE_IDEA_FAILURE
    };
    expect(deleteIdeaFailure()).toEqual(expectedAction);
  });

  it('should sucessfully deleted an idea', () => {
    response.status = 200;
    response.message = 'idea deleted successfully';
    fetchMock.deleteOnce(
      `/api/v1/idea/${id}`,
      JSON.stringify(response)
    );

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: DELETE_SINGLE_IDEA_SUCCESS,
      },
    ];
    return store.dispatch(deleteIdea(id))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

describe('Edit idea successful test ', () => {
  it('should call editIdeaSuccess action response', () => {
    const expectedAction = {
      type: EDIT_IDEA_SUCCESS,
      newIdea: idea
    };
    expect(editIdeaSuccess(idea)).toEqual(expectedAction);
  });

  it('should dispactch edit idea failed action', () => {
    const expectedAction = {
      type: EDIT_IDEA_FAILURE,
      message: 'an error occured while processing your request'
    };
    expect(editIdeaFailure('an error occured while processing your request'))
      .toEqual(expectedAction);
  });

  it(
    'should dispatch a sucessful action when an idea is edited succesfully',
    () => {
      response.modifiedIdea = response.ideas;
      const id = 'dljdljfdkkldflkdjfio9049u4';

      fetchMock.putOnce(
        `/api/v1/idea/${id}`,
        { status: 200, body: response }
      );

      const initialState = {};
      const store = mockStore(initialState);
      const actions = store.getActions();
      const expectedActions = [
        {
          type: EDIT_IDEA_SUCCESS,
          newIdea: response.ideas
        },
      ];
      return store.dispatch(editIdeas(response.ideas, id))
        .then(() => {
          expect(actions).toEqual(expectedActions);
          store.clearActions();
          fetchMock.reset();
        })
        .catch();
    }
  );
});
