import React, { useEffect, useState } from "react";
import * as juice from "juice.js";
import * as PIXI from "pixi.js";
import * as l1 from "l1";
import _ from "lodash/fp";
import styled from "styled-components/macro";
import { useDebounce } from "use-debounce";
import addFeature from "../addFeature";
import Controls from "./Controls";
import FeatureList from "../FeatureList";
import Emojify from "react-emojione";
import Color from '../color';

const Y_MARGIN = 160;
const Y_OFFSET = 80;

const DOCS_URL = 'https://rymdkraftverk.github.io/juice.js'
const GITHUB_URL = 'https://github.com/rymdkraftverk/juice.js'

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const Canvas = styled.div``;

const Container = styled.div`
  display: flex;
`;

const ControlPanel = styled.div``;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  background-color: ${Color.BLUE};
  height: 100%;
`;

const Header = styled.div`
  height: 70px;
  margin-bottom: 32px;
  background-color: ${Color.LIGHTER_GRAY};
  display: flex;
  align-items: center;
`;

const Link = styled.a`
  margin-left: 64px;
  font-weight: bold;
  cursor: pointer;
`;

const updateParameter = (features, setFeatures, setUpdatedFeature) => (
  featureName,
  parameter,
  value
) => {
  setUpdatedFeature(featureName);
  setFeatures(
    features.map(([key, feature]) => {
      if (key === featureName) {
        return [
          key,
          {
            ...feature,
            parameters: {
              ...feature.parameters,
              [parameter]: value
            }
          }
        ];
      }
      return [key, feature];
    })
  );
};

const App = () => {
  const [app, setApp] = useState(null);
  const [features, setFeatures] = useState(FeatureList);
  const [updatedFeature, setUpdatedFeature] = useState(null);
  const [refreshFeature, setRefreshFeature] = useState(null);
  const debouncedFeatures = useDebounce(features, 500);

  useEffect(() => {
    if (!app) {
      const _app = new PIXI.Application({ backgroundColor: l1.convertColorHex(Color.BLUE) });
      document.getElementById("canvas").appendChild(_app.view);
      setApp(_app);
      l1.init(_app);
    }
  }, [app]);

  console.log('rerender!')

  useEffect(
    () => {
      _.forEach.convert({ cap: false })(([key, feature], index) => {
        if (updatedFeature) {
          if (key === updatedFeature) {
            addFeature({
              id: key,
              getX: juice[key](feature.parameters),
              y: Y_OFFSET + index * Y_MARGIN
            });
          }
        } else {
          addFeature({
            id: key,
            getX: juice[key](feature.parameters),
            y: Y_OFFSET + index * Y_MARGIN
          });
        }
      })(features);
    },
    [debouncedFeatures, features, updatedFeature]
  );

  useEffect(
    () => {
      if (refreshFeature) {
        l1.resetBehavior(refreshFeature);
        setRefreshFeature(null);
      }
    },
    [refreshFeature]
  );

  return (
    <React.StrictMode>
      <Header>
        <Logo>
          <Emojify>
            <Title>juice.js :tropical_drink:</Title>
          </Emojify>
        </Logo>
        <Link href={DOCS_URL}>
          DOCS
        </Link>
        <Link href={GITHUB_URL}>
          GITHUB
        </Link>
      </Header>
      <Container>
        <ControlPanel>
          {_.map.convert({ cap: false })(([key, feature]) => {
            return (
              <Controls
                height={Y_MARGIN}
                key={key}
                name={key}
                controls={feature.parameters}
                onRefreshClick={setRefreshFeature}
                isRefreshable={feature.isRefreshable}
                onChange={updateParameter(
                  features,
                  setFeatures,
                  setUpdatedFeature
                )}
              />
            );
          })(features)}
        </ControlPanel>
        <Canvas id="canvas" />
      </Container>
    </React.StrictMode>
  );
};

export default App;
