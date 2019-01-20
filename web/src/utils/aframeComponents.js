AFRAME.registerComponent('bounce-on-hover', {
    schema: {
        // event: {type: 'string', default: ''},
        // message: {type: 'string', default: 'Hello, World!'}
    },

    init: function () {
        var data = this.data;
        this.el.addEventListener('mouseenter', function(){
            TweenMax.to(this.object3D.parent, 0.5, {three:{scale:1.3}, ease:Bounce.easeOut});

            // debugger;
            // console.log(this.object3D.);
            // debugger;
            // TweenMax.to(this.object3D.parent.getObjectByName('text').material, 0.5, {opacity:1});
            // this.object3D.parent.getObjectByName('text').visible = true;
            window.wmPlanet.setMsg(this.getAttribute('msg'))

        });
        this.el.addEventListener('mouseleave', function(){
            TweenMax.to(this.object3D.parent, 0.4, {three:{scale:1}, ease:Bounce.easeOut});

            // TweenMax.to(this.object3D.parent.getObjectByName('text').material, 0.5, {opacity:0});
            // this.object3D.parent.getObjectByName('text').visible = false;
            window.wmPlanet.setMsg('')


        });

    },
});

AFRAME.registerComponent('named-text', {
    schema: {
        // event: {type: 'string', default: ''},
        // message: {type: 'string', default: 'Hello, World!'}
    },

    init: function () {
        var data = this.data;
        this.el.object3D.name = 'text'

        // debugger;
    },
});

var planetVector, planetMatrix, cameraVector, gazeMatrix, gazeVector, upVector = new THREE.Vector3(0, 1, 0), rightVector = new THREE.Vector3(1, 0, 0), forwardVector = new THREE.Vector3(0, 0, -1), rightAmount, upAmount;

AFRAME.registerComponent('planet-gaze-rotator', {
    schema: {
        // event: {type: 'string', default: ''},
        // message: {type: 'string', default: 'Hello, World!'}
    },

    spinValue: 0,
    MAX_SPIN: 1,

    tick: function () {
        // set planet vector as the line from the camera to the planet core, normalized
        planetVector = this.el.object3D.getWorldPosition();
        cameraVector = document.querySelector('#camera').object3D.getWorldPosition();
        planetVector = planetVector.sub(cameraVector);
        // debugger;
        planetVector.normalize();


        // console.log(cameraVector);

        // the rotation matrix for the line pointing to the planet from the camera
        planetMatrix = (new THREE.Matrix4()).makeRotationAxis(planetVector, 0);

        // now generate the up and right vectors by transforming up and right vectors by the planet matrix
        // upVector = forwardVector.clone();
        // upVector.applyAxisAngle( planetVector, 0 );
        upVector = upVector.applyMatrix3( planetMatrix );
        // rightVector = rightVector.applyMatrix4( planetMatrix );

        // console.log('upVector:', upVector)

        // now create up and right vectors to dot and see if we need to move left or right
        gazeMatrix = document.querySelector('#camera').object3D.matrixWorld.clone();
        gazeMatrix.extractRotation(gazeMatrix);
        gazeVector = new THREE.Vector3(0, 0, -1).transformDirection( gazeMatrix )

        rightAmount = rightVector.dot(gazeVector);
        // console.log('up:', upVector.dot(gazeVector), 'right:', rightAmount )
        // console.log('right:', rightAmount )

        // left/right rotation
        if(Math.abs(rightAmount) > 0.25){
            this.spinValue = Math.min(this.MAX_SPIN, this.spinValue + rightAmount * -0.0008);
        }

        this.el.object3D.rotation.y += this.spinValue;
        this.spinValue *= 0.92;


    },
});