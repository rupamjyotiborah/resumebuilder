import {ADD_PERSONAL, ADD_QUALIFICATION, ADD_SKILL, ADD_PROJECT, ADD_SOCIALMEDIA} from './action.types'

export const addPersonalData = (personal) => ({
    type: ADD_PERSONAL,
    payload: personal
})

export const addQualificationData = (qualification) => ({
    type: ADD_QUALIFICATION,
    payload: qualification
})

export const addSkillData = (skill) => ({
    type: ADD_SKILL,
    payload: skill
})

export const addProjectData = (project) => ({
    type: ADD_PROJECT,
    payload: project
})

export const addSocialMediaData = (socialmedia) => ({
    type: ADD_SOCIALMEDIA,
    payload: socialmedia
})