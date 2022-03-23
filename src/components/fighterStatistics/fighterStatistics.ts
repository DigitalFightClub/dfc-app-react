import { FighterInfo, FighterStatistics } from '../../types';

const getFighterStatistics = (fighterData: FighterInfo): FighterStatistics => [
  ['Power', fighterData.stats.power],
  ['Kickboxing', fighterData.stats.kickboxing],
  ['Speed', fighterData.stats.speed],
  ['BJJ', fighterData.stats.bjj],
  ['Strength', fighterData.stats.strength],
  ['Karate', fighterData.stats.karate],
  ['Flexibility', fighterData.stats.flexibility],
  ['Wrestling', fighterData.stats.wrestling],
  ['Conditioning', fighterData.stats.conditioning],
  ['Judo', fighterData.stats.judo],
  ['Balance', fighterData.stats.balance],
  ['Muay Thai', fighterData.stats.mauyThai],
  ['Reflex', fighterData.stats.reflex],
  ['Taekwondo', fighterData.stats.taekwondo],
  ['Footwork', fighterData.stats.footwork],
  ['Sambo', fighterData.stats.sambo],
];

export default getFighterStatistics;
