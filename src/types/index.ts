import { Action } from 'redux';

export type FighterNFT = {
  name: string;
  image: string;
  attributes: [];
};

export type FighterInfo = {
  fighterId: number;
  name: string;
  country: string;
  wins: string;
  loses: string;
  height: string;
  weight: string;
  gender: string;
  recruited: string;
  status: string;
  image: string;
  stats: Record<string, number>;
  isChallenged: boolean;
  isOwned: boolean; // indicates is owned by current wallet
};

export type FighterModalProps = {
  fighterType: string;
  onClose: () => void;
  fighterData: FighterInfo;
};

export type FighterModalProps2 = {
  fighterType: string;
  fighterData: FighterInfo;
  isHorizontal: boolean;
};

export type FighterStats = {
  fighterStatistics: Stats[];
};

export type FighterStatistics = Stats[];

export type FighterType = {
  fighterData: FighterInfo;
  fighterType: string;
};

export type GymTileData = {
  datanumber: string | number;
  dataname: string;
};

export type NftUris = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refinedFightersMeta: any;
};

export type Stats = [string, number];

export enum MatchResult {
  WIN,
  LOSS,
}

export type HistoricMatch = {
  challengerName: string;
  challengerResult: MatchResult;
  opponentName: string;
  opponentResult: MatchResult;
  matchDetails: string;
};

export type GymState = {
  gymFighters: FighterInfo[];
  fighterHistory: HistoricMatch[];
  loadingGymFighters: boolean;
  getGymFightersError: string | null;
  loadingFighterHistory: boolean;
  getFighterHistoryError: string | null;
  tkoTotal: string;
  loadingTotalTko: boolean;
  getTotalTkoError: string | null;
};

// Global app state aggregated from the Redux reducers
export interface AppState {
  gymState: GymState;
}

// Generic Action type to be dispatched and used in Redux Saga
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ActionPayload<T = any, M = string> {
  data?: T;
  msg?: M;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AppAction<T = string, P = any> extends Action {
  type: T;
  payload: ActionPayload<P>;
}
