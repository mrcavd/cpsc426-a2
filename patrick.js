//    patrick.js

////////////////////////////////////////////////////////////////////////
// initpatrickMotions()
////////////////////////////////////////////////////////////////////////

function initPatrickMotions() {

      // keyframes for patrick:    name, dt, [x, y]
    patrickMotion.addKeyFrame(new Keyframe('keyA', 0.0, [0, -2]));
    patrickMotion.addKeyFrame(new Keyframe('keyB', 2.0, [5, 2]));
    patrickMotion.addKeyFrame(new Keyframe('keyA', 2.0, [0, -2]));
    patrickMotion.addKeyFrame(new Keyframe('keyB', 2.0, [-5, 2]));
    patrickMotion.addKeyFrame(new Keyframe('keyA', 2.0, [0, -2]));
}

/////////////////////////////////////	
// initpatrickObject()
/////////////////////////////////////	

function initPatrickObject() {
      // image from https://www.kisspng.com/png-patrick-star-spongebob-squarepants-sandy-cheeks-st-891862/
    var patrickTexture = new THREE.TextureLoader().load('images/patrick.png');  
    patrickTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    var patrickMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, 
						    map: patrickTexture, side: THREE.DoubleSide });
    var geom = new THREE.Geometry(); 

    var patrickCoords = [];
    var patrickCoords = [
//        0             1              2           3            4            5           6           7          8
	0.04, 0.41,	0.1,  0.41,    0.2, 0.41,  0.3, 0.41,   0.4, 0.41,   0.5, 0.41,  0.6, 0.41,  0.7, 0.41, 0.8, 0.41,
//        9             10             11          12           13           14          15          16         17
	0.04, 0.59,	0.1,  0.59,    0.2, 0.59,  0.3, 0.59,   0.4, 0.59,   0.5, 0.59,  0.6, 0.59,  0.7, 0.59, 0.8, 0.59,
//       18
	0.97, 0.50];
    var vertList = [];
    patrick_uvList = [];
    for (var n=0; n<patrickCoords.length; n+=2) {
	geom.vertices.push(new THREE.Vector3( patrickCoords[n], patrickCoords[n+1], 0));   // xyz coords
	patrick_uvList.push(new THREE.Vector2( patrickCoords[n], patrickCoords[n+1] ));    // texture coords
    }
    geom.faces.push( new THREE.Face3( 0, 1, 10 ) );
    geom.faces.push( new THREE.Face3( 0, 10, 9 ) );
    geom.faces.push( new THREE.Face3( 1, 2, 11 ) );
    geom.faces.push( new THREE.Face3( 1, 11, 10 ) );
    geom.faces.push( new THREE.Face3( 2, 3, 12 ) );
    geom.faces.push( new THREE.Face3( 2, 12, 11 ) );
    geom.faces.push( new THREE.Face3( 3, 4, 13 ) );
    geom.faces.push( new THREE.Face3( 3, 13, 12 ) );
    geom.faces.push( new THREE.Face3( 4, 5, 14 ) );
    geom.faces.push( new THREE.Face3( 4, 14, 13 ) );
    geom.faces.push( new THREE.Face3( 5, 6, 15 ) );
    geom.faces.push( new THREE.Face3( 5, 15, 14 ) );
    geom.faces.push( new THREE.Face3( 6, 7, 16 ) );
    geom.faces.push( new THREE.Face3( 6, 16, 15 ) );
    geom.faces.push( new THREE.Face3( 7, 8, 17 ) );
    geom.faces.push( new THREE.Face3( 7, 17, 16 ) );
    geom.faces.push( new THREE.Face3( 8, 18, 17 ) );
    geom.computeFaceNormals();
    geom.computeBoundingBox();
    var max = geom.boundingBox.max, min = geom.boundingBox.min;
    var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
    var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
    var faces = geom.faces;
    geom.faceVertexUvs[0] = [];
    for (var i = 0; i < faces.length ; i++) {
	var v1 = geom.vertices[faces[i].a], 
            v2 = geom.vertices[faces[i].b], 
            v3 = geom.vertices[faces[i].c];
	geom.faceVertexUvs[0].push([
	    new THREE.Vector2(v1.x, v1.y),
	    new THREE.Vector2(v2.x, v2.y),
	    new THREE.Vector2(v3.x, v3.y)
	]);
    }
    geom.uvsNeedUpdate = true;

    patrick = new THREE.Mesh( geom, patrickMaterial);
    patrick.position.set(-10,5,0);
    patrick.rotation.z = -Math.PI/2;
    patrick.scale.x = 5.0;
    patrick.scale.y = 5.0;
    patrick.scale.z = 5.0;
    patrick.castShadow = true;    patrick.receiveShadow = false;
    scene.add(patrick);

      // Bezier curve

      // Bezier control points
    bezCpGeometry = new THREE.SphereGeometry(0.015, 16, 16);    // control point sphere: rad, nseg, nseg
    bezCpSphereList = [];
    bezCpList = [];
    for (var n=0; n<4; n++) {
	var x=n/3, y=0.5, z=0;
	bezCpList.push(new THREE.Vector3(x,y,z));
          // create a control point sphere
	var bezCps = new THREE.Mesh(bezCpGeometry, blueMaterial);
	bezCps.position.set(x,y,z);
	patrick.add(bezCps);
	bezCpSphereList.push(bezCps);
    }

      // Bezier curve
    bezNpts = 10;
    lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 2 });
    lineGeometry = new THREE.BufferGeometry();
    linePositions = new Float32Array( bezNpts * 6 ); // 3 vertices per point    // attributes
    lineGeometry.addAttribute( 'position', new THREE.BufferAttribute( linePositions, 3 ) );
    lineObj = new THREE.Line( lineGeometry,  lineMaterial );
    patrick.add( lineObj );
    bezTvec = [];
    for (var n=0, i=0; n<bezNpts; n++) {      // set the vertex positions
	var t=n/(bezNpts-1);
	bezTvec.push(t);
	linePositions[ i++ ] = n/(bezNpts-1);
	linePositions[ i++ ] = 0.5;
	linePositions[ i++ ] = 0;
    }
    lineObj.geometry.setDrawRange( 0, bezNpts );   
}

