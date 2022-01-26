const JS_STANDARD_OBJECTS = [
  'Object',
  'Function',
  'Boolean',
  'Symbol',
  'Error',
  'EvalError',
  'InternalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
  'Number',
  'Math',
  'Date',
  'String',
  'RegExp',
  'Array',
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Uint16Array',
  'Int32Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'Atomics',
  'DataView',
  'JSON',
  'Promise',
  'Generator',
  'GeneratorFunction',
  'AsyncFunction',
  'Reflect',
  'Proxy',
  'Intl',
  'WebAssembly'
]

const METHODS = [
  'keys',
  'values',
  'contains',
  'count',
  'has',
  'get',
  'set',
  'sum',
  'avg',
  'each',
  'slice',
  'reduce',
  'toArray',
  'chunk',
  'except',
  'filter',
  'isEmpty',
  'isNotEmpty',
  'first',
  'last',
  'map',
  'mapWithKeys',
  'flatten',
  'min',
  'max',
  'only',
  'pipe',
  'pluck',
  'reject',
  'swap',
  'shuffle',
  'take',
  'unique',
  'diff',
  'diffKeys',
  'intersect',
  'intersectByKeys',
  'merge',
  'keyBy',
  'groupBy',
  'sort',
  'sortDesc',
  'sortBy',
  'sortByDesc',
  'append',
  'prepend',
  'index',
  'insert',
  'join',
  'partition',
  'flip',
  'fill',
  'freeze',
  'isFrozen',
  'flatMap',
  'reverse'
]

export default function({ types: t }) {
  return {
    visitor: {
      CallExpression (path) {
        if (!path.node.callee || !path.node.callee.object || !path.node.callee.property) {
          return
        }

        if ([
          'Identifier',
          'MemberExpression',
          'ObjectExpression',
          'CallExpression'
        ].indexOf(path.node.callee.object.type) === -1) {
          return
        }

        if (path.node.callee.object.type === 'Identifier' &&
            path.node.callee.object.name === 'UniSharp.Helpers.Collection' &&
            path.node.callee.property.name === 'call') {
          return
        }

        let args = path.node.arguments
        let object = path.node.callee.object
        let method = path.node.callee.property.name

        if (JS_STANDARD_OBJECTS.indexOf(object.name) !== -1) {
          return
        }

        if (METHODS.indexOf(method) === -1) {
          return
        }

        path.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.identifier('UniSharp.Helpers.Collection'),
              t.identifier('call')
            ),
            [t.stringLiteral(method), object, ...args]
          )
        )
      }
    }
  }
}
