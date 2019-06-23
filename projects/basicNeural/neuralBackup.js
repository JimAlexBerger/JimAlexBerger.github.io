let populationSize = 100;
let testlength = 2000;
let running = false;


var fitnesses = {
    columns: [
        ["Best"],
        ["Average"]
    ]
};
var skipAnim;
var asap;

var canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "grey";
ctx.fillRect(0, 0, canvas.width, canvas.height);



ballPopulation = new population(populationSize);
document.getElementById("nextGen").onclick = doGen;
document.getElementById("skipAnim").onclick = toggleSkipAnim;
document.getElementById("asap").onclick = toggleAsap;





function doGen() {
    if (!running) {
        running = true;
        ballPopulation.testFitness(testlength);
        ballPopulation.sortByFitness();
        console.log(fitnesses);
        //fitnesses.push([ballPopulation.population[0].fitness, ballPopulation.population[ballPopulation.population.length - 1].fitness, ballPopulation.getAverage()]);
        fitnesses.columns[0].push(ballPopulation.population[0].fitness);
        fitnesses.columns[1].push(ballPopulation.getAverage());
        drawArray(fitnesses);

        drawBallAnimation();
    }
}

function drawArray(fitnessData) { //array: [i][0]=verdi [i][1] = laveste [i][2] = avg
    /*var canvas = document.getElementById(canvasId)
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    var data1 = {
        columns: [
            ["Best"],
            ["Average"]
        ]
    }

    var bredde = canvas.width / array.length;
    var hoyde = canvas.height / getLargest(array);
    for (var i = 0; i < array.length; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(i * bredde + bredde * 0.02, canvas.height - (array[i][0] * hoyde), bredde * 0.96, (array[i][0] * hoyde) - (array[i][1] * hoyde));
        ctx.fillStyle = "red";
        ctx.fillRect(i * bredde + bredde * 0.02, canvas.height - (array[i][2] * hoyde), bredde * 0.96, 2);

        data1.columns[0].push(array[i][0]);
        data1.columns[1].push(array[i][2]);
    }
console.log(data1);*/
    var chart = c3.generate({
        bindto: '#chart',
        data: fitnessData,
        size: {
            height: 600,
            width: 500
        },
        transition: {
            duration: 0
        }
    });

    /*var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
        }
    });*/

}

function getLargest(array) {
    var max = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] > max) {
            max = array[i][0];
        }
    }
    return max;
}

function drawBallAnimation() {

    let counter = 0;
    let score = 0;
    let point = [canvas.width * Math.random(), canvas.height * Math.random()];
    ballPopulation.population[0].x = canvas.width / 2;
    ballPopulation.population[0].y = canvas.width / 2;
    var prevSpot = [canvas.width / 2, canvas.height / 2];
    let loop = setInterval(function() {
            if (skipAnim === true) {
                clearInterval(loop);
                procreate();
            }

            drawBackground(canvas, "grey");
            ballPopulation.population[0].update(point);
            ballPopulation.population[0].draw(ctx);
            drawPoint(canvas, point, "blue");
            displayText(canvas, "Generation: " + fitnesses.length + " Score: " + score.toFixed(2) + " Frame " + counter + ":" + testlength, "blue")

            if (ballPopulation.population[0].x > 0 && ballPopulation.population[0].y > 0 && ballPopulation.population[0].x < canvas.width && ballPopulation.population[0].y < canvas.height) {

                if (Math.abs(prevSpot[0] - point[0]) > Math.abs(ballPopulation.population[0].x - point[0]) && Math.abs(prevSpot[1] - point[1]) > Math.abs(ballPopulation.population[0].y - point[1])) {
                    score += Math.abs(prevSpot[0] - ballPopulation.population[0].x) + Math.abs(prevSpot[1] - ballPopulation.population[0].y) / 10;
                }

                if (prevSpot[0] - ballPopulation.population[0].x === 1 && prevSpot[1] - ballPopulation.population[0].y === 1) {
                    clearInterval(loop);
                    procreate();
                }

                prevSpot[0] = ballPopulation.population[0].x;
                prevSpot[1] = ballPopulation.population[0].y;


                if (Math.abs(point[0] - ballPopulation.population[0].x) < 15 && Math.abs(point[1] - ballPopulation.population[0].y) < 15) {
                    score += 10000;
                    point = [canvas.width * Math.random(), canvas.height * Math.random()];
                }
                counter++;
            } else {
                clearInterval(loop);
                procreate();
            }

            if (counter > testlength) {
                clearInterval(loop);
                procreate();
            }
        },
        5);
}

