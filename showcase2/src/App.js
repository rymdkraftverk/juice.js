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
  width: ${Size.LEFT_COLUMN_WIDTH}px;
`

const Link = styled.a`
  margin-left: 64px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
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

const ParameterTitle = styled.div`
  border: 1px solid blanchedalmond;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;
  user-select: none;
`

const Options = styled.div``

const Option = styled.div`
  padding: 5px;
  cursor: pointer;
  user-select: none;
  background-color: ${({ selected }) =>
    selected ? Color.BLUE : 'transparent'};
  /* TODO: Hover effect */
  /* TODO: Click effect */
`

let time = 0

// TODO (parameters):
// x, y, scale
// Pig start in the middle?

const START_X = 0

let sprite

const reset = () => {
  sprite.x = START_X
  time = 0
}

function App() {
  const [juicers, setJuicers] = useState([])
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [configuration, setConfiguration] = useState({})
  const updateFn = useRef()

  useEffect(() => {
    updateFn.current = () => {
      juicers.forEach((juicer) => {
        sprite.x = juicer.getValue(time)
      })

      time += 1
    }
  }, [juicers])

  useEffect(() => {
    const app = new PIXI.Application({
      backgroundColor: 0xcccccc,
      width: 800,
      height: 600,
    })
    document.getElementById('canvas').appendChild(app.view)
    sprite = PIXI.Sprite.from('asset/pig.png')
    app.stage.addChild(sprite)

    app.ticker.add(() => {
      updateFn.current()
    })
  }, [])

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
          <div
            onClick={() => {
              reset()
            }}
          >
            Refresh
          </div>
          <ParameterTitle>Select feature</ParameterTitle>
          <Options>
            {features.map(({ name }) => {
              return (
                <Option
                  onClick={() => {
                    const feature = features.find(
                      (feature) => feature.name === name,
                    )
                    const getValue = juice[name](
                      _.mapValues('value')(feature.parameters),
                    )
                    reset()
                    setJuicers([{ getValue }])
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
          {juicers.length > 0 ? (
            <>
              {_.map.convert({ cap: false })(({ value, optional }, key) => {
                return (
                  <React.Fragment key={key}>
                    <p>
                      {key} {optional ? '(optional)' : ''}
                    </p>
                    <input
                      placeholder={value}
                      onChange={({ target: { value: newValue } }) => {
                        const feature = features.find(
                          (feature) => feature.name === selectedFeature,
                        )

                        const configuration = _.mapValues.convert({
                          cap: false,
                        })((parameterValue, parameterKey) => {
                          if (parameterKey === key) {
                            if (!newValue) {
                              return value
                            }
                            return newValue
                          }
                          return parameterValue.value
                        })(feature.parameters)

                        const getValue = juice[selectedFeature](configuration)
                        reset()
                        setJuicers([{ getValue }])
                      }}
                    />
                  </React.Fragment>
                )
              })(
                features.find((feature) => feature.name === selectedFeature)
                  .parameters,
              )}
            </>
          ) : null}
        </ControlPanel>
        <Canvas id="canvas"></Canvas>
      </Main>
    </Container>
  )
}

export default App
