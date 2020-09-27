import React, { useEffect, useState, useRef } from 'react'
import * as juice from 'juice.js'
import _ from 'lodash/fp'
import * as PIXI from 'pixi.js'
import styled from 'styled-components'

import Size from './constant/size'
import Color from './constant/color'
import features from './constant/features'

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`

const DOCS_URL = 'https://rymdkraftverk.github.io/juice.js'
const GITHUB_URL = 'https://github.com/rymdkraftverk/juice.js'

const Canvas = styled.div``

const Container = styled.div``

const ControlPanel = styled.div`
  margin-top: 50px;
  width: ${Size.LEFT_COLUMN_WIDTH}px;
`

const Link = styled.a.attrs(() => ({
  target: '_blank',
}))`
  margin-left: 64px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`

const TopPanel = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${Size.LEFT_COLUMN_WIDTH}px;
  background-color: ${Color.BLUE};
  font-weight: bold;
  height: 100%;
`

const Header = styled.div`
  height: 60px;
  background-color: ${Color.LIGHTER_GRAY};
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const Main = styled.div`
  display: flex;
`

const Refresh = styled.div`
  border: 1px solid white;
  border-radius: 4px;
  width: 140px;
  text-align: center;
  margin-bottom: 10px;
  margin-right: 20px;
  cursor: pointer;
`

const ParameterTitle = styled.div`
  border: 1px solid blanchedalmond;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
`

const Options = styled.div``

const Option = styled.div`
  cursor: pointer;
  user-select: none;
  font-size: 20px;
  background-color: ${({ selected }) =>
    selected ? Color.BLUE : 'transparent'};
`

let time = 0

// * Render outside until it's animated
const START_X = -999

let sprite

const reset = () => {
  sprite.x = START_X
  time = 0
}
function App() {
  const [juicer, setJuicer] = useState(null)
  const [x, setX] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState('sine')
  const updateFn = useRef()

  useEffect(() => {
    // @ts-ignore
    updateFn.current = () => {
      if (juicer && (juicer.loop || juicer.duration >= time)) {
        setX(juicer?.getValue(time))
        time += 1
      }
    }
  }, [juicer])

  useEffect(() => {
    if (sprite) {
      sprite.x = x
    }
  }, [x])

  useEffect(() => {
    const app = new PIXI.Application({
      backgroundColor: 0x0b4d6c,
      width: 800,
      height: 200,
    })
    document.getElementById('canvas').appendChild(app.view)
    sprite = PIXI.Sprite.from('asset/pig.png')
    sprite.position.set(50, 50)
    app.stage.addChild(sprite)

    app.ticker.add(() => {
      updateFn.current()
    })
  }, [])

  useEffect(() => {
    const feature = features.find((feature) => feature.name === selectedFeature)
    const getValue = juice[selectedFeature](
      _.mapValues('value')(feature.parameters),
    )
    reset()
    setJuicer({
      getValue,
      duration: feature.parameters.duration.value,
      loop: feature.loop,
    })
  }, [selectedFeature])

  return (
    <Container>
      <Header>
        <Logo>
          <Title>🍹 juice.js</Title>
        </Logo>
        <Link href={DOCS_URL}>DOCS</Link>
        <Link href={GITHUB_URL}>GITHUB</Link>
      </Header>
      <Main>
        <ControlPanel>
          <ParameterTitle>Select feature</ParameterTitle>
          <Options>
            {features.map(({ name }) => {
              return (
                <Option
                  onClick={() => {
                    setSelectedFeature(name)
                  }}
                  key={name}
                  selected={selectedFeature === name}
                >
                  {name}
                </Option>
              )
            })}
          </Options>
        </ControlPanel>
        <div>
          <TopPanel>
            <Refresh
              onClick={() => {
                reset()
              }}
            >
              Refresh
            </Refresh>
            <div>x (rounded): {Math.round(x)}</div>
          </TopPanel>
          <Canvas id="canvas"></Canvas>
        </div>
      </Main>
    </Container>
  )
}

export default App
