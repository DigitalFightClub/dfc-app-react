export type FighterInfo = {
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
