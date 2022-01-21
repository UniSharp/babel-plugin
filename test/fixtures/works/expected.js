UniSharp.Helpers.Collection.call('map', foo, value => value);
UniSharp.Helpers.Collection.call('map', UniSharp.Helpers.Collection.call('map', foo, value => value), value => value);

UniSharp.Helpers.Collection.call('map', foo.bar, value => value);
UniSharp.Helpers.Collection.call('map', UniSharp.Helpers.Collection.call('map', foo.bar, value => value), value => value);

UniSharp.Helpers.Collection.call('map', foo.bar.baz, value => value);
UniSharp.Helpers.Collection.call('map', UniSharp.Helpers.Collection.call('map', foo.bar.baz, value => value), value => value);

[1, 2, 3].map(value => value);
UniSharp.Helpers.Collection.call('map', [1, 2, 3].map(value => value), value => value);

UniSharp.Helpers.Collection.call('map', { foo: 'bar' }, value => value);
UniSharp.Helpers.Collection.call('map', UniSharp.Helpers.Collection.call('map', { foo: 'bar' }, value => value), value => value);

UniSharp.Helpers.Collection.call('map', foo[0], value => value);
UniSharp.Helpers.Collection.call('map', UniSharp.Helpers.Collection.call('map', foo[0], value => value), value => value);

foo.xxx();
[1, 2, 3].xxx();
({ foo: 'bar' }).xxx();
