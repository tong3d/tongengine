//write by XiangkuiZheng
function parallelTraverse( a, b, callback ) {

    callback( a, b );

    for ( var i = 0; i < a.children.length; i ++ ) {

        parallelTraverse( a.children[ i ], b.children[ i ], callback );

    }

}

TONG.AnimationUtils.clone=function(source){
    var sourceLookup = new Map();
    var cloneLookup = new Map();

    var clone = source.clone();

    parallelTraverse( source, clone, function ( sourceNode, clonedNode ) {

        sourceLookup.set( clonedNode, sourceNode );
        cloneLookup.set( sourceNode, clonedNode );

    } );

    clone.traverse( function ( node ) {

        if ( ! node.isSkinnedMesh ) return;

        var clonedMesh = node;
        var sourceMesh = sourceLookup.get( node );
        var sourceBones = sourceMesh.skeleton.bones;

        clonedMesh.skeleton = sourceMesh.skeleton.clone();

        clonedMesh.skeleton.bones = sourceBones.map( function ( bone ) {

            return cloneLookup.get( bone );

        } );

        clonedMesh.bind( clonedMesh.skeleton, clonedMesh.bindMatrix );
        clonedMesh.addComponent(Animation);
    } );

    return clone;

}