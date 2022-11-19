const bcObs = new BroadcastChannel("channelObs");



bcObs.onmessage = (event) => {
        if (event.data.sender === "panel") {
                switch (event.data.id) {
                        case "getVersion":
                                var msg = {
                                        "id": "getVersion2",
                                        "sender": "obs",
                                        "data": window.obsstudio.pluginVersion
                                };
                                bcObs.postMessage(msg);
                        case "getControlLevel":
                                window.obsstudio.getControlLevel(function (level) {
                                        var msg = {
                                                "id": "getControlLevel2",
                                                "sender": "obs",
                                                "data": level
                                        };
                                        bcObs.postMessage(msg);
                                });
                        case "getScenes":
                                window.obsstudio.getScenes(function (scenes) {
                                        var msg = {
                                                "id": "getScenes2",
                                                "sender": "obs",
                                                "data": scenes
                                        };
                                        bcObs.postMessage(msg);
                                });
                        case "getCurrentScene":
                                window.obsstudio.getCurrentScene(function(scene) {
                                        var msg = {
                                                "id": "getCurrentScene2",
                                                "sender": "obs",
                                                "data": scene
                                        };
                                        bcObs.postMessage(msg);
                                });
                        case "changeScene":
                                window.obsstudio.getCurrentScene(function(scene) {
                                        if (scene.name !== event.data.data+"")
                                                window.obsstudio.setCurrentScene(event.data.data+"");
                                });
                        default:
                }
        }
};