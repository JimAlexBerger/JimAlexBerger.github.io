let populationSize = 100;
let testlength = 200;
let canvasHeight = 500, canvasWidth = 700;
let running = false;
let first = true;

ballPopulation = new population(populationSize);

onmessage = function(e) {
    if(!running){
        if (first) {
            ballPopulation.testFitness(testlength);
            ballPopulation.sortByFitness();
            postMessage([ballPopulation.population[0].fitness, ballPopulation.getAverage(), ballPopulation.population[0].net.getWeights()]);
            ballPopulation.generateNextGen();
            ballPopulation.mutate(0.2);
            ballPopulation.testFitness(testlength);
            ballPopulation.sortByFitness();
            first = false;
        } else if (e.data == "doGen") {
            postMessage([Math.floor(ballPopulation.population[0].fitness), Math.floor(ballPopulation.getAverage()), ballPopulation.population[0].net.getWeights()]);
            ballPopulation.generateNextGen();
            ballPopulation.mutate(0.2);
            ballPopulation.testFitness(testlength);
            ballPopulation.sortByFitness();
            postMessage("notRunning");
        }
    }
    else{
        postMessage("Running");
    }
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
        var output = this.net.update([this.x, this.y, objective[0], objective[1]]);
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

function population(antall) {
    this.size = antall;
    this.population = [];

    for (var i = 0; i < this.size; i++) {
        this.population[i] = new Ball(canvasHeight / 2, canvasWidth / 2);
    }

    this.testFitness = function(testlength) {
        running = true;
        for (ball in this.population) {
            this.population[ball].fitness = 0;
            for (var k = 0; k < 3; k++) {
                var point = [canvasWidth * Math.random(), canvasHeight * Math.random()];
                var prevSpot = [canvasWidth / 2, canvasHeight / 2];
                this.population[ball].x = canvasWidth / 2;
                this.population[ball].y = canvasHeight / 2;
                for (var i = 0; i < testlength; i++) {
                    this.population[ball].update(point);

                    if (this.population[ball].x < canvasWidth && this.population[ball].y < canvasHeight && this.population[ball].y > 0 && this.population[ball].x > 0) {

                        if (Math.abs(prevSpot[0] - point[0]) > Math.abs(this.population[ball].x - point[0]) && Math.abs(prevSpot[1] - point[1]) > Math.abs(this.population[ball].y - point[1])) {
                            this.population[ball].fitness += Math.abs(prevSpot[0] - this.population[ball].x) + Math.abs(prevSpot[1] - this.population[ball].y) / 10;
                        }

                        if (prevSpot[0] - this.population[ball].x == 0 && prevSpot[1] - this.population[ball].y == 0) {
                            break;
                        }

                        prevSpot[0] = this.population[ball].x;
                        prevSpot[1] = this.population[ball].y;
                        if (Math.abs(point[0] - this.population[ball].x) < 15 && Math.abs(point[1] - this.population[ball].y) < 15) {
                            this.population[ball].fitness += 10000;
                            point = [canvasWidth * Math.random(), canvasHeight * Math.random()];
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
        running = false;
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
        tempBall = new Ball(canvasWidth / 2, canvasHeight / 2);
        let parent1Genes = ball1.net.getWeights();
        let parent2Genes = ball2.net.getWeights();
        let cutoff = Math.floor(Math.random() * parent1Genes.length);

        parent1Genes = parent1Genes.slice(0, cutoff);
        parent2Genes = parent2Genes.slice(cutoff, parent2Genes.length);

        tempBall.net.putWeights(parent1Genes.concat(parent2Genes));
        return tempBall;

    }

}

function procreate() {
    ballPopulation.generateNextGen();
    ballPopulation.mutate(0.2);
}
