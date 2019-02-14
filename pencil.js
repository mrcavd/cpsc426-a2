//    pencil.js

////////////////////////////////////////////////////////////////////////
// initPencilMotions()
////////////////////////////////////////////////////////////////////////

function initPencilMotions() {
    var a0 = 0;
    var a1 = Math.PI/6;
    var a2 = Math.PI/3;
    var a3 = Math.PI/2;

    var i0 = Math.sin(a0)*0.42;
    var j0 = Math.cos(a0)*0.42;

    var i1 = Math.sin(a1)*0.47;
    var j1 = Math.cos(a1)*0.47;

    var i2 = Math.sin(a2)*0.47;
    var j2 = Math.cos(a2)*0.47;

    var i3 = Math.sin(a3)*0.42;
    var j3 = Math.cos(a3)*0.42;
      // keyframes for pencil:    name, dt, [bz0x, bz0y, bz0z, bz1x, bz1y, bz1z, bz2x, bz2y, bz2z, bz3x, bz3y, bz3z]
    pencilMotion.addKeyFrame(new Keyframe('keyA', 0.0, [0.5-i0,  0,  0.4+j0,
                                                                        0.5-i1,  0,  0.4+j1,
                                                                        0.5-i2, 0, 0.4+j2,
                                                                        0.5-i3, 0, 0.4+j3]));
    pencilMotion.addKeyFrame(new Keyframe('keyB', 1.0,
        [0.5-i0,  0,  0.4+j0,
        0.5-i1,  0,  0.4+j1,
        0.5-i2, 0, 0.4+j2,
        0.5-i3, 0, 0.4+j3]));
    // pencilMotion.addKeyFrame(new Keyframe('keyB', 1.0, [0.1,  0,  0.0,
    //                                                                     0.3,  0,  -0.2,
    //                                                                     0.5,  0, -0.2,
    //                                                                     0.7, 0, -0.1]));
    // pencilMotion.addKeyFrame(new Keyframe('keyC', 1.5, [0.2,  0,  -0.1,
    //                                                                     0.4,  0,  -0.2,
    //                                                                     0.7, 0, -0.2,
    //                                                                     0.8, 0, -0.1]));
    // pencilMotion.addKeyFrame(new Keyframe('keyD', 2.0,
    //     [0.2,  0,  -0.1,
    //     0.4,  0,  -0.2,
    //     0.7, 0, -0.2,
    //     0.8, 0, -0.1]));

    // pencilMotion.addKeyFrame(new Keyframe('keyA', 2.0, [-2, 9,  0.5,
    //                                                                     -3, -5, 1,
    //                                                                     -6, -3, 2]));
    // pencilMotion.addKeyFrame(new Keyframe('keyB', 2.0, [4,  6,  0.5,
    //                                                                     3,  5, 1,
    //                                                                     -9, 0, 1]));
    // pencilMotion.addKeyFrame(new Keyframe('keyA', 2.0, [2,  2,  0.5,
    //                                                                     -3, -5, 1,
    //                                                                     -6, -3, 2]));

}

/////////////////////////////////////	
// initPencilObject()
/////////////////////////////////////	

