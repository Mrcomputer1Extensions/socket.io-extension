/*
 * Socket.io Extension
 * License: MIT License
*/

(function(ext) {
	
	ext.success = false;
	ext.socket = null;
	ext.socket_load = function(){
		ext.socket.off("handled");
		ext.socket.on("handled", function(data){
			ext._triggers[data.name].data = data.data;
			ext._triggers[data.name].toggle = true;
		});
	};
	
	$.ajax({

        async:false,

        type:'GET',

        url:'http://localhost:4154/socket.io/socket.io.js',
		
        data:null,
        
        success: function(){
			ext.success = true;
			ext.socket = io("http://localhost:4154");
			ext.socket_load();
		},
		
		error: function(){ext.success = false;},

        dataType:'script'

    });
	
	ext._shutdown = function() {};
	
	ext._getStatus = function() {
		if(ext.success){
			return {status: 2, msg: 'Ready - 1.0.0 (Socket.io 1.4.5) - By: Mrcomputer1'};
		}else{
			return {status: 1, msg: 'Failed to get the socket.io JavaScript file! Reload the page or check that the backend server is working!'};
		}
	};
	
	ext._triggers = {
		
	};
	ext.create = function(name){
		extdata.blocks[2][3] = name;
		extdata.blocks[3][3] = name;
		extdata.blocks[4][4] = name;
		extdata.blocks[5][5] = name;
		extdata.menus.triggers[extdata.menus.triggers.length] = name;
		ext._triggers[name] = {toggle: false, data: {}};
		ScratchExtensions.unregister("Socket.io");
		ScratchExtensions.register("Socket.io", extdata, ext);
	};
	ext.on_trigger = function(name){
		if(ext._triggers[name].toggle == true){
			ext._triggers[name].toggle = false;
			return true;
		}
		return false;
	};
	ext.emit = function(name){
		ext.socket.emit("handle", {name: name, data: ext._triggers[name].data});
		ext._triggers[name].data = {};
	};
	ext.getdata = function(name, handle){
		return ext._triggers[handle].data[name];
	};
	ext.setdata = function(name, value, handle){
		ext._triggers[handle].data[name] = value;
	};
	
	var extdata = {
		blocks: [
			['_', 'Create %s', 'create', ''],
			['-'],
			['h', "On %m.triggers", 'on_trigger', ""],
			[' ', "Emit %m.triggers", "emit", ""],
			['r', "Get %s from %m.triggers", "getdata", "", ""],
			[' ', "Set %s to %s on %m.triggers", "setdata", "", "", ""],
		],
		menus: {
			triggers: [],
		},
		url: 'http://Mrcomputer1Extenions.github.io/socket.io-extension/'
	};
	
	ScratchExtensions.register('Socket.io', extdata, ext);
})({});
