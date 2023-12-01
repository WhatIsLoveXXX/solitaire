'use client';

import Image from 'next/image';
import styles from './Header.module.css';
import TurnOne from '@/icons/TurnOne';
import TurnThree from '@/icons/TurnThree';
import NewButton from '../Buttons/NewButton';
import GamePlayInfo from '../GamePlayInfo/GamePlayInfo';
import RestartButton from '../Buttons/RestartButton';
import UndoButton from '../Buttons/UndoButton';
import PauseButton from '../Buttons/PauseButton';
import HintButton from '../Buttons/HintButton';
import { useSelector } from 'react-redux';
import { RootReducerState } from '@/global';
import { GameModeTypes } from '@/redux/gameConfig/gameConfig.types';
import { useRouter } from 'next/navigation';
import useTimer from '@/hooks/useTimer';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const { gameMode, gameMoves } = useSelector(
    ({ GameConfig, GameBoard }: RootReducerState) => ({
      gameMode: GameConfig.gameMode as GameModeTypes,
      gameMoves: GameBoard.gameMoves,
    })
  );

  const { seconds, minutes, hours } = useTimer();

  const showUnsavedWarning = () => {
    return confirm('You have unsaved changes');
  };

  const navigateToOtherGameMode = (gameMode: GameModeTypes) => {
    if (gameMode === 'turnThree') {
      router.push('/turn-3');
      return;
    }
    router.push('/');
  };

  const onChangeGameMode = (newMode: GameModeTypes) => {
    if (newMode === gameMode) {
      return;
    }
    if (!gameMoves) {
      navigateToOtherGameMode(newMode);
      return;
    }
    if (showUnsavedWarning()) {
      navigateToOtherGameMode(newMode);
    }
  };

  const getCardModeColor = (btnMode: GameModeTypes) => {
    if (gameMode === btnMode) {
      return '#9B69C9';
    }
    return '#6E4197';
  };

  return (
    <header className={styles.header}>
      <div className={styles.innerWrapper}>
        <div className={styles.logoDesctopWrapper}>
          <Link href='/'>
            <Image
              src='/images/logo.png'
              width={120}
              height={31}
              alt='logo'
              style={{ marginRight: '54px' }}
              className={styles.logo}
            />
          </Link>
        </div>
        <div className={styles.logoMobileWrapper}>
          <Link href='/'>
            <Image
              src='/images/logo.png'
              width={100}
              height={30}
              alt='logo'
              style={{ marginRight: '11px' }}
              className={styles.logo}
            />
          </Link>
        </div>
        <div className={styles.cards}>
          <TurnOne
            onClick={() => onChangeGameMode('default')}
            fill={getCardModeColor('default')}
          />
          <div className={styles.border} />
          <TurnThree
            onClick={() => onChangeGameMode('turnThree')}
            fill={getCardModeColor('turnThree')}
          />
        </div>
        <div className={styles.newButtonWrapper}>
          <NewButton />
        </div>
        <div className={styles.desktopInfoButton}>
          <GamePlayInfo seconds={seconds} hours={hours} minutes={minutes} />
          <RestartButton />
          <div
            style={{ margin: '0 10px', height: '28.4px' }}
            className={styles.border}
          />
          <UndoButton />
          <div
            style={{ margin: '0 10px', height: '28.4px' }}
            className={styles.border}
          />
          <PauseButton />
          <div
            style={{ margin: '0 10px', height: '28.4px' }}
            className={styles.border}
          />
          <HintButton />
        </div>
      </div>
      <div className={styles.borderBottom} />
      <div className={styles.mobileInfoButton}>
        <GamePlayInfo seconds={seconds} hours={hours} minutes={minutes} />
        <RestartButton />
        <div
          style={{ margin: '0 10px', height: '28.4px' }}
          className={styles.border}
        />
        <UndoButton />
        <div
          style={{ margin: '0 10px', height: '28.4px' }}
          className={styles.border}
        />
        <PauseButton />
        <div
          style={{ margin: '0 10px', height: '28.4px' }}
          className={styles.border}
        />
        <HintButton />
      </div>
    </header>
  );
};

export default Header;
