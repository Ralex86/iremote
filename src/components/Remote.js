// @flow
import * as React from 'react';
import styled from '@emotion/styled';

type Props = {
  requestIndex: (index: number) => void,
  currentIndex: number,
};

class Remote extends React.Component<Props> {
  render() {
    const {requestIndex, currentIndex} = this.props;

    return (
      <RootStyled>
        <LeftButton onClick={() => requestIndex(currentIndex - 1)}></LeftButton>
        <RightButton
          onClick={() => requestIndex(currentIndex + 1)}></RightButton>
      </RootStyled>
    );
  }
}

const LeftButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: green;
`;

const RightButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: yellow;
`;

const RootStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
`;

export default Remote;
