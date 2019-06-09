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
import Color from "../constant/color";
import Size from "../constant/size";

const Y_MARGIN = 45;
const Y_OFFSET = 80;

const DEBOUNCE_RATE = 500;

const DOCS_URL = "https://rymdkraftverk.github.io/juice.js";
const GITHUB_URL = "https://github.com/rymdkraftverk/juice.js";

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
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
  width: ${Size.LEFT_COLUMN_WIDTH}px;
  background-color: ${Color.BLUE};
  height: 100%;
`;

const Header = styled.div`
  height: 60px;
  background-color: ${Color.LIGHTER_GRAY};
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Link = styled.a`
  margin-left: 64px;
  font-weight: bold;
  font-size: 16px;
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
              [parameter]: {
                ...feature.parameters[parameter],
                value
              }
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

  // Both of these values need to be debounced. Will cause an unnecessary re-render, but that should be acceptable.
  const [debouncedFeatures] = useDebounce(features, DEBOUNCE_RATE);
  const [debouncedUpdatedFeature] = useDebounce(updatedFeature, DEBOUNCE_RATE);

  useEffect(() => {
    if (!app) {
      const _app = new PIXI.Application({
        backgroundColor: l1.convertColorHex(Color.BLUE),
        width: 1000,
        height: 1600
      });
      document.getElementById("canvas").appendChild(_app.view);
      setApp(_app);
      l1.init(_app);
    }
  }, [app]);

  console.log("rerender!");

  useEffect(() => {
    _.forEach.convert({ cap: false })(([key, feature], index) => {
      addFeature({
        id: key,
        getX: juice[key](_.mapValues("value", feature.parameters)),
        y:
          Y_OFFSET +
          index * ((Y_MARGIN * Object.keys(feature.parameters).length) / 2)
      });
    })(features);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    _.forEach.convert({ cap: false })(([key, feature], index) => {
      if (key === debouncedUpdatedFeature) {
        addFeature({
          id: key,
          getX: juice[key](_.mapValues("value", feature.parameters)),
          y:
            Y_OFFSET +
            index * ((Y_MARGIN * Object.keys(feature.parameters).length) / 2)
        });
      }
    })(debouncedFeatures);
  }, [debouncedUpdatedFeature, debouncedFeatures]);

  useEffect(() => {
    if (refreshFeature) {
      l1.resetBehavior(refreshFeature);
      setRefreshFeature(null);
    }
  }, [refreshFeature]);

  return (
    <React.StrictMode>
      <Header>
        <Logo>
          <Emojify>
            <Title>juice.js :tropical_drink:</Title>
          </Emojify>
        </Logo>
        <Link href={DOCS_URL}>DOCS</Link>
        <Link href={GITHUB_URL}>GITHUB</Link>
      </Header>
      <Container>
        <ControlPanel>
          {_.map.convert({ cap: false })(([key, feature]) => {
            return (
              <Controls
                height={40 + Y_MARGIN * Object.keys(feature.parameters).length}
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
