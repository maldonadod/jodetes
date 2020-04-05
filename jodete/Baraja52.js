class Baraja {
  constructor() {
    this.cartas = shuffle([
      "oro.1", "oro.2", "oro.3", "oro.4", "oro.5",
      "oro.6", "oro.7", "oro.8", "oro.9", "oro.10",
      "oro.11", "oro.12",
      "copa.1", "copa.2", "copa.3", "copa.4", "copa.5",
      "copa.6", "copa.7", "copa.8", "copa.9", "copa.10",
      "copa.11", "copa.12",
      "espada.1", "espada.2", "espada.3", "espada.4", "espada.5",
      "espada.6", "espada.7", "espada.8", "espada.9", "espada.10",
      "espada.11", "espada.12",
      "basto.1", "basto.2", "basto.3", "basto.4", "basto.5",
      "basto.6", "basto.7", "basto.8", "basto.9", "basto.10",
      "basto.11", "basto.12",
    ])
  }
  robarUnaCarta() {
    return this.cartas.shift()
  }
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

module.exports = Baraja;