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

const Refresh = styled.div`
  border: 1px solid white;
  border-radius: 4px;
  padding: 5px 0 10px;
  width: 140px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
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
  padding: 5px 20px;
  cursor: pointer;
  user-select: none;
  font-size: 20px;
  background-color: ${({ selected }) =>
    selected ? Color.BLUE : 'transparent'};

  /* TODO: Hover effect */
  /* TODO: Click effect */
`

let time = 0

const START_X = 0

let sprite

const reset = () => {
  sprite.x = START_X
  time = 0
}

// TODO: Display code for easy copy

function App() {
  const [juicer, setJuicer] = useState(null)
  // TODO: Start with sine
  const [selectedFeature, setSelectedFeature] = useState('sine')
  const [configuration, setConfiguration] = useState({})
  const updateFn = useRef()

  useEffect(() => {
    updateFn.current = () => {
      if (juicer) {
        sprite.x = juicer.getValue(time)

        time += 1
      }
    }
  }, [juicer])

  useEffect(() => {
    const app = new PIXI.Application({
      backgroundColor: 0xcccccc,
      width: 800,
      height: 300,
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
    setJuicer({ getValue })
  }, [selectedFeature])

  console.log('rerender')

  return (
    <Container>
      <Header>
        <Logo>
          <Title>🍹 juice.js</Title>
        </Logo>
        {/* TODO: Make padding clickable. Hover effect? Open in new tab. */}
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
          {juicer ? (
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
                        setJuicer({ getValue })
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
        <div>
          <Refresh
            onClick={() => {
              reset()
            }}
          >
            Refresh
          </Refresh>
          <Canvas id="canvas"></Canvas>
        </div>
      </Main>
    </Container>
  )
}

export default App
