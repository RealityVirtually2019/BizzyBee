AFRAME.registerComponent('bounce-on-hover', {
    schema: {
        // event: {type: 'string', default: ''},
        // message: {type: 'string', default: 'Hello, World!'}
    },

    init: function () {
        this.el.addEventListener('mouseenter', function(){
           TweenMax.to(this.object3D.parent, 0.5, {three:{scale:1.3}, ease:Bounce.easeOut});
        });
        this.el.addEventListener('mouseleave', function(){
           TweenMax.to(this.object3D.parent, 0.4, {three:{scale:1}, ease:Bounce.easeOut});
        });

    },
});