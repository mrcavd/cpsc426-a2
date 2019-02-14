///////// scene.js //////////////////

/////////////////////////////////////	
// MATERIALS
/////////////////////////////////////	

var diffuseBlue = new THREE.MeshLambertMaterial( {color: 0xc0c0ff} );
var diffuseRed = new THREE.MeshLambertMaterial( {color: 0xff4040} );
var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xaf7f3f} );
var bulbMaterial = new THREE.MeshLambertMaterial( {emissive: 0xffffff, color: 0xfff44f} );
var coneMaterial = new THREE.MeshLambertMaterial( {emissive: 0x250018, color: 0xd4c821, side: THREE.DoubleSide});
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var yellowMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var redMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var greenMaterial = new THREE.MeshBasicMaterial( {color: 0x00f000} );
var blueMaterial = new THREE.MeshBasicMaterial( {color: 0x0000f0} );
var armadilloMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );

console.log("scene.js")

/////////////////////////////////////	
// initLights():  SETUP LIGHTS
/////////////////////////////////////	

function initLights() {
    light = new THREE.PointLight(0xffffff);
    light.position.set(5,6,4);
    light.castShadow = true; 
    //scene.add(light);
    ambientLight = new THREE.AmbientLight(0xf6fabc, 0.45);
    scene.add(ambientLight);
}

/////////////////////////////////////
// Skybox textures
/////////////////////////////////////
var textureLoader = new THREE.TextureLoader();

posxTexture = textureLoader.load( "images/posx.jpg" );
posyTexture = textureLoader.load( "images/posy.jpg" );
poszTexture = textureLoader.load( "images/posz.jpg" );
negxTexture = textureLoader.load( "images/negx.jpg" );
negyTexture = textureLoader.load( "images/negy.jpg" );
negzTexture = textureLoader.load( "images/negz.jpg" );

minFilter = THREE.NearestFilter;
magFilter = THREE.LinearFilter;

posxTexture.magFilter = magFilter;
posxTexture.minFilter = minFilter;
posyTexture.magFilter = magFilter;
posyTexture.minFilter = minFilter;
poszTexture.magFilter = magFilter;
poszTexture.minFilter = minFilter;
negxTexture.magFilter = magFilter;
negxTexture.minFilter = minFilter;
negyTexture.magFilter = magFilter;
negyTexture.minFilter = minFilter;
negzTexture.magFilter = magFilter;
negzTexture.minFilter = minFilter;

/////////////////////////////////////
// Skybox add()
/////////////////////////////////////
function initSkybox() {
    var size = 100;
    wallGeometry = new THREE.PlaneBufferGeometry(2 * size, 2 * size);

    posxMaterial = new THREE.MeshBasicMaterial({map: posxTexture, side: THREE.DoubleSide});
    posxWall = new THREE.Mesh(wallGeometry, posxMaterial);
    posxWall.position.x = size;
    posxWall.rotation.y = -Math.PI / 2;
    scene.add(posxWall);

    negxMaterial = new THREE.MeshBasicMaterial( {map: negxTexture, side:THREE.DoubleSide });
    negxWall = new THREE.Mesh(wallGeometry, negxMaterial);
    negxWall.position.x = -size;
    negxWall.rotation.y = Math.PI / 2;
    scene.add(negxWall);

    posyMaterial = new THREE.MeshBasicMaterial( {map: posyTexture, side:THREE.DoubleSide });
    posyWall = new THREE.Mesh(wallGeometry, posyMaterial);
    posyWall.position.y = size;
    posyWall.rotation.x = Math.PI / 2;
    scene.add(posyWall);

    negyMaterial = new THREE.MeshBasicMaterial( {map: negyTexture, side:THREE.DoubleSide });
    negyWall = new THREE.Mesh(wallGeometry, negyMaterial);
    negyWall.position.y = -size;
    negyWall.rotation.x = -Math.PI / 2;
    scene.add(negyWall);

    poszMaterial = new THREE.MeshBasicMaterial( {map: poszTexture, side:THREE.DoubleSide });
    poszWall = new THREE.Mesh(wallGeometry, poszMaterial);
    poszWall.position.z = size;
//poszWall.rotation.y = -Math.PI / 2;
    scene.add(poszWall);

    negzMaterial = new THREE.MeshBasicMaterial( {map: negzTexture, side:THREE.DoubleSide });
    negzWall = new THREE.Mesh(wallGeometry, negzMaterial);
    negzWall.position.z = -size;
    poszWall.rotation.y = Math.PI;
    scene.add(negzWall);
}

