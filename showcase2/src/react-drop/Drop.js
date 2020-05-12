import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  /* TODO: Should not be added here */
  margin: 5px;
`

const Header = styled.div`
  border: 1px solid blanchedalmond;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;
  user-select: none;
`

const Options = styled.div`
  visibility: ${({ isExpanded }) => (isExpanded ? 'visible' : 'hidden')};
`

const Option = styled.div`
  padding: 5px;
  cursor: pointer;
  user-select: none;
  /* TODO: Hover effect */
  /* TODO: Click effect */
`

const Drop = ({ options, header, onClick }) => {
  const [isExpanded, setExpanded] = useState(false)
  return (
    <Container>
      <Header
        onClick={() => {
          setExpanded(!isExpanded)
        }}
      >
        {header}
      </Header>
      <Options isExpanded={isExpanded}>
        {options.map(({ label, value }) => {
          return <Option key={value} onClick={() => {
            onClick(value)
          }}>{label}</Option>
        })}
      </Options>
    </Container>
  )
}

Drop.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  header: PropTypes.string.isRequired,
}

export default Drop
