var Geometry=function(){
    TONG.Component.call(this);
    this.title=GetLanguage("GeometryEditor");
    this.icon="";
    this.helpUrl="";
    this.helpIcon="";
    this.settingsIcon="";
    this.collapsed=true;
    var that=this;
    this.type=new TONG.Enum(["BoxBufferGeometry","CircleBufferGeometry","SphereBufferGeometry","CylinderBufferGeometry","PlaneBufferGeometry","TorusBufferGeometry","TorusKnotBufferGeometry","LatheBufferGeometry",
        "IcosahedronGeometry"],{alias:GetLanguage('type'),callback:function(value){
        if(that.selected && that.selected.geometry && that.selected.geometry.type==value){
            return;
        }
        //console.log(value);
        ModelSelect(value);
        //模型类型选择器事件触发
        function ModelSelect(selRes) {
            if (that.selected && (that.selected.geometry)){
                var objGeometry = null;
                switch (selRes) {
                    case "BoxBufferGeometry":
                        objGeometry = new TONG.BoxBufferGeometry(1, 1, 1);
                        break;
                    case "CircleBufferGeometry":
                        var radius = 1;
                        var segments = 32;
                        objGeometry = new TONG.CircleBufferGeometry(radius, segments);
                        break;
                    case "SphereBufferGeometry":
                        var radius = 1;
                        var widthSegments = 32;
                        var heightSegments = 16;
                        var phiStart = 0;
                        var phiLength = Math.PI * 2;
                        var thetaStart = 0;
                        var thetaLength = Math.PI;
                        objGeometry = new TONG.SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
                        break;
                    case "CylinderBufferGeometry":
                        var radiusTop = 1;
                        var radiusBottom = 1;
                        var height = 2;
                        var radiusSegments = 32;
                        var heightSegments = 1;
                        var openEnded = false;
                        objGeometry = new TONG.CylinderBufferGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded);
                        break;
                    case  "PlaneBufferGeometry":
                        objGeometry = new TONG.PlaneBufferGeometry(2, 2);
                        break;
                    case "TorusBufferGeometry":
                        var radius = 2;
                        var tube = 1;
                        var radialSegments = 32;
                        var tubularSegments = 12;
                        var arc = Math.PI * 2;
                        objGeometry = new TONG.TorusBufferGeometry(radius, tube, radialSegments, tubularSegments, arc);
                        break;
                    case "TorusKnotBufferGeometry":
                        var radius = 2;
                        var tube = 0.8;
                        var tubularSegments = 64;
                        var radialSegments = 12;
                        var p = 2;
                        var q = 3;
                        objGeometry = new TONG.TorusKnotBufferGeometry(radius, tube, tubularSegments, radialSegments, p, q);
                        break;
                    case "LatheBufferGeometry":
                        var points = [
                            new TONG.Vector2(0, 0),
                            new TONG.Vector2(4, 0),
                            new TONG.Vector2(3.5, 0.5),
                            new TONG.Vector2(1, 0.75),
                            new TONG.Vector2(0.8, 1),
                            new TONG.Vector2(0.8, 4),
                            new TONG.Vector2(1, 4.2),
                            new TONG.Vector2(1.4, 4.8),
                            new TONG.Vector2(2, 5),
                            new TONG.Vector2(2.5, 5.4),
                            new TONG.Vector2(3, 12)
                        ];
                        var segments = 20;
                        var phiStart = 0;
                        var phiLength = 2 * Math.PI;
                        objGeometry = new TONG.LatheBufferGeometry(points, segments, phiStart, phiLength);
                        break;
                    case "IcosahedronGeometry":
                        var radius = 1;
                        var detail = 2;
                        objGeometry = new TONG.IcosahedronGeometry(radius, detail);
                        break;
                }

                that.editor.execute(new SetGeometryCommand(that.selected,objGeometry));
            }
        }}});
    this.OnInspectorAwake=function () {
        this.target=this.selected.geometry;
        console.log(this.target instanceof TONG.BufferGeometry);
    }
    this.OnInspectorStart=function(){
        this.geometryChange();
    }
    this.geometryChange=function(){
    if (this.selected && this.selected.geometry){
        var geometry = this.selected.geometry;

        // parameters.setDisplay('');
        // parameters
        // parameters.clear();

        if (geometry.type === 'BufferGeometry' || geometry.type === 'Geometry') {

            new Sidebar.Geometry.Modifiers(this.editor, this.selected,this.inspector);

        } else if (Sidebar.Geometry[geometry.type] !== undefined) {

            new Sidebar.Geometry[geometry.type](this.editor, this.selected,this.inspector);

        }

    }
    }
}
Geometry.prototype=Object.create(TONG.Component.prototype);
Geometry.prototype.constructor=Geometry;