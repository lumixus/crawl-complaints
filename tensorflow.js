import * as tf from '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import fs, { appendFileSync } from "fs";
import {parse} from "csv-parse";

const trainData = [];
const N_CLASSES = 3;

fs.createReadStream('./train_data_merge.csv')
.pipe(parse({delimiter: ",", from_line: 1}))
.on("data", function(row){
    row[0] = row[0].toLowerCase();
    const complaint = {
        category: row[0],
        content: row[1]
    }
    trainData.push(complaint);
})



const encodeData = async (encoder, data) => {
    const sentences = data.map( d => d.content.toLowerCase());
    const embeddings = await encoder.embed(sentences);
    return embeddings;
}

const trainModel = async encoder => {
    const xTrain = await encodeData(encoder, trainData);

    const yTrain = tf.tensor2d(
        trainData.map(t => [
            t.category === "müşteri hizmetleri" ? 1 : 0,
            t.category === "servis hizmeti" ? 1 : 0,
            t.category === "arızalı ürün" ? 1 : 0
        ])
    )

    const model = tf.sequential();

    model.add(
        tf.layers.dense({
            inputShape: [xTrain.shape[1]],
            activation: "softmax",
            units: N_CLASSES
        })
    )

    model.compile({
        loss: "categoricalCrossentropy",
        optimizer: tf.train.adam(0.001),
        metrics: ["accuracy"]
    })

    await model.fit(xTrain, yTrain, {
        batchSize: 32,
        validationSplit: 0.1,
        shuffle: true,
        epochs: 1500,
    })

    return model;
}



const sentenceEncoder = await use.load();

const trainedModel = await trainModel(sentenceEncoder);


fs.createReadStream('./all_data.csv')
.pipe(parse({delimiter: ",", from_line: 1}))
.on("data", async function(row){
    let complaint = row[1].toLowerCase();

    const targetData = await encodeData(sentenceEncoder, [{
        content: complaint
    }]);
    
    
    const predictions = await trainedModel.predict(targetData).data();
    
    const labelIndex = predictions.indexOf(Math.max(...predictions))
    
    const labels = [
        "Müşteri Hizmetleri",
        "Servis Hizmeti",
        "Arızalı Ürün"
    ]

    appendFileSync('./result.csv', `${row[0]}, ${labels[labelIndex]}, ${complaint} \n`, {encoding : 'utf8'});

});