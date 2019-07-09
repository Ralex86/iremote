// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import leftArrowIcon from '../icons/left-arrow.svg';
import rightArrowIcon from '../icons/right-arrow.svg';

type Props = {
  requestIndex: (index: number) => void,
  currentIndex: number,
};

class Remote extends React.Component<Props> {
  render() {
    const { requestIndex, currentIndex } = this.props;

    return (
      <RootStyled>
        <LeftButton onClick={() => requestIndex(currentIndex - 1)} />
        <RightButton onClick={() => requestIndex(currentIndex + 1)} />
      </RootStyled>
    );
  }
}

const LeftButton = styled.div`
  width: 60px;
  height: 60px;
  background: url(${() => leftArrowIcon});
  background-color: white;
  border: 2px solid black;
  border-radius: 10%;
`;

const RightButton = styled.div`
  width: 60px;
  height: 60px;
  background: url(${() => rightArrowIcon});
  background-color: white;
  border: 2px solid black;
  border-radius: 10%;
`;

const RootStyled = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1, 1, auto;
  width: 100%;
`;

export default Remote;