///////////////////////////////////////////////////////////////////////////////////////
// updatepatrick(avars)
///////////////////////////////////////////////////////////////////////////////////////

function updatePatrick(avars) {
    patrick.position.set(-10+avars[0],5,0);

      // update a control point    using avars[0], avars[1]
      // NOTE:  control points live and move in the local frame of the patrick.  
      //        the patrick has unit size, and is horizontal at y=0.5, with the tip to the right

    var yNew = 0.5 + 0.1*avars[0];
    var xNew = 0.0 - 0.1*avars[1];
    bezCpList[0].x = xNew;           // change y of the first control point
    bezCpList[0].y = yNew;           // change y of the first control point
    bezCps = bezCpSphereList[0];     // update position of the corresponding sphere
    bezCps.position.set(xNew, yNew, 0);

    updatepatrick_details();    // update the Bezier curve and patrick geometry based on control points

}

function updatePatrick_details() {

    Mbez = new THREE.Matrix4;
    Mbez.set(-1, 3, -3, 1,
             3, -6, 3, 0,
             -3, 3, 0, 0,
	     1, 0, 0, 0);

    // compute the curve positions at the curve sample t values

    positions = lineObj.geometry.attributes.position.array;
    Gx = new THREE.Vector4(bezCpList[0].x, bezCpList[1].x, bezCpList[2].x, bezCpList[3].x);
    Gy = new THREE.Vector4(bezCpList[0].y, bezCpList[1].y, bezCpList[2].y, bezCpList[3].y);
    Gz = new THREE.Vector4(bezCpList[0].z, bezCpList[1].z, bezCpList[2].z, bezCpList[3].z);
    for (var n=0, i=0; n<bezNpts; n++) {      // set the vertex positions
	var t = bezTvec[n];
	var tmpVec;
	var T = new THREE.Vector4(t*t*t, t*t, t, 1);    // build T vector

	tmpVec = Gx.clone();         // x = T M Gx
	tmpVec.applyMatrix4(Mbez);
	var vx = T.dot(tmpVec);
	tmpVec = Gy.clone();         // y = T M Gy
	tmpVec.applyMatrix4(Mbez);
	var vy = T.dot(tmpVec);
	tmpVec = Gz.clone();         // z = T M Gz
	tmpVec.applyMatrix4(Mbez);
	var vz = T.dot(tmpVec);

	positions[ i++ ] = vx;
	positions[ i++ ] = vy;
	positions[ i++ ] = vz;
    }
    lineObj.geometry.attributes.position.needsUpdate = true; 

    // Compute new patrick vertices, based on their UV coordinates.
    // In local coordiantes, the Bezier curve and the patrick lie horizontally along y=0.5,
    // with the eraser at x=0 and the tip at x=1
    
    var vertices = patrick.geometry.vertices;
     var nVert = patrick_uvList.length;
    for (var n=0; n<nVert; n++) {
	var t = patrick_uvList[n].x;
	var yOffset = patrick_uvList[n].y - 0.5;
	var tmpVec;
	var T = new THREE.Vector4(t*t*t, t*t, t, 1);    // build T vector

	tmpVec = Gx.clone();         // x = T M Gx
	tmpVec.applyMatrix4(Mbez);
	var vx = T.dot(tmpVec);
	tmpVec = Gy.clone();         // y = T M Gy
	tmpVec.applyMatrix4(Mbez);
	var vy = T.dot(tmpVec);
	tmpVec = Gz.clone();         // z = T M Gz
	tmpVec.applyMatrix4(Mbez);
	var vz = T.dot(tmpVec);

	vertices[n].x = vx;
	vertices[n].y = vy + yOffset;
	vertices[n].z = vz ;
    }

    patrick.geometry.verticesNeedUpdate = true; 
}
