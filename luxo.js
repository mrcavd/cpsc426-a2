    //  Luxo

console.log("luxo.js")

////////////////////////////////////////////////////////////////////////
// initLuxoMotions():  setup Motion instances for each object that we wish to animate
////////////////////////////////////////////////////////////////////////

function initLuxoMotions() {

      // basic interpolation test
//    myboxMotion.currTime = 0.1;
//    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=0.1
//    myboxMotion.currTime = 2.9;
//    console.log('kf',myboxMotion.currTime,'=',myboxMotion.getAvars());    // interpolate for t=2.9

      // keyframes for Luxo:    name, dt, [x, y, theta1, theta2, theta3, theta4]
    luxoMotion.addKeyFrame(new Keyframe('init',         0.0, [-5, 0,   0, -45, 25, 95]));
    luxoMotion.addKeyFrame(new Keyframe('setup',         0.3, [-5.1, 0,   0, -5, 45, 60]));
    luxoMotion.addKeyFrame(new Keyframe('ready',         0.5, [-5  , 0.2,   0, -20, 25, 70]));
    luxoMotion.addKeyFrame(new Keyframe('jump_0',         1.0, [-3, 3,   -40, -30, 90, 90]));
    luxoMotion.addKeyFrame(new Keyframe('jump_1',         1.0, [0, 1.3,   5, -20, 45, 45]));
    luxoMotion.addKeyFrame(new Keyframe('landed',         0.4, [0, 1.0,   0, -20, 45,30]));
    luxoMotion.addKeyFrame(new Keyframe('reverse_0',         1.0, [0, 1.0,   0, -100, 200,90]));
    luxoMotion.addKeyFrame(new Keyframe('reverse_1',         0.5, [0, 1.0,   0, -150, 280,120]));
    luxoMotion.addKeyFrame(new Keyframe('ready',         0.3, [0, 1.5,   5, -150, 280,120]));
    luxoMotion.addKeyFrame(new Keyframe('jump_0',         0.5, [-3, 8.0,   180, -130, 300, 150]));
    luxoMotion.addKeyFrame(new Keyframe('jump_1',         1.0, [-4, 1.0,   350, -130, 320, 100]));
    // luxoMotion.addKeyFrame(new Keyframe('landing',         0.3, [-5, 0.6,   340, -130, 320, 95]));
    luxoMotion.addKeyFrame(new Keyframe('landed',         0.5, [-5, 0,   360, -130, 320, 85]));
    luxoMotion.addKeyFrame(new Keyframe('reset_0',         1.2, [-5, 0,   360, -40, 25, 95]));

    // Discarded Frame
    // luxoMotion.addKeyFrame(new Keyframe('straight',         0.3, [10, 8,   100, -85, 125, 20]));
    // luxoMotion.addKeyFrame(new Keyframe('straight',         1.0, [1, 8,   100, -85, 125, 20]));

}

/////////////////////////////////////	
// initLuxo():  setup Luxo geometry
/////////////////////////////////////	

function initLuxo() {

    // var axesHelper = new THREE.AxesHelper( 5 );
    // var axesHelper1 = new THREE.AxesHelper(3);

    luxolight = new THREE.PointLight(0xffffff);
    luxolight.castShadow = true;
    // luxolight.add(axesHelper);
    scene.add(luxolight);

    boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    coneGeometry = new THREE.ConeGeometry( 0.9,0.5,32,5,true );
    sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    jointGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 1.1, 20, 4 );

    luxo1 = new THREE.Mesh( boxGeometry, bottomMaterial );   scene.add( luxo1 );
    luxo2 = new THREE.Mesh( boxGeometry, diffuseMaterial );   scene.add( luxo2 );
    luxo3 = new THREE.Mesh( boxGeometry, diffuseMaterial );   scene.add( luxo3 );
    luxo4 = new THREE.Mesh( boxGeometry, diffuseMaterial);   scene.add( luxo4 );
    luxo5 = new THREE.Mesh( coneGeometry, diffuseMaterial);
    luxo6 = new THREE.Mesh( sphereGeometry, bulbMaterial);

    // luxo6.add( axesHelper1 );

    // bulbTarget = new THREE.Mesh( sphereGeometry, diffuseMaterial2);
    // scene.add(bulbTarget);

    scene.add(luxo5);
    scene.add(luxo6);
    luxoj1 = new THREE.Mesh( jointGeometry, tieMaterial);  scene.add(luxoj1);
    luxoj2 = new THREE.Mesh( jointGeometry, diffuseRed);  scene.add(luxoj2);
    luxoj3 = new THREE.Mesh( jointGeometry, diffuseRed);  scene.add(luxoj3);

    luxoj1.castShadow = true;    luxoj1.receiveShadow = false;
    luxoj2.castShadow = true;    luxoj2.receiveShadow = false;
    luxo1.castShadow = true;    luxo1.receiveShadow = false;
    luxo2.castShadow = true;    luxo2.receiveShadow = false;
    luxo3.castShadow = false;    luxo3.receiveShadow = false;
    luxo4.castShadow = false;    luxo4.receiveShadow = false;
    luxo5.castShadow = true;    luxo5.receiveShadow = false;
    luxo6.castShadow = false;   luxo6.receiveShadow = false;
    //bulbTarget.castShadow = false;


    luxo1.matrixAutoUpdate = false;  
    luxo2.matrixAutoUpdate = false;  
    luxo3.matrixAutoUpdate = false;  
    luxo4.matrixAutoUpdate = false;
    luxo5.matrixAutoUpdate = false;
    luxo6.matrixAutoUpdate = false;
    luxoj1.matrixAutoUpdate = false;  
    luxoj2.matrixAutoUpdate = false;  
    luxoj3.matrixAutoUpdate = false;
    //bulbTarget.matrixAutoUpdate = false;

    //testBulb.matrixAutoUpdate = false;
}

