import React, { useEffect, useState } from "react";
import * as juice from "juice.js";
import * as PIXI from "pixi.js";
import * as l1 from "l1";
import _ from "lodash/fp";
import styled from "styled-components";
import { useDebounce } from "use-debounce";
import addFeature from "../addFeature";
import Controls from "./Controls";
import FeatureList from "../FeatureList";
import Emojify from "react-emojione";

const Y_MARGIN = 160;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin: 24px;
`;

const Canvas = styled.div``;

const Container = styled.div`
  display: flex;
`;

const ControlPanel = styled.div``;

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
      const _app = new PIXI.Application({ backgroundColor: 0xff00ff });
      document.getElementById("canvas").appendChild(_app.view);
      setApp(_app);
      l1.init(_app);
    }
  }, [app]);


  useEffect(
    () => {
      _.forEach.convert({ cap: false })(([key, feature], index) => {
        if (updatedFeature) {
          if (key === updatedFeature) {
            addFeature({
              id: key,
              getX: juice[key](feature.parameters),
              y: index * Y_MARGIN
            });
          }
        } else {
          addFeature({
            id: key,
            getX: juice[key](feature.parameters),
            y: index * Y_MARGIN
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
      <Emojify>
        <Title>juice.js :tropical_drink:</Title>
      </Emojify>
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
