

var ScriptComponent=function(editor){
    var signals=editor.signals;
    var container=new UI.Panel();
    container.setId("scriptPanel");
    container.setClass("scriptPanel");


    function update(tarObject,script){
        container.clear();
        var object = editor.selected;

        if ( object === null ) {

            return;

        }

        var scripts = editor.scripts[ object.uuid ];

        if ( scripts !== undefined ) {
            for ( var i = 0; i < scripts.length; i ++ ) {

                ( function ( object, script ) {
                    var scriptComponentContent=ScriptComponent.Content(editor);
                    scriptComponentContent.scriptLocate.dom.textContent=script.name;
                    scriptComponentContent.removeBtn.onClick(function(e){
                        //移除script组件之前需要在文件列表中删除相关的引用
                        var indexNum=$.inArray(""+object.uuid,script.node.content_info.content.ref);
                        if(indexNum!=-1){
                            script.node.content_info.content.ref.splice(indexNum,1);
                        }
                        editor.execute( new RemoveScriptCommand( editor.selected, script ) );
                    });
                    container.add(scriptComponentContent.scriptContent);
                    scriptComponentContent.scriptLocate.onDblClick(function(e){
                        signals.locateFile.dispatch(false,script);
                    });

                    scriptComponentContent.scriptLocate.onClick(function(e){
                        signals.locateFile.dispatch(true,script);
                    });

                    /*  var name = new UI.Input( script.name ).setWidth( '130px' ).setFontSize( '12px' );
                     name.onChange( function () {

                     editor.execute( new SetScriptValueCommand( editor.selected, script, 'name', this.getValue() ) );

                     } );
                     scriptsContainer.add( name );*/

                    /* var edit = new UI.Button( 'Edit' );
                     edit.setMarginLeft( '4px' );
                     edit.onClick( function () {

                     signals.editScript.dispatch( object, script );

                     } );
                     scriptsContainer.add( edit );*/

                    /* var remove = new UI.Button( 'Remove' );
                     remove.setMarginLeft( '4px' );
                     remove.onClick( function () {

                     if ( confirm( 'Are you sure?' ) ) {

                     editor.execute( new RemoveScriptCommand( editor.selected, script ) );

                     }

                     } );
                     scriptsContainer.add( remove );

                     scriptsContainer.add( new UI.Break() );*/

                } )( object, scripts[ i ] )

            }

        }

    }
    // signals

    signals.objectSelected.add( function ( object ) {

        if ( object !== null && editor.camera !== object ) {

            $("#ComponentContent").append(container.dom);
            update();

        } else {
            if ( $("#scriptPanel").length>0){
                $("#scriptPanel").remove();
            }

        }
    }

    );

    signals.scriptAdded.add( update );
    signals.scriptRemoved.add( update );
    signals.scriptChanged.add( update );

    return container;
}

ScriptComponent.Content=function(editor){
    var scriptContent=new UI.Panel();
    scriptContent.position="relative";
    scriptContent.setColor("#cecece");
    scriptContent.setMarginTop("50px");
    var header= Utils.Panel.AddHeader("Row","Script","ScriptBtn",null,"css/pic/script.png");
    var removeBtn=new UI.Button("");
    Utils.Panel.AddRowElement(header,removeBtn,"position:absolute;right:0px;width:33px;height:33px;background:url(css/pic/crash.png) #262626 center no-repeat");
    scriptContent.add(header);

    var scriptRow=new UI.Row();

    scriptContent.add(scriptRow);
    scriptRow.setPaddingLeft("10px");
    scriptRow.setRight("10px");
    scriptRow.setPaddingTop("10px");
    var scriptLabel=new UI.Text("script");
    scriptRow.add(scriptLabel);

    var scriptLocate=new UI.Button("Control.js");
    scriptLocate.setPosition("absolute");
    scriptLocate.setLeft("30%");
    scriptLocate.setBackgroundColor("#262626");
    scriptLocate.setWidth("80%");
    scriptRow.add(scriptLocate);
    return {"scriptContent":scriptContent,
        "scriptLocate":scriptLocate,
        "removeBtn":removeBtn
    };

}