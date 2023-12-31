import brain from "brain.js";
import scaler from "minmaxscaler";
import fs from "fs";

async function predict(data, ticker) {
  const dailyStats = data.historical.reverse().map((obj) => obj["close"]);

  function format(arr) {
    const toReturn = [];
    for (let i = 0; i < arr.length; i += 4) {
      toReturn.push(arr.slice(i, i + 4));
    }
    if (toReturn.length > 0 && toReturn[toReturn.length - 1].length === 3) {
      toReturn.pop();
    }
    return toReturn;
  }

  const scaledData = scaler.fit_transform(dailyStats);
  const trainingData = format(scaledData);

  let net;

  if (fs.existsSync(`./data/${ticker}_weights.json`)) {
    net = new brain.recurrent.LSTMTimeStep();
    net.fromJSON(JSON.parse(fs.readFileSync(`./data/${ticker}_weights.json`)));
    console.log("Trained neural network data loaded from file.");
  } else {
    console.log("Saved training data not found.\nStarting training...");

    try {
      net = new brain.recurrent.LSTMTimeStep({
        inputSize: 4,
        hiddenLayers: [8, 8],
        outputSize: 4,
      });

      net.train(trainingData, {
        learningRate: 0.05,
        errorThresh: 0.02,
        log: (stats) => console.log(stats),
        iterations: 5000,
      });
    } catch (error) {
      console.error("Error in training:\n", error.message);
      return;
    }

    fs.writeFileSync(
      `./data/${ticker}_weights.json`,
      JSON.stringify(net.toJSON())
    );
    console.log("Training data saved to file.");
  }

  const output = net.forecast(trainingData, 3);
  console.log(
    "\nPredicted stock price forecast for the next 4 days:\n\n",
    scaler.inverse_transform(output[0])
  );
}

export { predict };