///////////////////////////////////////////////////////////////////////////////////////
// updateLuxo(avars)
///////////////////////////////////////////////////////////////////////////////////////

function updateLuxo(avars) {
    var deg2rad = Math.PI/180;
    var xPosition = avars[0];
    var yPosition = avars[1];
    var theta1 = avars[2]*deg2rad;
    var theta2 = avars[3]*deg2rad;
    var theta3 = avars[4]*deg2rad;
    var theta4 = avars[5]*deg2rad;
    var len1 = 3;  var len2 = 3;   var len3 = 3;      var len4 = 0.8;
    var width = 0.5;  var depth=1;
    var frame1 = new THREE.Matrix4();
    var frame2 = new THREE.Matrix4();
    var frame3 = new THREE.Matrix4();
    var frame4 = new THREE.Matrix4();
    var frame5 = new THREE.Matrix4();
    var position = new THREE.Vector3();

      ////////////// luxo1
    luxo1.matrix.identity(); 
    luxo1.matrix.multiply(new THREE.Matrix4().makeTranslation(xPosition,yPosition,2));   
    luxo1.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta1));    
      // Frame 1 has been established
    frame1.copy(luxo1.matrix);
    luxo1.matrix.multiply(new THREE.Matrix4().makeTranslation(0,0.5*width,0));
    luxo1.matrix.multiply(new THREE.Matrix4().makeScale(len1,width,depth));    

      ////////////// luxo2
    luxo2.matrix.copy(frame1);      // start with parent frame
    luxo2.matrix.multiply(new THREE.Matrix4().makeTranslation(0,width,0));
    luxo2.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta2));    
      // Frame 2 has been established
    frame2.copy(luxo2.matrix);
    luxoj1.matrix.copy(frame2);
    luxoj1.matrix.multiply(new THREE.Matrix4().makeRotationX(0.5*Math.PI));
    luxo2.matrix.copy(frame2);
    luxo2.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.5*len2,0,0));   
    luxo2.matrix.multiply(new THREE.Matrix4().makeScale(len2,width,depth));    

      ///////////////  luxo3
    luxo3.matrix.copy(frame2);
    luxo3.matrix.multiply(new THREE.Matrix4().makeTranslation(-len2,0,0));
    luxo3.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta3));    
      // Frame 3 has been established
    frame3.copy(luxo3.matrix);
    luxoj2.matrix.copy(frame3);
    luxoj2.matrix.multiply(new THREE.Matrix4().makeRotationX(0.5*Math.PI));
    luxo3.matrix.copy(frame3);
    luxo3.matrix.multiply(new THREE.Matrix4().makeTranslation(0.5*len3,0,0));   
    luxo3.matrix.multiply(new THREE.Matrix4().makeScale(len3,width,depth));    

      /////////////// luxo4
    luxo4.matrix.copy(frame3);
    luxo4.matrix.multiply(new THREE.Matrix4().makeTranslation(len3,0,0));
    luxo4.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta4));    
      // Frame 4 has been established
    frame4.copy(luxo4.matrix);
    luxoj3.matrix.copy(frame4);
    luxoj3.matrix.multiply(new THREE.Matrix4().makeRotationX(0.5*Math.PI));
    luxo4.matrix.copy(frame4);
    luxo4.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*len4,0));
    luxo4.matrix.multiply(new THREE.Matrix4().makeScale(0.2*width,len4,0.2*depth));

    luxo5.matrix.copy(frame4);
    luxo5.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.7*len4, 0));

    luxo6.matrix.copy(frame4);
    luxo6.matrix.multiply(new THREE.Matrix4().makeRotationZ(-0.5*Math.PI));
    luxo6.matrix.multiply(new THREE.Matrix4().makeTranslation(1.1*len4, 0, 0));
    // bulbTarget.matrix.copy(luxo6.matrix);
    // bulbTarget.matrix.multiply(new THREE.Matrix4().makeTranslation(3.2*len4, 0, 0));
    // bulbTarget.matrix.multiply(new THREE.Matrix4().makeScale(0.1, 0.1, 0.1));

    frame5.copy(luxo6.matrix);
    // luxolight.matrix.copy(frame5);
    // luxolight.matrix.multiply(new THREE.Matrix4().makeRotationZ(theta4));
    position.setFromMatrixPosition(frame5);

    // position.setFromMatrixPosition(frame5);
    luxolight.position.x = position.x+0.4;
    luxolight.position.y = position.y;
    luxolight.position.z = position.z;

    luxolight.position.set(luxolight.position.x, luxolight.position.y, luxolight.position.z);
    // luxolight.target = bulbTarget;
    //testBulb.matrix.copy(luxo6.matrix);
    //luxolight.target = position;
    //console.log(position.x + ', ' + position.y + ', ' + position.z);

    //console.log(frame4);

    luxo1.updateMatrixWorld();
    luxo2.updateMatrixWorld();
    luxo3.updateMatrixWorld();
    luxo4.updateMatrixWorld();
    luxo5.updateMatrixWorld();
    luxo6.updateMatrixWorld();
    luxolight.updateMatrixWorld();
    //bulbTarget.updateMatrixWorld();

    //testBulb.updateMatrixWorld();
}

