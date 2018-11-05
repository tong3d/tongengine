function CameraHelper( camera ) {

    var geometry = new TONG.BufferGeometry();
    var material = new TONG.LineBasicMaterial( { color: 0xffffff, vertexColors: TONG.FaceColors } );

    var vertices = [];
    var colors = [];

    var pointMap = {};

    // colors

    var colorFrustum = new TONG.Color( 0xdddddd );
    var colorCone = new TONG.Color( 0xdddddd );
    var colorUp = new TONG.Color( 0xdddddd );
    //var colorTarget = new TONG.Color( 0xffffff );
    //var colorCross = new TONG.Color( 0x333333 );

    // near

    addLine( 'n1', 'n2', colorFrustum );
    addLine( 'n2', 'n4', colorFrustum );
    addLine( 'n4', 'n3', colorFrustum );
    addLine( 'n3', 'n1', colorFrustum );

    // far

    addLine( 'f1', 'f2', colorFrustum );
    addLine( 'f2', 'f4', colorFrustum );
    addLine( 'f4', 'f3', colorFrustum );
    addLine( 'f3', 'f1', colorFrustum );

    // sides

    addLine( 'n1', 'f1', colorFrustum );
    addLine( 'n2', 'f2', colorFrustum );
    addLine( 'n3', 'f3', colorFrustum );
    addLine( 'n4', 'f4', colorFrustum );

    // cone

    addLine( 'p', 'n1', colorCone );
    addLine( 'p', 'n2', colorCone );
    addLine( 'p', 'n3', colorCone );
    addLine( 'p', 'n4', colorCone );

    // up

    /*addLine( 'u1', 'u2', colorUp );
    addLine( 'u2', 'u3', colorUp );
    addLine( 'u3', 'u1', colorUp );*/

    // target

    //addLine( 'c', 't', colorTarget );
    //addLine( 'p', 'c', colorCross );

    // cross

    //addLine( 'cn1', 'cn2', colorCross );
    //addLine( 'cn3', 'cn4', colorCross );

    //addLine( 'cf1', 'cf2', colorCross );
    //addLine( 'cf3', 'cf4', colorCross );

    function addLine( a, b, color ) {

        addPoint( a, color );
        addPoint( b, color );

    }

    function addPoint( id, color ) {

        vertices.push( 0, 0, 0 );
        colors.push( color.r, color.g, color.b );

        if ( pointMap[ id ] === undefined ) {

            pointMap[ id ] = [];

        }

        pointMap[ id ].push( ( vertices.length / 3 ) - 1 );

    }

    geometry.addAttribute( 'position', new TONG.Float32BufferAttribute( vertices, 3 ) );
    geometry.addAttribute( 'color', new TONG.Float32BufferAttribute( colors, 3 ) );

    TONG.LineSegments.call( this, geometry, material );

    this.camera = camera;
    if ( this.camera.updateProjectionMatrix ) this.camera.updateProjectionMatrix();

    this.matrix = camera.matrixWorld;
    this.matrixAutoUpdate = false;

    this.pointMap = pointMap;

    this.update();

}

CameraHelper.prototype = Object.create( TONG.LineSegments.prototype );
CameraHelper.prototype.constructor = CameraHelper;

CameraHelper.prototype.update = function () {

    var geometry, pointMap;

    var vector = new TONG.Vector3();
    var camera = new TONG.Camera();

    function setPoint( point, x, y, z ) {

        vector.set( x, y, z ).unproject( camera );

        var points = pointMap[ point ];

        if ( points !== undefined ) {

            var position = geometry.getAttribute( 'position' );

            for ( var i = 0, l = points.length; i < l; i ++ ) {

                position.setXYZ( points[ i ], vector.x, vector.y, vector.z );

            }

        }

    }

    return function update() {

        geometry = this.geometry;
        pointMap = this.pointMap;

        var w = 1, h = 1;

        // we need just camera projection matrix
        // world matrix must be identity

        camera.projectionMatrix.copy( this.camera.projectionMatrix );

        // center / target

        //setPoint( 'c', 0, 0, - 1 );
        //setPoint( 't', 0, 0, 1 );

        // near

        setPoint( 'n1', - w, - h, - 1 );
        setPoint( 'n2', w, - h, - 1 );
        setPoint( 'n3', - w, h, - 1 );
        setPoint( 'n4', w, h, - 1 );

        // far

        setPoint( 'f1', - w, - h, 1 );
        setPoint( 'f2', w, - h, 1 );
        setPoint( 'f3', - w, h, 1 );
        setPoint( 'f4', w, h, 1 );

        // up

        /*setPoint( 'u1', w * 0.7, h * 1.1, - 1 );
        setPoint( 'u2', - w * 0.7, h * 1.1, - 1 );
        setPoint( 'u3', 0, h * 2, - 1 );*/

        // cross

        /*setPoint( 'cf1', - w, 0, 1 );
        setPoint( 'cf2', w, 0, 1 );
        setPoint( 'cf3', 0, - h, 1 );
        setPoint( 'cf4', 0, h, 1 );

        setPoint( 'cn1', - w, 0, - 1 );
        setPoint( 'cn2', w, 0, - 1 );
        setPoint( 'cn3', 0, - h, - 1 );
        setPoint( 'cn4', 0, h, - 1 );*/

        geometry.getAttribute( 'position' ).needsUpdate = true;

    };

}();