function initPencilObject() {
      // image from https://pixabay.com/p-3374506/?no_redirect 
    var pencilTexture = new THREE.TextureLoader().load('images/pencil.png');  
    pencilTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    var pencilMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, 
						    map: pencilTexture, side: THREE.DoubleSide });
    var geom = new THREE.Geometry(); 

    var pencilCoords = [];
    var pencilCoords = [
//        0             1              2           3            4            5           6           7          8
	0.04, 0.41,	0.1,  0.41,    0.2, 0.41,  0.3, 0.41,   0.4, 0.41,   0.5, 0.41,  0.6, 0.41,  0.7, 0.41, 0.8, 0.41,
//        9             10             11          12           13           14          15          16         17
	0.04, 0.59,	0.1,  0.59,    0.2, 0.59,  0.3, 0.59,   0.4, 0.59,   0.5, 0.59,  0.6, 0.59,  0.7, 0.59, 0.8, 0.59,
//       18
	0.97, 0.50];
    var vertList = [];
    pencil_uvList = [];
    for (var n=0; n<pencilCoords.length; n+=2) {
	geom.vertices.push(new THREE.Vector3( pencilCoords[n], pencilCoords[n+1], 0));   // xyz coords
	pencil_uvList.push(new THREE.Vector2( pencilCoords[n], pencilCoords[n+1] ));    // texture coords
    }
    // composing a pencil 
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

    // change pencil position and scale pencil here
    var axesHelper = new THREE.AxesHelper( 2 );
    pencil = new THREE.Mesh( geom, pencilMaterial);
    pencil.add(axesHelper);
    pencil.position.set(-2.5,0.5,0);
    pencil.scale.x = 5.0;
    pencil.scale.y = 5.0;
    pencil.scale.z = 5.0;
    //pencil.rotation.x = -Math.PI/2;
    //pencil.rotation.y = -Math.PI/2;

    pencil.castShadow = true;    pencil.receiveShadow = false;
    scene.add(pencil);

      // Bezier curve

      // Bezier control points
      // blue points            
    bezCpGeometry = new THREE.SphereGeometry(0.015, 16, 16);    // control point sphere: rad, nseg, nseg
    bezCpSphereList = [];
    bezCpList = [];
    for (var n=0; n<4; n++) {
	var x=n/3, y=0.5, z=0;
	bezCpList.push(new THREE.Vector3(x,y,z));
          // create a control point sphere
	var bezCps = new THREE.Mesh(bezCpGeometry, blueMaterial);
	bezCps.position.set(x,y,z);
	pencil.add(bezCps);
	bezCpSphereList.push(bezCps);
    }

      // Bezier curve
      // blue curve in the pencil 
    bezNpts = 10;
    lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 2 });
    lineGeometry = new THREE.BufferGeometry();
    linePositions = new Float32Array( bezNpts * 6 ); // 3 vertices per point    // attributes
    lineGeometry.addAttribute( 'position', new THREE.BufferAttribute( linePositions, 3 ) );
    lineObj = new THREE.Line( lineGeometry,  lineMaterial );
    pencil.add( lineObj );
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
// updatePencil(avars)
///////////////////////////////////////////////////////////////////////////////////////

function updatePencil(avars) {
    var deg2rad = Math.PI/180;
    //var theta0 = avars[6]*deg2rad;
    //pencil.position.set(avars[3], avars[4], avars[5]);

      // update a control point    using avars[0], avars[1]
      // NOTE:  control points live and move in the local frame of the pencil.  
      //        the pencil has unit size, and is horizontal at y=0.5, with the tip to the right


    var y0 = avars[1];
    var x0 = avars[0];
    var z0 = avars[2];

    var x1 = avars[3];
    var y1 = avars[4];
    var z1 = avars[5];

    var x2 = avars[6];
    var y2 = avars[7];
    var z2 = avars[8];

    var x3 = avars[9];
    var y3 = avars[10];
    var z3 = avars[11];

    bezCpList[0].x = x0;           // change x of the first control point
    bezCpList[0].y = y0;           // change y of the first control point
    bezCpList[0].z = z0;

    bezCpList[1].x = x1;
    bezCpList[1].y = y1;
    bezCpList[1].z = z1;

    bezCpList[2].x = x2;
    bezCpList[2].y = y2;
    bezCpList[2].z = z2;

    bezCpList[3].x = x3;
    bezCpList[3].y = y3;
    bezCpList[3].z = z3;
    // bezCpList[3].z = zNew;
    bezCps0 = bezCpSphereList[0];     // update position of the corresponding sphere
    bezCps1 = bezCpSphereList[1];
    bezCps2 = bezCpSphereList[2];
    bezCps3 = bezCpSphereList[3];
    bezCps0.position.set(x0, y0, z0);
    bezCps1.position.set(x1, y1, z1);
    bezCps2.position.set(x2, y2, z2);
    bezCps3.position.set(x3, y3, z3);
    //pencil.rotation.x = theta0;
    //bezCps1.position.set(bezCpList[1].x, bezCpList[1].y, bezCpList[1].z);

    

    updatePencil_details();    // update the Bezier curve and pencil geometry based on control points

}

function updatePencil_details() {

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

    // Compute new pencil vertices, based on their UV coordinates.
    // In local coordiantes, the Bezier curve and the pencil lie horizontally along y=0.5,
    // with the eraser at x=0 and the tip at x=1
    
    var vertices = pencil.geometry.vertices;
     var nVert = pencil_uvList.length;
    for (var n=0; n<nVert; n++) {
	var t = pencil_uvList[n].x;
	var yOffset = pencil_uvList[n].y - 0.5;
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

    pencil.geometry.verticesNeedUpdate = true; 
}
