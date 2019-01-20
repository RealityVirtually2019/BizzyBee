var _gsScope = (typeof module !== "undefined" && module.exports && typeof global !== "undefined") ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    var _xyzContexts = "position,scale,rotation".split(","),
        _contexts = {x:"position", y:"position", z:"position"},
        _DEG2RAD = Math.PI / 180,
        _visibleSetter = function(target, start, end) {
            var time = end ? 0 : 0.999999999;
            return function(ratio) {
                var value = (ratio > time) ? end : start;
                if (target.visible !== value) {
                    target.visible = value;
                    target.traverse(function (child) {
                        child.visible = value;
                    });
                }
            };
        },
        _addFuncPropTween = function(tween, func) {
            var proxy = {setRatio: func},
                backward = !!tween.vars.runBackwards,
                pt = {_next:tween._firstPT, t:proxy, p:"setRatio", s:backward ? 1 : 0, f:1, pg:0, n:"setRatio", m:0, pr:0, c:backward ? 0 : 1};
            tween._firstPT = pt;
            if (pt._next) {
                pt._next._prev = pt;
            }
            return pt;
        },
        _degreesToRadians = function(value) {
            return (typeof(value) === "string" && value.charAt(1) === "=") ? value.substr(0, 2) + (parseFloat(value.substr(2)) * _DEG2RAD) : value * _DEG2RAD;
        }, i, p;
    for (i = 0; i < _xyzContexts.length; i++) {
        p = _xyzContexts[i];
        _contexts[p + "X"] = p;
        _contexts[p + "Y"] = p;
        _contexts[p + "Z"] = p;
    }
    var ThreePlugin = _gsScope._gsDefine.plugin({
        propName: "three",
        priority: 0,
        API: 2,
        version: "0.0.2",
        init: function (target, values, tween, index) {
            var context, axis, value, p, i, m;
            for (p in values) {
                context = _contexts[p];
                value = values[p];
                if (typeof(value) === "function") {
                    value = value(index || 0, target);
                }
                if (context) {
                    i = p.charAt(p.length-1).toLowerCase();
                    axis = (i.indexOf("x") !== -1) ? "x" : (i.indexOf("z") !== -1) ? "z" : "y";
                    this._addTween(target[context], axis, target[context][axis], (p.indexOf("rotation") !== -1) ? _degreesToRadians(value) : value, p);
                } else if (p === "scale") {
                    this._addTween(target[p], "x", target[p].x, value, p + "X");
                    this._addTween(target[p], "y", target[p].y, value, p + "Y");
                    this._addTween(target[p], "z", target[p].z, value, p + "Z");
                } else if (p === "opacity") {
                    m = (target.material.length) ? target.material : [target.material];
                    i = m.length;
                    while (--i > -1) {
                        m[i].transparent = true;
                        this._addTween(m[i], p, m[i][p], value, p);
                    }
                } else if (p === "visible") {
                    if (target.visible !== value) {
                        _addFuncPropTween(tween, _visibleSetter(target, target.visible, value));
                    }
                } else {
                    this._addTween(target, p, target[p], value, p);
                }
                this._overwriteProps.push(p);
            }
            return true;
        }
    });

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }