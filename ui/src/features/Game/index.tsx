import React, { Fragment } from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { GameField } from '../../components/GameField';
import { sendTurnAction, turnDoneAction, repeatGameAction, leaveFromRoomAction } from './actions';
import { Modal, Button } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { Logo } from '../../components/Logo';

export const Game: React.FC = () => {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const onTurn = (index: number) => {
    dispatch(sendTurnAction(index));
    dispatch(turnDoneAction(index));
  };

  const onGameFinish = () => {
    dispatch(leaveFromRoomAction());
    dispatch(push('/'));
  };

  const onWantRepeat = () => {
    dispatch(repeatGameAction());
  };

  const gameFinishedModal = () => {
    return (
      <Modal
        show={gameState.isGameFinished}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onGameFinish}
      >
        <Modal.Body className="my-3">
          <div className="mb-3">
            <h6 className="d-inline text-secondary">Game ended, winner: </h6>
            <h5 className="d-inline text-primary font-weight-bold">{gameState.winner}</h5>
          </div>
          <Button className="w-100 mb-2" variant="success" onClick={onWantRepeat}>Want more</Button>
          <Button className="w-100" variant="outline-danger" onClick={onGameFinish}>Exit</Button>
        </Modal.Body>
      </Modal>
    );
  };

  const enemyDisconnectedModal = () => {
    return (
      <Modal
        show
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onGameFinish}
      >
        <Modal.Body className="my-3">
          <h6 className="mb-3">Game ended, because your opponent disconnected</h6>
          <Button className="w-100" variant="outline-danger" onClick={onGameFinish}>Exit</Button>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Fragment>
      <div className="mb-5 text-center">
        <Logo />
        <h5 className="d-inline text-secondary">Room identifier: </h5>
        <h4 className="d-inline text-primary font-weight-bold">{gameState.roomId}</h4>
        {gameState.isWaitingEnemy && (
          <h6 className="text-center text-primary font-weight-bold">Waiting your opponent...</h6>
        )}
      </div>
      <GameField
        clickedCells={gameState.clickedCells}
        isFieldDisabled={!gameState.isTurnTime}
        fieldSize={gameState.fieldSize}
        onCellClick={onTurn}
      />
      {gameState.isGameFinished && gameFinishedModal()}
      {gameState.isEnemyDisconnected && enemyDisconnectedModal()}
    </Fragment>
  )
};