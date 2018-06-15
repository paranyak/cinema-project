import {
  FETCH_ACTOR_SLUG,
  FETCH_ACTOR_SLUG_SUCCESS,
  EDITING_ACTOR_SUCCESS,
  EDITING_ACTOR_START,
  FETCH_UNPUBLISHED_ACTORS_SUCCESS,
  FETCH_ACTOR_DELETE_SUCCESS,
  POST_ACTOR_SUCCESS,
  POST_ACTOR_START,
  FETCH_ACTOR_SLUG_FAIL,
  CHECK_NAME_ACTOR,
  CHECK_NAME_ACTOR_SUCCESS,
} from "../helpers/actionTypes"
import * as fromApi from "../api/fetch"
import { actorsListSchemaSlug } from "../helpers/schema"
import { push } from "react-router-redux"
import { normalize } from "normalizr"

import * as fromFetch from "./index"

export const editingActorStart = actor => ({ type: EDITING_ACTOR_START, actor })

export const fetchActorsSlugStart = slugName => ({ type: FETCH_ACTOR_SLUG, slugName })

export const fetchUnpublishedActorsSuccess = (slugs, actors, metaData) => ({
  type: FETCH_UNPUBLISHED_ACTORS_SUCCESS,
  slugs,
  actors,
  metaData,
})

export const actorPostStart = actor => ({ type: POST_ACTOR_START, actor })

export const fetchActorsDeleteSuccess = slugName => ({ type: FETCH_ACTOR_DELETE_SUCCESS, slugName })

export const postActorSuccess = (slugName, actor) => ({
  type: POST_ACTOR_SUCCESS,
  actor,
  slugName,
})

export const fetchActorsSlugSuccess = (slugName, slugs, actors = [], metaData) => ({
  type: FETCH_ACTOR_SLUG_SUCCESS,
  slugName,
  actors,
  slugs,
  metaData,
})

export const fetchActorSlugFail = (slugName, slugs, actors = []) => ({
  type: FETCH_ACTOR_SLUG_FAIL,
  error: true,
  slugName,
  slugs,
  actors,
})

export const editingActorSuccess = (actor, slugName) => ({ type: EDITING_ACTOR_SUCCESS, actor, slugName })

export const checkingNameSuccess = result => ({
  type: CHECK_NAME_ACTOR_SUCCESS,
  result,
})

export const checkingNameActor = name => ({ type: CHECK_NAME_ACTOR, name })

// -------------------------------------------------------

export const fetchUnpublishedActors = () => async dispatch => {
  dispatch(fetchActorsSlugStart("unpublished"))
  let actorData = await fromApi.unpublishedActors()
  let actors = []
  if (actorData.result) {
    actors = actorData.result
    actors = normalize(actors, actorsListSchemaSlug)
  }
  dispatch(fetchUnpublishedActorsSuccess(actors.result, actors.entities.actors, actorData.metaData))
}

export const fetchAdditionalActors = (limit, page) => async dispatch => {
  dispatch(fetchActorsSlugStart("additional"))
  let actorsData = await fromApi.additionalActors(limit, page)
  let actors = []
  if (actorsData.result) {
    actors = actorsData.result
  }
  actors = normalize(actors, actorsListSchemaSlug)
  dispatch(fetchActorsSlugSuccess("additional", actors.result, actors.entities.actors, actorsData.metaData))
}

export const fetchDeleteActor = slugName => async dispatch => {
  dispatch(fetchActorsSlugStart("delete"))
  await fromApi.deleteActor(slugName)
  dispatch(fetchActorsDeleteSuccess(slugName))
  dispatch(push("/allactors"))
}

export const fetchActorsSlug = slugName => async dispatch => {
  dispatch(fetchActorsSlugStart(slugName))
  let actorData = await (await fromApi.actorsBySlugName(slugName)).json()
  let actor = []
  if (actorData.result) {
    actor = actorData.result
    actor.slugName = actor["slugName"]
    actor = normalize([actor], actorsListSchemaSlug)
    if (actor.entities.actors[slugName].published) {
      dispatch(fetchActorsSlugSuccess(slugName, actor.result, actor.entities.actors, actorData.metaData))
    } else {
      dispatch(fetchUnpublishedActorsSuccess(actor.result, actor.entities.actors, actorData.metaData))
    }
  } else {
    actor = normalize([{ slugName, error: true }], actorsListSchemaSlug)
    dispatch(fetchActorSlugFail(slugName, actor.result, actor.entities.actors))
  }
}

export const postActorToDB = actor => async dispatch => {
  dispatch(actorPostStart(actor))
  let result = await fromApi.postActor(actor)
  try {
    let res = await result
    res.slugName = res["slugName"]
    res = normalize([res], actorsListSchemaSlug)
    dispatch(postActorSuccess(res.result, res.entities.actors))
  } catch (err) {
    console.error("you got an error!!!", err)
    return null
  }
}

export const editActorBySlug = (slugName, actor) => async dispatch => {
  dispatch(editingActorStart(actor))
  try {
    const result = await fromApi.editActor(slugName, actor)
    dispatch(editingActorSuccess(result, slugName))
  } catch (err) {
    dispatch(fromFetch.editingFail())
  }
}

export const checkName = (name, type) => async dispatch => {
  dispatch(checkingNameActor(name))
  const actorData = await fromApi.checkName(name, type)
  let result = {}
  if (actorData.result) {
    result = actorData.result
  } else {
    result = actorData.error
  }
  dispatch(checkingNameSuccess(result))
}
