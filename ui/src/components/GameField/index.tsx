import './style.css';

import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

interface IGameFieldProps {
  isFieldDisabled: boolean;
  fieldSize: number;
  clickedCells: number[];
  onCellClick: (index: number) => void;
}

export const GameField: React.FC<IGameFieldProps> = (props) => {
  const onCellClick = (index: number) => {
    if (props.isFieldDisabled) {
      return;
    }

    props.onCellClick(index);
  };

  const getCells = () => {
    const cells: JSX.Element[] = []

    for (let i = 0; i < props.fieldSize; i++) {
      const rowCells: JSX.Element[] = [];
      for (let j = 0; j < props.fieldSize; j++) {
        const index = i * props.fieldSize + j;
        rowCells.push((
          <Col
            className={'cell' + (props.clickedCells.indexOf(index) !== -1 ? ' clicked' : '')}
            key={j}
            onClick={() => onCellClick(index)}
          >
            <img
              src="https://pngimage.net/wp-content/uploads/2018/05/dick-png-16.png"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Col>
        ));
      }
      cells.push((
        <Row key={i}>
          {rowCells}
        </Row>
      ))
    }

    return cells;
  };

  return (
    <div id="field-container" className={props.isFieldDisabled ? 'disabled' : 'enabled'}>
      <Container>
        {getCells()}
      </Container>
    </div>
  )
};