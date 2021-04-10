(function () {

  function Pool(objects) {
    this.queue = [];
    this.objects = objects;
  };

  Pool.prototype.add = function (object) {
    this.objects.push(object);
    this.call();
  };

  Pool.prototype.call = function () {
    if (this.objects.length && this.queue.length) {
      var fn = this.queue.shift(),
        obj = this.objects.shift();

      fn(obj, this);
    }
  };

  Pool.prototype.act = function (fn) {
    this.queue.push(fn);
    this.call();
  };

  this.Pool = Pool;

}());

console.log('aqui')

/**USAGE**/
var fxs = [
  new Fx.Morph(false, { duration: 400 }),
  new Fx.Morph(false, { duration: 800 }),
  new Fx.Morph(false, { duration: 4000 })
],
  pool = new Pool(fxs),
  arr = [];

for (var i = 0; i < 420; i++) {
  arr.push(i);
}

Array.each(arr, function (i) {
  var e = new Element('div', {
    'text': i
  }).inject(document.body);

  pool.act(function (fx, p) {
    fx.element = e;

    e.set('text', e.get('text') + ' duration:' + fx.options.duration);
    switch (fx.options.duration) {
      case 400:
        bkg = 'blue';
        break;

      case 800:
        bkg = 'green';
        break;

      case 4000:
        bkg = 'red';
        break;
    }

    e.setStyle('background', bkg);
    fx.start({
      width: '300'
    }).chain(function () {
      p.add(fx);
    });
  });
});