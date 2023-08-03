// predict.js

import brain from "brain.js";
import scaler from "minmaxscaler";

async function predict(data) {
  const dailyStats = data.historical.reverse().map((obj) => obj["close"]);
  console.log("Daily stats:\n", dailyStats);

  function format(arr) {
    const toReturn = [];
    for (let i = 0; i < arr.length; i += 4) {
      toReturn.push(arr.slice(i, i + 4));
    }
    if (toReturn[toReturn.length - 1].length == 1) {
      const last = toReturn.pop();
      toReturn[toReturn.length - 1].concat(last);
    }
    return toReturn;
  }

  const scaledData = scaler.fit_transform(dailyStats);
  const trainingData = format(scaledData);

  // Create and train the neural network model
  const net = new brain.recurrent.LSTMTimeStep({
    inputSize: 4,
    hiddenLayers: [8, 8],
    outputSize: 4,
  });

  net.train(trainingData, {
    learningRate: 0.005,
    errorThresh: 0.02,
    log: (stats) => console.log(stats),
    iterations: 5000,
  });

  console.log(scaleUp(net.run(trainingData[0])));
  console.log(
    JSON.stringify(scaler.inverse_transform(net.forecast(scaledData, 3)))
  );
}

export { predict };
