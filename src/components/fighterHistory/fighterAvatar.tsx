import { Circle } from '@chakra-ui/react';
import { WinBadgeIcon } from '../dfcIcons/WinBadgeIcon';
import { LossBadgeIcon } from '../dfcIcons/LossBadgeIcon';

export type FighterAvatarProps = {
  fighterImage: string;
  isWinner: boolean;
  isChallenger: boolean;
  hideResult?: boolean;
  color?: string;
};

export default function FighterAvatar({
  fighterImage,
  isWinner,
  isChallenger,
  hideResult = false,
  color = '#50545C',
}: FighterAvatarProps) {
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          width: '54px',
          height: '54px',
          overflow: 'hidden',
          borderRadius: '50%',
          borderColor: hideResult ? color : isWinner ? '#2ABB75' : '#DF2151',
          borderWidth: '3px',
        }}
      >
        <div
          style={{
            backgroundImage: `url(
            ${fighterImage}
          )`,
            width: '115px',
            height: '115px',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            margin: '-4px 0px 0px -34px',
          }}
        ></div>
      </div>
      {!hideResult ? (
        <Circle
          position="absolute"
          top="37px"
          right={isChallenger ? '1px' : '37px'}
          size="15px"
          zIndex="200"
          bg="white"
        >
          {isWinner ? <WinBadgeIcon w="18px" h="18px" /> : <LossBadgeIcon w="18px" h="18px" />}
        </Circle>
      ) : null}
    </div>
  );
}
