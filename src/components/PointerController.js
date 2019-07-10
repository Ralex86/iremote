// @flow
import * as React from 'react';
import styled from '@emotion/styled';

type Props = {
  displayPointer: (display: boolean) => void,
};

class PointerController extends React.Component<Props> {
  render() {
    const { displayPointer } = this.props;

    return (
      <RootStyled>
        <Button
          onTouchStart={() => displayPointer(true)}
          onTouchEnd={() => displayPointer(false)}
        ></Button>
      </RootStyled>
    );
  }
}

const Button = styled.div`
  width: 80px;
  height: 80px;
  background-color: red;
  border-radius: 50%;
  border: 2px solid black;
`;

const RootStyled = styled.div`
  display: flex;
  justify-content: center;
  flex: 0, 1, auto;
  width: 100%;
`;

export default PointerController;
