import React from "react";
import * as juice from "juice.js";
import * as PIXI from "pixi.js";
import * as l1 from "l1";
import _ from "lodash/fp";
import addFeature from "../addFeature";
import styled from "styled-components";
import Controls from "./Controls";

const Y_MARGIN = 120;

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

const FeatureList = [
  [
    "sine",
    {
      parameters: {
        start: 100,
        end: 700,
        speed: 180
      },
      function: juice.sine
    }
  ],
  [
    "easeInOut",
    {
      parameters: {
        start: 100,
        end: 600,
        duration: 120
      },
      function: juice.easeInOut
    }
  ]
];

const updateParameter = (features, setFeatures) => (
  featureName,
  parameter,
  value
) => {
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
  const [app, setApp] = React.useState(null);
  const [features, setFeatures] = React.useState(FeatureList);
  console.log("features", features);
  React.useEffect(() => {
    if (!app) {
      const _app = new PIXI.Application({ backgroundColor: 0xff00ff });
      document.getElementById("canvas").appendChild(_app.view);
      setApp(_app);
      l1.init(_app);
    }
  });

  React.useEffect(
    () => {
      l1.getAll().forEach(l1.destroy);
      l1.getAllBehaviors().forEach(l1.removeBehavior);
      _.map.convert({ cap: false })(([, feature], index) => {
        addFeature({
          getX: feature.function(feature.parameters),
          y: index * Y_MARGIN
        });
      })(features);
    },
    [features]
  );

  return (
    <React.StrictMode>
      <Title>juice.js</Title>
      <Container>
        <ControlPanel>
          {_.map.convert({ cap: false })(([key, feature]) => {
            return (
              <Controls
                height={Y_MARGIN}
                key={key}
                name={key}
                controls={feature.parameters}
                onChange={updateParameter(features, setFeatures)}
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
