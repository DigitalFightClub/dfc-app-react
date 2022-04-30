import { FighterInfo, FighterStatistics } from '../../types';

const getFighterStatistics = (fighterData: FighterInfo | null): FighterStatistics => {
  return {
    wide: [
      ['Power', fighterData ? fighterData.stats.power : 0],
      ['Kickboxing', fighterData ? fighterData.stats.kickboxing : 0],
      ['Speed', fighterData ? fighterData.stats.speed : 0],
      ['BJJ', fighterData ? fighterData.stats.bjj : 0],
      ['Strength', fighterData ? fighterData.stats.strength : 0],
      ['Karate', fighterData ? fighterData.stats.karate : 0],
      ['Flexibility', fighterData ? fighterData.stats.flexibility : 0],
      ['Wrestling', fighterData ? fighterData.stats.wrestling : 0],
      ['Conditioning', fighterData ? fighterData.stats.conditioning : 0],
      ['Judo', fighterData ? fighterData.stats.judo : 0],
      ['Balance', fighterData ? fighterData.stats.balance : 0],
      ['Muay Thai', fighterData ? fighterData.stats.mauyThai : 0],
      ['Reflex', fighterData ? fighterData.stats.reflex : 0],
      ['Taekwondo', fighterData ? fighterData.stats.taekwondo : 0],
      ['Footwork', fighterData ? fighterData.stats.footwork : 0],
      ['Sambo', fighterData ? fighterData.stats.sambo : 0],
    ],
    slim: [
      ['Power', fighterData ? fighterData.stats.power : 0],
      ['Speed', fighterData ? fighterData.stats.speed : 0],
      ['Strength', fighterData ? fighterData.stats.strength : 0],
      ['Flexibility', fighterData ? fighterData.stats.flexibility : 0],
      ['Conditioning', fighterData ? fighterData.stats.conditioning : 0],
      ['Balance', fighterData ? fighterData.stats.balance : 0],
      ['Reflex', fighterData ? fighterData.stats.reflex : 0],
      ['Footwork', fighterData ? fighterData.stats.footwork : 0],
      ['Kickboxing', fighterData ? fighterData.stats.kickboxing : 0],
      ['BJJ', fighterData ? fighterData.stats.bjj : 0],
      ['Karate', fighterData ? fighterData.stats.karate : 0],
      ['Wrestling', fighterData ? fighterData.stats.wrestling : 0],
      ['Judo', fighterData ? fighterData.stats.judo : 0],
      ['Muay Thai', fighterData ? fighterData.stats.mauyThai : 0],
      ['Taekwondo', fighterData ? fighterData.stats.taekwondo : 0],
      ['Sambo', fighterData ? fighterData.stats.sambo : 0],
    ],
  };
};

export default getFighterStatistics;
