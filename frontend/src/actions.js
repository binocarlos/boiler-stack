import superagent from 'superagent'
import parallel from 'async/parallel'
import { push } from 'react-router-redux'

import {
  refreshUserStatus,
  updateUserData
} from 'boiler-frontend/lib/actions'

import {
  getCurrentProject,
  nameSort
} from './tools'

import urls from './db/urls'

export const GET_PROJECT_DATA = 'GET_PROJECT_DATA'

export const getProjectData = (database) => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PROJECT_DATA,
      status: 'loading',
      data: null
    })

    database.loadChildren({}, null, (err, results) => {
      if(err){
        dispatch({
          type: GET_PROJECT_DATA,
          status: 'error',
          data: err
        })
      }
      else {
        dispatch({
          type: GET_PROJECT_DATA,
          status: 'loaded',
          data: results
        })
      }
    })
  }
  
}

export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'

export const setCurrentProject = (id) => {
  return {
    type: SET_CURRENT_PROJECT,
    id
  }
}

export const requestUpdateUserProject = (id) => {
  return (dispatch, getState) => {
    dispatch(setCurrentProject(id))
    dispatch(updateUser({
      currentProject:id
    }))
    dispatch(push('/projects'))
  }
}

export const refreshUser = (done) => {
  return refreshUserStatus(done)
}

export const updateUser = (data, done) => {
  return updateUserData(data, done)
}

/*

  generic digger selector on the current project

  you give a section which translates to the backend ('/:projectid/{resources,templates,teams}')

  the selector is the query

  the tag is what namespaces the results in the reducer
   
*/
export const DIGGER_SELECTOR = 'DIGGER_SELECTOR'

const runDiggerSelector = (opts = {}, done) => {

  const url = [
    urls.digger,
    opts.project,
    opts.section,
    'select'
  ].join('/')

  superagent
    .get(url)
    .query({
      selector:opts.selector
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if(res.status>=500) return done(res.body)
      done(null, res.body)
    })
}

export const diggerSelector = (opts = {}, done) => {
  return (dispatch, getState) => {
    const activeProjectID = getCurrentProject(getState())
    parallel({
      project:(next) => {
        if(!activeProjectID || !opts.includeCore) return next(null, [])
        runDiggerSelector({
          section:opts.section,
          project:activeProjectID,
          selector:opts.selector
        })
      },

      core:(next) => {
        runDiggerSelector({
          section:opts.section,
          project:'core',
          selector:opts.selector
        })
      }
    }, (err, data) => {
      if(err){
        done && done(err)
        return
      }

      let finalData = [].concat(data.project || []).concat(data.core || [])
      finalData.sort(nameSort)
      dispatch({
        type:DIGGER_SELECTOR,
        tag:opts.tag,
        data:finalData
      })
      done && done(null, finalData)
    })
  }
}