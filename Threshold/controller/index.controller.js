sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageToast',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, MessageToast, Fragment, Controller, Filter, JSONModel) {
	"use strict";
	var CController = Controller.extend("sap.ui.demo.wt.controller.Sec", {
		onInit: function(){
	    	let page2 = this.getSplitAppObj().getPage(this.createId("master2"), true);
            page2.addEventDelegate({ onBeforeShow : this.onBeforeShowPage }, this);
            let page3 = this.getSplitAppObj().getPage(this.createId("master3"), true);
            page3.addEventDelegate({ onBeforeShow : this.onBeforeShowPage }, this);	
			
		    var oModel =new JSONModel('model/threshold.json');          
		    this.getView().setModel(oModel);	
		    
		 	this.getSplitAppObj().setHomeIcon({
				'phone':'phone-icon.png',
				'tablet':'tablet-icon.png',
				'icon':'desktop.ico'
			});			
			
			
//			this.getView().byId("master2").addEventDelegate({
//				   onBeforeShow: function(oEvent) {
//					   let path=oEvent.data.items;
//					   let page=oEvent.to;		
//					   alert(path);
//					   alert(page);
//			     	   //page.bindElement(path);					     
//				   }
//			});		
		},
		onOrientationChange: function(oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {duration: 5000});
		},

		onPressNavToDetail : function(oEvent) {
			
			this.getSplitAppObj().to(this.createId("detailDetail"));
		},
		
		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},
		
		onPressMasterBack : function() {			
			this.getSplitAppObj().backMaster();		
		},
		
		onPressGoToMaster : function(oEvent) {	
			//oEvent.getSource().getModel());                获取当前所用的model
		    //oEvent.getSource().getBindingContext().sPath   获取当前的路径			
            //oEvent.getSource().getProperty("title"));      获取属性title的值		
			
            //alert(oEvent.getSource().data);
						
			//alert(this.getView().byId("master2").getItems());
			//alert(this.getView().byId("master").getItems());
			//console.log(this.getView().byId("list1").getItems()[0].getProperty("title"));
			
			//this.getView().byId("list1").getProperty("items");			
			//alert(this.getView().byId("list1").getAggregation("items"));			
			//alert(this.getView().byId("list2").getItems());			
				
			//alert(oEvent.getSource().getBindingContext().getPath());
			//alert(oEvent.data.path);
			//oEvent.to.bindElement(path);
			var path= oEvent.getSource().getBindingContext().getPath();			
			//this.getSplitAppObj().toMaster(this.createId("master2"),"flip",{items:"{path:'"+path+"/person'}"});
			this.getSplitAppObj().toMaster(this.createId("master2"),"flip",{items:path+"/person/"});
		},
		onPressGoToMaster3:function(){			
			this.getSplitAppObj().toMaster(this.createId("master3"),"flip");
		},	
		onListItemPress : function(oEvent) {
//			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue(); 
//			alert(sToPageId);
//			this.getSplitAppObj().toDetail(this.createId(sToPageId));			
		},
		onPressModeBtn : function(oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();
			this.getSplitAppObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
		}, 
		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		}
 
	});
 
	return CController;
 
});