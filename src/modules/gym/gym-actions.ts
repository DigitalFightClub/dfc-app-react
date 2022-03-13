import { ActionPayload, AppAction } from '../../types';

/**
 * Define a generic action function which will construct a Redux Action
 * with the given type from constants and payload
 * 
 * @param type Action type defined in /utils/Constants
 * @param payload data to update state
 */
export function gymAction<T, P>(type: T, payload: ActionPayload<P>): AppAction<T, P> {
  return {
    type,
    payload,
  };
}

export type GymAction = typeof gymAction;
