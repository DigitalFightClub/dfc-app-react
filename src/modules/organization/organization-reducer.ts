/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppAction, OrganizationState } from '../../types';
import { Reducer } from 'redux';
import {
  CLEAR_CHALLENGE_MSG,
  CLEAR_ERROR_MSG,
  SET_CHALLENGE_FAILED,
  SET_CHALLENGE_IN_PROGRESS,
  SET_CHALLENGE_SUCCESS,
  SET_SELECTED_FIGHTER,
} from '../../config/events';
import { StatHelpText } from '@chakra-ui/react';

export const initOrganizationState: OrganizationState = {
  selectedFighter: null,
  selectedOrg: null,
  loadingOrg: false,
  orgFighters: [],
  challengeMsg: undefined,
  challengeInProgress: false,
  errorMsg: undefined,
  fightingStyles: [
    {
      styleId: 0,
      style: 'Choose Your Destiny',
      // eslint-disable-next-line max-len
      description: 'You\'ve got the option for powerful kicks or find the perfect defensive submission from the ground.',
    },
    {
      styleId: 1,
      style: 'Chop Down',
      description: 'Use your legs to repeatedly hammer your opponent to slow their movements and control the fight.',
    },
    {
      styleId: 2,
      style: 'Contact Overload',
      description:
        // eslint-disable-next-line max-len
        'You\'re twice as deadly when every limb is twice as dangerous. Overload on contact by using your knees and elbows.',
    },
    {
      styleId: 3,
      style: 'Counter Strike',
      description:
        'Remain patient and wait for your opponent to strike only to counter with a ferocious riposte of your own.',
    },
    {
      styleId: 4,
      style: 'Dirty Boxing',
      description: 'Waylay your opponent with short punches inside the clinch.',
    },
    {
      styleId: 5,
      style: 'Fists of Fury',
      description:
        // eslint-disable-next-line max-len
        'You\'ve got hands like cinderblocks. They\'re heavy and they hurt. You put everything you have into your punches.',
    },
    {
      styleId: 6,
      style: 'Fucking Chuck Norris',
      description: 'End the fight instantly with the perfect high kick.',
    },
    {
      styleId: 7,
      style: 'Go Low',
      description: 'Knock the tree down by aggressively attacking the hips, knees & ankles.',
    },
    {
      styleId: 8,
      style: 'Go On & Slam',
      description: 'You\'re bigger, you\'re stronger and you\'re going to slam your opponent senseless.',
    },
    {
      styleId: 9,
      style: 'Ground & Pound',
      description: 'Bring your opponent to the mat, keep them there, and unleash a vicious assault of fists.',
    },
    {
      styleId: 10,
      style: 'Judo Throw',
      description: 'Throw your opponent from the clinch and find the perfect pin.',
    },
    {
      styleId: 11,
      style: 'Lay & Pray',
      description: 'Take the fight to the ground and stall for a decision. It\'s not glamorous but it works.',
    },
    {
      styleId: 12,
      style: 'Locks, Chokes & Holds',
      description: 'Power your opponent into crippling submission holds. Target the opponents arms, neck & joints.',
    },
    {
      styleId: 13,
      style: 'Lutra Livre',
      description: 'Fight freely and use aggressive grappling techniques to choke your opponent into submitting.',
    },
    {
      styleId: 14,
      style: 'MMA Specialist',
      description:
        'You\'re a balanced fighter and can utilize different styles as needed. However, you\'re a master of none.',
    },
    {
      styleId: 15,
      style: 'Pull Guard',
      description:
        // eslint-disable-next-line max-len
        'Pull your opponents to the ground and land in the guard position. Fighting from your back is dangerous but you\'re a submission master. You can do it.',
    },
    {
      styleId: 16,
      style: 'RKO',
      description: 'Utilize extravagant pin attempts. It\'s unorthodox but damn does it look good.',
    },
    {
      styleId: 17,
      style: 'Sprawl & Brawl',
      description:
        // eslint-disable-next-line max-len
        'Dodge your opponents takedown and get the upper hand. Finish them off with standing strikes. Is that Chuck Liddell?',
    },
    {
      styleId: 18,
      style: 'Stick & Move',
      description:
        'You\'ve got quick hands and quicker feet. Land as many punches as possible and move to the next position.',
    },
    {
      styleId: 19,
      style: 'Swagger Strike',
      description: 'Use your cocky swagger to bait your opponent into an attack. Strike hard and fast when they do.',
    },
    {
      styleId: 20,
      style: 'Sweep the Leg',
      description: 'Sweep your opponents legs and then go for the pin.',
    },
    {
      styleId: 21,
      style: 'Tasmanian Whirlwind',
      description:
        'Maintain a breakneck grappling pace that will exhaust your opponent. Let\'s hope you don\'t get tired first.',
    },
    {
      styleId: 22,
      style: 'Top Game Tapout',
      description:
        // eslint-disable-next-line max-len
        'Go for the tap out. Take your opponent to the ground where your transition and submission skills are devastating.',
    },
    {
      styleId: 23,
      style: 'Twinkle Toes',
      description: 'Your feet are a blur. Utilize your speed and balance to deliver devastating quick kicks.',
    },
  ],
};

