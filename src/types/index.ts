import { Action } from 'redux';

export type BaseMoralisNFT = {
  token_address: string;
  token_id: string;
  contract_type: string;
  token_uri: string;
  metadata: FighterNFT;
  synced_at: string;
  amount: string;
  name: string;
  symbol: string;
};

export type MoralisNFT = BaseMoralisNFT & {
  block_number_minted: string;
  owner_of: string;
  block_number: string;
  is_valid: number;
  syncing: number;
  frozen: number;
};

export type FighterNFT = {
  name: string;
  image: string;
  attributes: Array<any>;
};

export type AccountNFTResult = {
  total: number;
  page: number;
  page_size: number;
  cursor: string;
  result: MoralisNFT[];
  status: string;
};

export type TokenNFTResult = {
  total: number;
  result: FighterInfo[];
};

export type FighterInfo = {
  fighterId: number;
  name: string;
  country: string;
  countryCode: string;
  // wins: string;
  // loses: string;
  height: string;
  weight: string;
  gender: string;
  recruited: string;
  status: string;
  image: string;
  stats: Record<string, number>;
  isOwned: boolean; // indicates is owned by current wallet
  // challengeState: ChallengeState;
};

export type Challenge = {
  nftId: number;
  opponentId: number;
  timestamp: number;
};

export enum ChallengeState {
  AVAILABLE = 'Available',
  CHALLENGED = 'Challenged',
  CHALLENGING = 'Challenging',
  COOLDOWN = 'Cooldown',
  UNAVAILABLE = 'Unavailable',
}

export enum FighterModalState {
  DETAILS,
  CHALLENGE,
  RESULTS,
}

export type FighterModalProps = {
  onClose: () => void;
  fighterData: FighterInfo;
};

export type FighterModalProps2 = {
  fighterData: FighterInfo;
  isHorizontal: boolean;
};

export type FighterStats = {
  fighterStatistics: Stats[];
};

export type FighterStatistics = {
  wide: Stats[];
  slim: Stats[];
};

export type FighterType = {
  fighterData: FighterInfo;
  fighterType: string;
};

export type FightingStyle = {
  styleId: number;
  style: string;
  description: string;
};

export enum FighterStatus {
  ACTIVE = 'Active',
  RETIRED = 'Retired',
}

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
  WIN = 'Win',
  LOSS = 'Loss',
}

export type FightHistoryBrief = {
  matchId: string;
  challengerId: number;
  challengerName: string;
  challengerImage: string;
  challengerCountryCode?: string;
  challengerStyle: string;
  opponentId: number;
  opponentName: string;
  opponentImage: string;
  opponentCountryCode?: string;
  opponentStyle: string;
  fightResults: FightResults;
  winnerId: number;
  matchResult: MatchResult;
  timestamp: number;
};

export type FightResults = {
  winner: string;
  winner_style: string;
  unanimous: boolean;
  outcome: string;
  rounds: Round[];
};

export type Round = {
  roundNumber: number;
  afterStoppage: boolean;
  challengerScore: number;
  opponentScore: number;
  roundWinner: string;
  stoppage: boolean;
};

export type FightRecord = {
  wins: number;
  losses: number;
};

export type FightRecordResponse = {
  record: FightRecord;
};

export type OrganizationInfo = {
  orgIcon: string;
  orgName: string;
  orgCategory: string;
};

export type OrganizationState = {
  selectedFighter: FighterInfo | null;
  selectedOrg: OrganizationInfo | null;
  loadingOrg: boolean;
  orgFighters: FighterInfo[] | null;
  challengeMsg?: string;
  challengeInProgress: boolean;
  errorMsg?: string;
  fightingStyles: FightingStyle[];
};

export type FighterResultModalState = {
  matchId: string | null;
  fighterId: number;
  opponentId: number;
};

export type ChallengeAPIResponse = {
  message: string;
  uuid: string | null;
};

export type ChallengeFighterResponse = {
  status: number;
  message: string;
  matchId: string | null;
};

export type FighterHistoryState = {
  selectedFightResult: FighterResultModalState | null;
  fighterModalState: FighterModalState;
};

// Global app state aggregated from the Redux reducers
export interface AppState {
  fightHistoryState: FighterHistoryState;
  organizationState: OrganizationState;
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
