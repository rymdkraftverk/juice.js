import React, { useEffect, useState } from 'react'
// import * as juice from 'juice.js'
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

const Container = styled.div`
  display: flex;
`

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

function App() {
  // const [x, setX] = useState([])

  useEffect(() => {
    const app = new PIXI.Application({
      backgroundColor: 0xcccccc,
      width: 800,
      height: 600,
    })
    document.getElementById('canvas').appendChild(app.view)
    const sprite = PIXI.Sprite.from('asset/pig.png')
    app.stage.addChild(sprite)
    app.ticker.add(() => {
      // sprite.x += 1
    })
  }, [])
  return (
    <div>
      <Header>
        <Logo>
          <Title>juice.js</Title>
        </Logo>
        <Link href={DOCS_URL}>DOCS</Link>
        <Link href={GITHUB_URL}>GITHUB</Link>
      </Header>
      <Main>
        <ControlPanel>
          {features.map(([key, feature]) => {
            console.log('App -> feature', feature)
            return (
              <React.Fragment key={key}>
                <div>{key}</div>
                <div>
                  {Object.entries(feature.parameters).map(
                    ([parameterName, { value }]) => {
                      return <div key={parameterName}>{parameterName}</div>
                    },
                  )}
                </div>
              </React.Fragment>
            )
          })}
        </ControlPanel>
        <Canvas id="canvas"></Canvas>
      </Main>
    </div>
  )
}

export default App
