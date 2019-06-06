import React from "react";
import styled from "styled-components";
import _ from "lodash/fp";
import Emojify from "react-emojione";

const Container = styled.div`
  margin: 32px 32px;
  width: 150px;
  height: ${props => props.height}px;
`;

const Name = styled.div`
  font-weight: bold;
  margin: 8px 0;
`;

const Parameters = styled.div`
  border: 3px solid lightgray;
`;

const Parameter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;

const Input = styled.input`
  width: 48px;
  font-size: 12px;
  padding: 4px;
  border: 2px solid lightgray;
  border-radius: 4px;
  text-align: right;
`;

const RefreshButton = styled.div`
  cursor: pointer;
`;

const Controls = ({
  controls,
  name,
  onChange,
  height,
  onRefreshClick,
  isRefreshable
}) => {
  return (
    <Container height={height}>
      <Name>{name}</Name>
      <Emojify>
        {isRefreshable && (
          <RefreshButton
            onClick={() => onRefreshClick(name)}
          >{`:arrows_counterclockwise:`}</RefreshButton>
        )}
      </Emojify>
      {_.map.convert({ cap: false })((value, key) => {
        return (
          <Parameter key={key}>
            {key}
            <Input
              type="number"
              value={value}
              onChange={event =>
                onChange(name, key, parseInt(event.target.value))
              }
            />
          </Parameter>
        );
      })(controls)}
    </Container>
  );
};

export default Controls;