function procreate() {
    ballPopulation.generateNextGen();
    ballPopulation.mutate(0.2);
    running = false;
    if (asap === true) {
        doGen();
    }
}

function toggleAsap() {
    asap = (document.getElementById("asap").checked);
}

function toggleSkipAnim() {
    skipAnim = (document.getElementById("skipAnim").checked);
}

function displayText(canvas, text, color) {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = color;

    ctx.font = "20px Georgia";
    ctx.fillText(text, 5, 20);
}

function drawPoint(canvas, point, color) {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(point[0], point[1], 5, 0, 2 * Math.PI);
    ctx.fill();

}

function Neuron(numInputs) {
    this.numInputs = numInputs;
    this.weights = [];
    for (var i = 0; i < numInputs + 1; i++) {
        this.weights.push(Math.random() * 2 - 1);
    }
}

function NeuronLayer(numNeurons, numInputsPerNeuron) {
    this.numNeurons = numNeurons;
    this.neurons = [];

    for (var i = 0; i < this.numNeurons; i++) {
        this.neurons.push(new Neuron(numInputsPerNeuron));
    }
}

function NeuralNet() {
    this.numInputs;
    this.numOutputs;
    this.numHiddenLayers;
    this.neuronsPerHiddenLayer;

    this.layers = [];

    this.createnet = function(numInputs, numOutputs, numHiddenLayers, neuronsPerHiddenLayer) {

        this.numInputs = numInputs;
        this.numOutputs = numOutputs;
        this.numHiddenLayers = numHiddenLayers;
        this.neuronsPerHiddenLayer = neuronsPerHiddenLayer;

        if (numHiddenLayers > 0) {

            this.layers.push(new NeuronLayer(neuronsPerHiddenLayer, numInputs));

            for (var i = 0; i < numHiddenLayers - 1; i++) {
                this.layers.push(new NeuronLayer(neuronsPerHiddenLayer, this.layers[this.layers.length - 1].numNeurons));
            }
        }

        this.layers.push(new NeuronLayer(numOutputs, this.layers[this.layers.length - 1].numNeurons));

    };

    this.getWeights = function() {
        let weights = [];
        for (var i = 0; i < this.numHiddenLayers + 1; i++) {

            for (var j = 0; j < this.layers[i].numNeurons; j++) {

                for (var k = 0; k < this.layers[i].neurons[j].numInputs + 1; k++) {
                    weights.push(this.layers[i].neurons[j].weights[k]);
                }

            }
        }
        return weights;
    };

    this.getNumberOfWeights = function() {
        return this.getWeights().length;
    };

    this.putWeights = function(weights) {
        var count = 0;
        if (weights.length !== this.getNumberOfWeights()) {
            return "Must have same ammount as in the net";
        }
        for (var i = 0; i < this.numHiddenLayers + 1; i++) {

            for (var j = 0; j < this.layers[i].numNeurons; j++) {

                for (var k = 0; k < this.layers[i].neurons[j].numInputs + 1; k++) {
                    this.layers[i].neurons[j].weights[k] = weights[count++];
                }
            }
        }
    };

    this.update = function(inputs) {
        let outputs = [];
        let cWeight = 0;

        if (inputs.length !== this.numInputs) {
            return outputs;
        }

        for (var i = 0; i < this.numHiddenLayers + 1; i++) {

            if (i > 0) {
                inputs = outputs;
            }

            outputs = [];

            cWeight = 0;

            for (var j = 0; j < this.layers[i].numNeurons; j++) {
                let netinput = 0;

                let numInputs = this.layers[i].neurons[j].numInputs;
                for (var k = 0; k < numInputs; k++) {
                    netinput += this.layers[i].neurons[j].weights[k] * inputs[cWeight++];
                }

                netinput += this.layers[i].neurons[j].weights[numInputs - 1] * (-1);


                outputs.push(this.sigmoid(netinput, 1));


                cWeight = 0;
            }
        }
        return outputs;
    };

    this.sigmoid = function(activation, response) {
        return 1 / (1 + (Math.pow(Math.E, -activation / response)));
    };
}

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.dx;
    this.dy;
    this.radius = 10;
    this.color = "red";
    this.fitness = 0;

    this.net = new NeuralNet;

    this.net.createnet(4, 2, 1, 5);

    this.update = function(objective) {
        var output = this.net.update([this.x, this.y, objective[0] - this.x, objective[1] - this.y]);
        this.dx = (output[0] * 2 - 1) * 8;
        this.dy = (output[1] * 2 - 1) * 8;

        this.x += this.dx;
        this.y += this.dy;
    }

    this.draw = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function drawBackground(canvas, color) {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}



