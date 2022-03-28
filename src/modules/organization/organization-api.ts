/* eslint-disable quotes */
import Web3Api from 'moralis/types/generated/web3Api';
import axios from 'axios';
import { transformFighterMetadata } from '../../utils/web3/moralis';
import { ChallengeState, FighterInfo, FighterNFT, FightingStyle, OrganizationInfo } from '../../types';
import { ENV_CONFG } from './../../config';

const ENV = ENV_CONFG();

class OrganizationApi {
  public constructor() {
    this.getFighterInfo = this.getFighterInfo.bind(this);
    this.challengeFighter = this.challengeFighter.bind(this);
    this.acceptChallenge = this.acceptChallenge.bind(this);
    this.getFightingStyles = this.getFightingStyles.bind(this);
    this.getOrgFighters = this.getOrgFighters.bind(this);
    this.fetchJsonMetaData = this.fetchJsonMetaData.bind(this);
    this.transformFighterMetadata = this.transformFighterMetadata.bind(this);
  }

  public async challengeFighter(
    fighterId: number,
    oppenentId: number,
    styleId: number,
    web3Api: Web3Api
  ): Promise<void> {
    console.log('OrganizationApi challengeFighter called');
  }

  public async acceptChallenge(
    fighterId: number,
    challengerId: number,
    styleId: number,
    web3Api: Web3Api
  ): Promise<void> {
    console.log('OrganizationApi acceptChallenge called');
  }

  public async getFightingStyles(): Promise<FightingStyle[]> {
    console.log('OrganizationApi getFightingStyles called');
    return [
      {
        styleId: 0,
        style: 'Choose Your Destiny',
        description:
          "You've got the option for powerful kicks or find the perfect defensive submission from the ground.",
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
          "You're twice as deadly when every limb is twice as dangerous. Overload on contact by using your knees and elbows.",
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
          "You've got hands like cinderblocks. They're heavy and they hurt. You put everything you have into your punches.",
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
        description: "You're bigger, you're stronger and you're going to slam your opponent senseless.",
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
        description: "Take the fight to the ground and stall for a decision. It's not glamorous but it works.",
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
          "You're a balanced fighter and can utilize different styles as needed. However, you're a master of none.",
      },
      {
        styleId: 15,
        style: 'Pull Guard',
        description:
          // eslint-disable-next-line max-len
          "Pull your opponents to the ground and land in the guard position. Fighting from your back is dangerous but you're a submission master. You can do it.",
      },
      {
        styleId: 16,
        style: 'RKO',
        description: "Utilize extravagant pin attempts. It's unorthodox but damn does it look good.",
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
          "You've got quick hands and quicker feet. Land as many punches as possible and move to the next position.",
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
          "Maintain a breakneck grappling pace that will exhaust your opponent. Let's hope you don't get tired first.",
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
    ];
  }

  public async getOrgInfo(orgId: number): Promise<OrganizationInfo> {
    console.log('OrganizationApi getOrgInfo called');
    return {
      orgIcon: '/assets/red-dragon-gym.svg',
      orgName: 'RED DRAGON',
      orgCategory: 'Middleweight Category',
    };
  }

  public async getOrgFighters(total: number, page: number, limit: number, address: string): Promise<FighterInfo[]> {
    // loop to create promises to fetch NFT metadata
    const promises = [];
    let currentNFT: number = limit * page + 1;
    for (let i = 0; i < limit && currentNFT <= total; i++, currentNFT++) {
      const metadata: Promise<any> = this.fetchJsonMetaData(`${ENV.FIGHTER_METADATA_URL}/${currentNFT}`);
      promises.push(metadata);
    }

    // wait for all requests to return and collect results
    const nfts: FighterNFT[] = await Promise.allSettled(promises).then((results: any[]) =>
      results.map((result: any) => result.value)
    );
    console.log('Org API Get Org Fighers results', JSON.stringify(nfts));

    // refine the fighter metadata
    const fighters: FighterInfo[] = nfts.map((nft) => {
      return transformFighterMetadata(nft, address);
    });
    console.log('Org API Get Org Fighers refined', JSON.stringify(fighters));

    return fighters;
  }

  public async getFighterInfo(fighterData: FighterInfo): Promise<FighterInfo> {
    return {
      ...fighterData,
      isOwned: false,
      challengeState: ChallengeState.AVAILABLE,
    };
  }

  private async transformFighterMetadata(fighterNFTs: FighterNFT[], address: string): Promise<FighterInfo> {
    return transformFighterMetadata(fighterNFTs, address);
  }

  private async fetchJsonMetaData(uri: string) {
    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const organizationApi = new OrganizationApi();