/**
 * Reducer Handlers
 */
function setSelectedFighter(state: OrganizationState, action: AppAction): OrganizationState {
  const { data } = action.payload;

  return {
    ...state,
    selectedFighter: { ...data.fighterData },
  };
}

function setLoadingOrg(state: OrganizationState, action: AppAction): OrganizationState {
  return {
    ...state,
    loadingOrg: true,
  };
}

function setOrgInfoSuccess(state: OrganizationState, action: AppAction): OrganizationState {
  const { data } = action.payload;

  return {
    ...state,
    selectedOrg: { ...data },
    loadingOrg: false,
  };
}

function getOrgFightersSuccess(state: OrganizationState, action: AppAction): OrganizationState {
  const { data } = action.payload;

  return {
    ...state,
    orgFighters: [...data],
  };
}

function clearChallengeMsg(state: OrganizationState, action: AppAction): OrganizationState {
  return {
    ...state,
    challengeMsg: undefined,
    challengeInProgress: false,
  };
}

function clearErrorMsg(state: OrganizationState, action: AppAction): OrganizationState {
  return {
    ...state,
    errorMsg: undefined,
    challengeInProgress: false,
  };
}

function setChallengeInProgress(state: OrganizationState, action: AppAction): OrganizationState {
  return {
    ...state,
    challengeInProgress: true,
  };
}

function setChallengeSuccess(state: OrganizationState, action: AppAction): OrganizationState {
  const { msg } = action.payload;

  return {
    ...state,
    challengeMsg: msg,
  };
}

function setChallengeFailed(state: OrganizationState, action: AppAction): OrganizationState {
  const { msg } = action.payload;
  console.log('set challenge failed message reducer', msg);

  return {
    ...state,
    errorMsg: msg,
  };
}

export const organizationReducer: Reducer<OrganizationState, AppAction> = (
  state: OrganizationState = initOrganizationState,
  action: AppAction
): OrganizationState => {
  switch (action.type) {
    case SET_SELECTED_FIGHTER:
      return setSelectedFighter(state, action);
    case SET_CHALLENGE_SUCCESS:
      return setChallengeSuccess(state, action);
    case SET_CHALLENGE_FAILED:
      return setChallengeFailed(state, action);
    case SET_CHALLENGE_IN_PROGRESS:
      return setChallengeInProgress(state, action);
    case CLEAR_CHALLENGE_MSG:
      return clearChallengeMsg(state, action);
    case CLEAR_ERROR_MSG:
      return clearErrorMsg(state, action);
    default:
      return { ...state };
  }
};