function population(antall) {
    this.size = antall;
    this.population = [];

    for (var i = 0; i < this.size; i++) {
        this.population[i] = new Ball(canvas.height / 2, canvas.width / 2);
    }

    this.testFitness = function(testlength) {
        for (ball in this.population) {
            this.population[ball].fitness = 0;
            for (var k = 0; k < 3; k++) {
                var point = [canvas.width * Math.random(), canvas.height * Math.random()];
                var prevSpot = [canvas.width / 2, canvas.height / 2];
                this.population[ball].x = canvas.width / 2;
                this.population[ball].y = canvas.height / 2;
                for (var i = 0; i < testlength; i++) {
                    this.population[ball].update(point);

                    if (this.population[ball].x < canvas.width && this.population[ball].y < canvas.height && this.population[ball].y > 0 && this.population[ball].x > 0) {

                        if (Math.abs(prevSpot[0] - point[0]) > Math.abs(this.population[ball].x - point[0]) && Math.abs(prevSpot[1] - point[1]) > Math.abs(this.population[ball].y - point[1])) {
                            this.population[ball].fitness += Math.abs(prevSpot[0] - this.population[ball].x) + Math.abs(prevSpot[1] - this.population[ball].y) / 10;
                        }

                        if (prevSpot[0] - this.population[ball].x === 0 && prevSpot[1] - this.population[ball].y === 0) {
                            break;
                        }

                        prevSpot[0] = this.population[ball].x;
                        prevSpot[1] = this.population[ball].y;
                        if (Math.abs(point[0] - this.population[ball].x) < 15 && Math.abs(point[1] - this.population[ball].y) < 15) {
                            this.population[ball].fitness += 10000;
                            point = [canvas.width * Math.random(), canvas.height * Math.random()];
                        }
                    } else {
                        break;
                    }
                }
            }
            this.population[ball].fitness /= 3;
        }
    }

    this.mutate = function(ammount) {
        let tempWeights = [];
        for (ball in this.population) {
            tempWeights = this.population[ball].net.getWeights();
            for (weight in tempWeights) {
                tempWeights[weight] += (Math.random() * 2 - 1) * ammount;
            }
            this.population[ball].net.putWeights(tempWeights);
        }
    }

    this.sortByFitness = function() {
        this.population.sort(function(ball1, ball2) {
            return parseInt(ball2.fitness) - parseInt(ball1.fitness);
        });
    }

    this.getAverage = function() {
        let tempSum = 0;

        for (ball in this.population) {
            tempSum += this.population[ball].fitness;
        }

        return tempSum / this.population.length;
    }


    this.generateNextGen = function() {
        let tempPopualtion = [];
        let sum = 0;
        let prevProb = 0;

        for (ball in this.population) {
            sum += this.population[ball].fitness;
        }
        for (var i = 0; i < this.population.length; i++) {
            let thisFitness = this.population[i].fitness;
            this.population[i].fitness = prevProb + (thisFitness / sum)
            prevProb += (thisFitness / sum);
        }

        while (tempPopualtion.length < this.size) {

            var parent1 = Math.random() - 0.01;
            for (var i = 0; i < this.population.length; i++) {
                if (parent1 < this.population[i].fitness) {
                    parent1 = i;
                    break;
                }
            }

            var parent2 = Math.random() - 0.01;
            for (var i = 0; i < this.population.length; i++) {
                if (parent2 < this.population[i].fitness) {
                    parent2 = i;
                    break;
                }
            }

            tempPopualtion.push(this.crossover(this.population[parent1], this.population[parent2]));
        }

        this.population = tempPopualtion;
    }

    this.crossover = function(ball1, ball2) {
        tempBall = new Ball(canvas.width / 2, canvas.height / 2);
        let parent1Genes = ball1.net.getWeights();
        let parent2Genes = ball2.net.getWeights();
        let cutoff = Math.floor(Math.random() * parent1Genes.length);

        parent1Genes = parent1Genes.slice(0, cutoff);
        parent2Genes = parent2Genes.slice(cutoff, parent2Genes.length);

        tempBall.net.putWeights(parent1Genes.concat(parent2Genes));
        return tempBall;

    }

}