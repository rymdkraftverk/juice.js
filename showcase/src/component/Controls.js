import React from 'react'
import styled from 'styled-components/macro'
import _ from 'lodash/fp'
import Emojify from 'react-emojione'

import Color from '../constant/color'
import Size from '../constant/size'

const Container = styled.div`
  width: ${Size.LEFT_COLUMN_WIDTH}px;
  height: ${(props) => props.height}px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${Color.LIGHTER_GRAY};
  padding: 4px 16px;
`

const Name = styled.div`
  font-weight: bold;
  margin: 8px 0;
`

const Parameter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
  padding-left: 32px;
`

const ParameterName = styled.div`
  display: flex;
  align-items: center;
`

const Optional = styled.div`
  font-size: 10px;
  font-style: italic;
  margin-left: 8px;
  color: gray;
`

const Input = styled.input`
  width: 48px;
  font-size: 14px;
  font-weight: bold;
  padding: 8px;
  border: none;
  text-align: center;
`

const RefreshButton = styled.div`
  cursor: pointer;
`

const Controls = ({ controls, name, onChange, height, onRefreshClick }) => {
  return (
    <Container height={height}>
      <Header>
        <Name>{name}</Name>
        <Emojify>
          <RefreshButton
            onClick={() => onRefreshClick(name)}
          >{`:arrows_counterclockwise:`}</RefreshButton>
        </Emojify>
      </Header>
      {_.map.convert({ cap: false })((control, key) => {
        return (
          <Parameter key={key}>
            <ParameterName>
              {key}{' '}
              {control.optional ? <Optional>{` (optional)`}</Optional> : null}
            </ParameterName>

            <Input
              type="number"
              value={control.value}
              onChange={(event) =>
                onChange(name, key, parseInt(event.target.value))
              }
            />
          </Parameter>
        )
      })(controls)}
    </Container>
  )
}

export default Controls
