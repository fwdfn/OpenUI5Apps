sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
], function (jQuery, Controller, JSONModel) {
	 "use strict";
	return Controller.extend("sap.ui.demo.wt.controller.Sec", {
        onInit : function() {
          let page2 = this.getSplitAppObj().getPage(this.createId("master2"), true);
          page2.addEventDelegate({ onBeforeShow : this.onBeforeShowPage }, this);
          let page3 = this.getSplitAppObj().getPage(this.createId("master3"), true);
          page3.addEventDelegate({ onBeforeShow : this.onBeforeShowPage }, this);
          
  		  var oModel =new JSONModel('model/threshold.json');          
	      this.getView().setModel(oModel);
          
//          this.getView().setModel(new JSONModel({
//            "threshold":[
//                {"thresholdName":"1","person":[
//                    {"name":"a","age":12,"task":[{"taskName":"task1"},{"taskName":"task2"},{"taskName":"task3"}]},
//                    {"name":"b","age":13,"task":[{"taskName":"task4"},{"taskName":"task2"},{"taskName":"task3"}]},
//                    {"name":"c","age":14,"task":[{"taskName":"task7"},{"taskName":"task2"},{"taskName":"task3"}]}
//                ]},
//                {"thresholdName":"2","person":[
//                    {"name":"d","age":12,"task":[{"taskName":"task1"},{"taskName":"task2"},{"taskName":"task3"}]},
//                    {"name":"e","age":13,"task":[{"taskName":"task4"},{"taskName":"task2"},{"taskName":"task3"}]},
//                    {"name":"f","age":14,"task":[{"taskName":"task7"},{"taskName":"task2"},{"taskName":"task3"}]}
//                ]},
//                {"thresholdName":"3","person":[
//                    {"name":"g","age":12,"task":[{"taskName":"task1"},{"taskName":"task2"},{"taskName":"task3"}]},
//                    {"name":"h","age":13,"task":[{"taskName":"task4"},{"taskName":"task2"},{"taskName":"task3"}]},
//                    {"name":"i","age":14,"task":[{"taskName":"task7"},{"taskName":"task2"},{"taskName":"task3"}]}
//                ]}         
//          ]}));
		},
        onBeforeShowPage : function(oEvent) {
            let path = oEvent.data.path;
            let page = oEvent.to;
            page.bindElement(path);

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
            let path = oEvent.getSource().getBindingContext().getPath();
            this.getSplitAppObj().toMaster(this.createId("master2"), { "path" : path });
        },
        onPressGoToMaster3:function(oEvent) {     
            let path = oEvent.getSource().getBindingContext().getPath();
            this.getSplitAppObj().toMaster(this.createId("master3"), { "path" : path });
        },  
        onListItemPress : function(oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();              
            this.getSplitAppObj().toDetail(this.createId(sToPageId));           
        },
        onPressModeBtn : function(oEvent) {
            var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();
            this.getSplitAppObj().setMode(sSplitAppMode);
            MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
        }, 
        getSplitAppObj : function() {
            return this.byId("SplitAppDemo");
        }
    });
});
