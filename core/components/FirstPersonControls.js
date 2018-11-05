var FirstPersonControls=function(){
    TONG.Component.call(this);
    this.icon="imgs/components/animation.png";
    this.title=GetLanguage('FirstPersonControls');
    this.sensitivity =new TONG.Value({value:0.005,alias:GetLanguage('sensitivity')});
    this.needsButtonPressed=new TONG.Value({value:true,alias:GetLanguage('needsButtonPressed')});
    this.movementEnabled=new TONG.Value({value:true,alias:GetLanguage('movementEnabled')});
    this.moveSpeed=new TONG.Value({value:0.05,alias:GetLanguage('moveSpeed')});
    this.moveOnPlane=new TONG.Value({value:false,alias:GetLanguage('moveOnPlane')});
    var moveKeys=[Keyboard.W, Keyboard.S, Keyboard.A, Keyboard.D];
    this.vector=null;
    this.mouse=null;
    this.keyboard=null;
    this.tempVector=null;

    this.Awake=function () {
        this.mouse=this.scene.mouse;
        this.keyboard=this.scene.keyboard;
        this.vector=new TONG.Vector2(0,0);
        this.tempVector = new TONG.Vector3();
        this.updateControls();
    }
    
    this.Update=function () {
        if(!this.needsButtonPressed.value || this.mouse.buttonPressed(Mouse.LEFT))
        {
            this.vector.y -= this.sensitivity.value * this.mouse.delta.y;
            this.vector.x -= this.sensitivity.value * this.mouse.delta.x;

            if(this.vector.y < -1.57)
            {
                this.vector.y = -1.57;
            }
            else if(this.vector.y > 1.57)
            {
                this.vector.y = 1.57;
            }

            this.updateControls();
        }

        if(this.movementEnabled.value)
        {
            if(this.keyboard.keyPressed(moveKeys[0]))
            {
                var direction = this.root.getWorldDirection(this.tempVector);
                if(this.moveOnPlane.value)
                {
                    direction.y = 0;
                }
                direction.normalize();
                direction.multiplyScalar(this.moveSpeed.value);
                this.root.position.sub(direction);
            }
            if(this.keyboard.keyPressed(moveKeys[1]))
            {
                var direction = this.root.getWorldDirection(this.tempVector);
                if(this.moveOnPlane.value)
                {
                    direction.y = 0;
                }
                direction.normalize();
                direction.multiplyScalar(this.moveSpeed.value);
                this.root.position.add(direction);
            }
            if(this.keyboard.keyPressed(moveKeys[2]))
            {
                var direction = new TONG.Vector3(Math.sin(this.vector.x - 1.57), 0, Math.cos(this.vector.x - 1.57));
                direction.normalize();
                direction.multiplyScalar(this.moveSpeed.value);
                this.root.position.sub(direction);
            }
            if(this.keyboard.keyPressed(moveKeys[3]))
            {
                var direction = new TONG.Vector3(Math.sin(this.vector.x + 1.57), 0, Math.cos(this.vector.x + 1.57));
                direction.normalize();
                direction.multiplyScalar(this.moveSpeed.value);
                this.root.position.sub(direction);
            }
        }
    }
    
    this.updateControls=function () {
        var cos = Math.cos(this.vector.y);
        var direction = new TONG.Vector3(Math.sin(this.vector.x) * cos, Math.sin(this.vector.y), Math.cos(this.vector.x) * cos);
        direction.add(this.root.position);

        var matrix = new TONG.Matrix4();
        matrix.lookAt(this.root.position, direction, FirstPersonControls.UP);
        this.root.quaternion.setFromRotationMatrix(matrix);
    }

    this.getDirection=function () {
        var direction = this.root.getWorldDirection(this.tempVector);
        direction.normalize();
        return direction;
    }
}
FirstPersonControls.UP = new TONG.Vector3(0, 1, 0);
FirstPersonControls.prototype=Object.create(TONG.Component.prototype);
FirstPersonControls.prototype.constructor=FirstPersonControls;
TONG.Components.registerComponent(FirstPersonControls);