function Layer(neurons /*1d array*/, weight2 /*2d array*/) { // create a new layer
  this.neurons = [];
  for(var i = 0; i < neurons.length; i++) {
    this.neurons.push(new Neuron(neurons[i]));
  }
  this.connectLayers = function(targetLayer /*1d array*/, weight2 /*2d array*/) { // create the connections
    for(var f = 0; f < this.neurons.length; f++) { // for each neuron in its own layer
      for(var t = targetLayer.length - 1; t >= 0; t--) { // for each neuron in the next layer
        this.neurons[f].weights.unshift(new Weight(weight2[f][t])); // get the weight from the predefined set and make it the value of that weights
      }
    }
  }
}