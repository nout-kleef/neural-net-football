function NeuralNetwork(layers /*2d array*/, weight3 /*3d array*/) {
  this.values = layers;
  this.layers = [];
  for(var i = 0; i < layers.length; i++) { // the creation of the layers
    this.layers.push(new Layer(layers[i]));
  }
  for(var f = 0; f < layers.length - 1; f++) { // the creation of the connections between neurons of different layers, uses predefined weights
    this.layers[f].connectLayers(layers[f + 1], weight3[f]);
  }
  this.reset  = function(values) { // reset the neuron values
    for (var i = 0; i < this.layers.length; i++) {
      for (var t = 0; t < this.layers[i].neurons.length; t++) {
        this.layers[i].neurons[t].value = this.values[i][t];
      }
    }
  }
  this.run = function() { // the main function that will make the NN predict
    for (var t = 0; t < this.layers.length; t++) { // for each layer
      if(t !== 0) { // if not the first layer (input shouldn't be activated)
        this.activate(t);
      }
      if(t !== this.layers.length - 1) { // if not the last layer (the output cannot preActivate a layer that comes after it)
        this.preActivate(t); // this affects the layer that comes after it
      }
    }
  }
  this.preActivate = function(t) { // multiply the weights by the value of the neurons and add the result to the next layer (pre activation)
    for (var p = 0; p < this.layers[t].neurons.length; p++) { // for the neurons in the current layer
      for (var v = 0; v < this.layers[t].neurons[p].weights.length; v++) { // for the weights of the current neuron (the amount of weights is equal to the amount of neurons in the next layer)
        this.layers[t + 1].neurons[v].value += this.layers[t].neurons[p].weights[v].value * this.layers[t].neurons[p].value; // increment the neurons in the next layer
      }
    }
  }
  this.activate = function(t) { // take the sigmoid for each neuron in the current layer (activation)
    for (var hp = 0; hp < this.layers[t].neurons.length; hp++) {
      this.layers[t].neurons[hp].value = this.sigmoid(this.layers[t].neurons[hp].value);
    }
  }
  this.sigmoid = function(x) { // the sigmoidal function
    return 1 / (1 + 1 / pow(Math.E, x));
  }
}