/////////////////////////////////////	
// initLuxoObjects()
/////////////////////////////////////	

function initLuxoObjects() {
    // multi-colored cube      [https://stemkoski.github.io/Three.js/HelloWorld.html] 
    var cubeMaterialArray = [];    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
      // Cube parameters: width (x), height (y), depth (z), 
      //        (optional) segments along x, segments along y, segments along z
    var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
    mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
    mcc.position.set(10,0.75,2);
    scene.add( mcc );	

    // cylinder
    // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
    cylinderGeometry = new THREE.CylinderGeometry( 2, 2, 1, 20, 4 );
    cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
    cylinder.position.set(0, 0.5, 2);
    scene.add( cylinder );

      // textured floor
    floorTexture = new THREE.TextureLoader().load('images/wood.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(2, 2);
    floorMaterial = new THREE.MeshLambertMaterial( {color: 0xcfcfcf, 
						    map: floorTexture, side: THREE.DoubleSide });
    floorGeometry = new THREE.PlaneBufferGeometry(30,30);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 0.0;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
    floor.castShadow = false;
    floor.receiveShadow = true;

    // textured ceiling
    // ceilingTexture = new THREE.TextureLoader().load('images/floor.jpg');
    // ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
    // ceilingTexture.repeat.set(2, 2);
    // ceilingMaterial = new THREE.MeshLambertMaterial( {color: 0xcfcfcf, 
    //     map: ceilingTexture, side: THREE.DoubleSide });
    // ceilingGeometry =new THREE.PlaneBufferGeometry(30,30);
    // ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    // ceiling.position.y = 15.0;
    // ceiling.rotation.x = Math.PI / 2;
    // scene.add(ceiling);
    // ceiling.castShadow = false;
    // ceiling.receiveShadow = true;

    // textured Lwall
    // LWallTexture = new THREE.TextureLoader().load('images/floor.jpg');
    // LWallTexture.wrapS = LWallTexture.wrapT = THREE.RepeatWrapping;
    // LWallTexture.repeat.set(2, 2);
    // LWallMaterial = new THREE.MeshLambertMaterial( {color: 0xcfcfcf, 
    //     map: LWallTexture, side: THREE.DoubleSide });
    // LWallGeometry =new THREE.PlaneBufferGeometry(30,30);
    // LWall = new THREE.Mesh(LWallGeometry, LWallMaterial);
    // LWall.position.y = 15.0;
    // LWall.rotation.x = 0;
    // LWall.position.z = -15.0;
    // scene.add(LWall);
    // LWall.castShadow = false;
    // LWall.receiveShadow = true;

    // cone:   parameters --  radiusTop, radiusBot, height, radialSegments, heightSegments
        // coneGeometry = new THREE.CylinderGeometry( 0.3, 1.6, 3.0, 20, 4 );
        // cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
        // cone.position.set(4, 0, 0);
        // scene.add( cone);

    // sphere, located at light position
    sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
    sphere = new THREE.Mesh(sphereGeometry, yellowMaterial);
    sphere.position.set(-5,8,2);
    sphere.position.set(light.position.x, light.position.y, light.position.z);
    //scene.add(sphere);
}

/////////////////////////////////////////////////////////////////////////////////////
//  create customShader material
/////////////////////////////////////////////////////////////////////////////////////

var customShaderMaterial = new THREE.ShaderMaterial( {
//        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader: document.getElementById( 'customVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'customFragmentShader' ).textContent
} );

////////////////////////////////////////////////////////////////////////	
// initFileObjects():    read object data from OBJ files;  see onResourcesLoaded() for instances
////////////////////////////////////////////////////////////////////////	

function initFileObjects() {
        // list of OBJ files that we want to load, and their material
    models = {     
//	bunny:     {obj:"obj/bunny.obj", mtl: diffuseMaterial, mesh: null},
//	horse:     {obj:"obj/horse.obj", mtl: diffuseMaterial, mesh: null },
//	minicooper:{obj:"obj/minicooper.obj", mtl: diffuseMaterial, mesh: null },
//	trex:      { obj:"obj/trex.obj", mtl: normalShaderMaterial, mesh: null },
	teapot:    {obj:"obj/teapot.obj", mtl: customShaderMaterial, mesh: null	},
	armadillo: {obj:"obj/armadillo.obj", mtl: customShaderMaterial, mesh: null },
	dragon:    {obj:"obj/dragon.obj", mtl: customShaderMaterial, mesh: null }
    };

    var manager = new THREE.LoadingManager();
    manager.onLoad = function () {
	console.log("loaded all resources");
	RESOURCES_LOADED = true;
	onResourcesLoaded();
    }
    var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
	    var percentComplete = xhr.loaded / xhr.total * 100;
	    console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
    };
    var onError = function ( xhr ) {
    };

    // Load models;  asynchronous in JS, so wrap code in a fn and pass it the index
    for( var _key in models ){
	console.log('Key:', _key);
	(function(key){
	    var objLoader = new THREE.OBJLoader( manager );
	    objLoader.load( models[key].obj, function ( object ) {
		object.traverse( function ( child ) {
		    if ( child instanceof THREE.Mesh ) {
			child.material = models[key].mtl;
			child.material.shading = THREE.SmoothShading;
		    }	} );
		models[key].mesh = object;
//		scene.add( object );
	    }, onProgress, onError );
	})(_key);
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// onResourcesLoaded():  once all OBJ files are loaded, this gets called
//                       Object instancing is done here
/////////////////////////////////////////////////////////////////////////////////////

function onResourcesLoaded(){
	
 // Clone models into meshes;   [Michiel:  AFAIK this makes a "shallow" copy of the model,
 //                             i.e., creates references to the geometry, and not full copies ]
    meshes["armadillo1"] = models.armadillo.mesh.clone();
    meshes["armadillo2"] = models.armadillo.mesh.clone();
    meshes["dragon1"] = models.dragon.mesh.clone();
    meshes["teapot1"] = models.teapot.mesh.clone();
    
    // position the object instances and parent them to the scene, i.e., WCS
    
    meshes["armadillo1"].position.set(-6, 1.5, 2);
    meshes["armadillo1"].rotation.set(0,-Math.PI/2,0);
    meshes["armadillo1"].scale.set(1,1,1);
    scene.add(meshes["armadillo1"]);

    meshes["armadillo2"].position.set(-3, 1.5, 2);
    meshes["armadillo2"].rotation.set(0,-Math.PI/2,0);
    meshes["armadillo2"].scale.set(1,1,1);
    scene.add(meshes["armadillo2"]);

    meshes["dragon1"].position.set(-5, 0.2, 4);
    meshes["dragon1"].rotation.set(0, Math.PI, 0);
    meshes["dragon1"].scale.set(0.3,0.3,0.3);
    scene.add(meshes["dragon1"]);

    meshes["teapot1"].position.set(3, 0, 3);
    meshes["teapot1"].scale.set(0.5, 0.5, 0.5);
    scene.add(meshes["teapot1"]);

    meshesLoaded = true;
}

/////////////////////////////////////	
// otherObjects():  these are here as examples;  
// move to initObjects() as needed
/////////////////////////////////////	

function otherObjects() {
    // custom object
    var geom = new THREE.Geometry(); 
    var v0 = new THREE.Vector3(0,0,0);
    var v1 = new THREE.Vector3(3,0,0);
    var v2 = new THREE.Vector3(0,3,0);
    var v3 = new THREE.Vector3(3,3,0);
    geom.vertices.push(v0);
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
    geom.computeFaceNormals();
    customObject = new THREE.Mesh( geom, diffuseMaterial2 );
    customObject.position.set(0, 0, -2);
    scene.add(customObject);

    // mybox 
    myboxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    mybox = new THREE.Mesh( myboxGeometry, diffuseMaterial );
    scene.add( mybox );

    // box
    boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
    box = new THREE.Mesh( boxGeometry, diffuseMaterial );
    box.position.set(-4, 0, 0);
    scene.add( box );

    // multi-colored cube      [https://stemkoski.github.io/Three.js/HelloWorld.html] 
    var cubeMaterialArray = [];    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
      // Cube parameters: width (x), height (y), depth (z), 
      //        (optional) segments along x, segments along y, segments along z
    var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
    mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
    mcc.position.set(0,0,0);
    scene.add( mcc );	

    // cylinder
    // parameters:  radiusAtTop, radiusAtBottom, height, radialSegments, heightSegments
    cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
    cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
    cylinder.position.set(2, 0, 0);
    scene.add( cylinder );

    // cone:   parameters --  radiusTop, radiusBot, height, radialSegments, heightSegments
    coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
    cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
    cone.position.set(4, 0, 0);
    scene.add( cone);

    // torus:   parameters -- radius, diameter, radialSegments, torusSegments
    torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
    torus = new THREE.Mesh( torusGeometry, diffuseMaterial);

    torus.rotation.set(0,0,0);     // rotation about x,y,z axes
    torus.scale.set(1,2,3);
    torus.position.set(6, 0, 0);   // translation

    scene.add( torus );
}

