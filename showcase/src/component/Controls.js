import React from "react";
import styled from "styled-components";
import _ from "lodash/fp";

const Container = styled.div`
  margin: 0 12px;
  width: 200px;
  height: ${props => props.height}px;
`;

const Name = styled.div`
  font-weight: bold;
  margin: 8px 0;
`;

const Controls = ({ controls, name, onChange, height }) => {
  return (
    <Container height={height}>
      <Name>{name}</Name>
      {_.map.convert({ cap: false })((value, key) => {
        return (
          <div key={key}>
            {key}
            <input
              type="number"
              value={value}
              onChange={event =>
                onChange(name, key, parseInt(event.target.value))
              }
            />
          </div>
        );
      })(controls)}
    </Container>
  );
};

export default Controls;
