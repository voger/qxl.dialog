/**
 * 
 * A widget with a progress bar and a log.
 * 
 */
qx.Class.define("dialog.Progress", {
  extend: dialog.Dialog,
  properties: {
    /**
     * 
     * The percentage of the progress, 0-100
     * 
     */
    progress: {
      check: function(value) {
        return qx.lang.Type.isNumber(value) && value >= 0 && value <= 100
      },
      init: 0,
      nullable: false,
      event: "changeProgress",
      apply: "_applyProgress"
    },
    /**
     * 
     * The content of the log
     * 
     */
    logContent: {
      check: "String",
      init: "",
      event: "changeLogContent"
    },
    /**
     * 
     * New text that should be written to the log
     * 
     */
    newLogText: {
      check: "String",
      nullable: false,
      event: "changeNewLogText",
      apply: "_applyNewLogText"
    },
    /**
     * 
     * Whether or not the progress bar is visible
     * (default: true)
     * 
     */
    showProgressBar: {
      check: "Boolean",
      nullable: false,
      init: true,
      event: "changeShowProgressBar"
    },
    /**
     * 
     * Whether or not the log is visible
     * (default: false)
     * 
     */
    showLog: {
      check: "Boolean",
      nullable: false,
      init: false,
      event: "changeShowLog"
    },
    /**
     * 
     * The text of the OK button. If null, hide the button.
     * (default: null)
     * 
     */
    okButtonText: {
      check: "String",
      nullable: true,
      init: null,
      event: "changeOkButtonText",
      apply: "_applyOkButtonText"
    },
    /**
     * 
     * Whether to hide the widget when the progress is at 100%
     * 
     */
    hideWhenCompleted: {
      check: "Boolean",
      nullable: false,
      init: true
    }
  },
  members: {
    /**
     * 
     * Will be moved into dialog.Dialog
     * 
     */
    _applyShow: function(value, old) {
      if (value === true) {
        this.show();
      } else if (value === false) {
        this.hide();
      }
    },
    _applyProgress: function(value, old) {
      if (value == 100) {
        if (this.isHideWhenCompleted()) {
          this.hide();
        }
      }
    },
    /**
     * 
     * Adds new text to the log
     * 
     */
    _applyNewLogText: function(value, old) {
      if (value) {
        var content = this.getLogContent();
        this.setLogContent(
          content ? content + "\n" + value : value
        );
      }
    },
    /**
     * 
     * Apply the OK Button text
     * 
     */
    _applyOkButtonText: function(value, old) {
      if (value === null) {
        this._okButton.setVisibility("excluded");
        return;
      }
      this._okButton.setLabel(value);
      this._okButton.show();
      this.setHideWhenCompleted(false);
    },
    _progressBar: null,
    _logView: null,
    /**
     * 
     * Create the content of the dialog.
     * Extending classes must implement this method.
     * 
     */
    _createWidgetContent: function() {
      //var container = new qx.ui.groupbox.GroupBox().set({
      //  contentPadding: [16, 16, 16, 16],
      //  width: 300
      //});
       var groupboxContainer = new qx.ui.container.Composite().set({width: 300});
      container.setLayout(new qx.ui.layout.VBox(5));
      this.add(container);
      var hbox = new qx.ui.container.Composite();
      hbox.set({
        layout: new qx.ui.layout.HBox(10),
        height: 30
      });
      container.add(hbox);
      this._progressBar = new qx.ui.indicator.ProgressBar();
      this._progressBar.set({
        maxHeight: 20,
        alignY: "middle"
      });
      this.bind("progress", this._progressBar, "value");
      hbox.add(this._progressBar, {
        flex: 1
      });
      var cancelButton = this._createCancelButton();
      cancelButton.set({
        label: null,
        height: 20,
        icon: "dialog/icon/273-checkmark.svg",
        alignY: "middle",
        visibility: "excluded"
      });
      cancelButton.getChildControl("icon").set({
        width: 16,
        height: 16,
        scale: true
      });
      hbox.add(cancelButton);
      this.bind("showProgressBar", hbox, "visibility", {
        converter: function(v) {
          return v ? "visible" : "excluded";
        }
      });
      this._message = new qx.ui.basic.Label();
      this._message.set({
        rich: true,
        textAlign: "center"
      });
      container.add(this._message);
      this._logView = new qx.ui.form.TextArea();
      this._logView.set({
        visibility: "excluded",
        height: 200
      });
      container.add(this._logView, {
        flex: 1
      });
      this.bind("showLog", this._logView, "visibility", {
        converter: function(v) {
          return v ? "visible" : "excluded";
        }
      });
      this.bind("logContent", this._logView, "value");
      this._logView.bind("value", this, "logContent");
      var okButton = this._createOkButton();
      okButton.set({
        visibility: "excluded",
        enabled: false,
        alignX: "center",
        icon: null
      });
      this._progressBar.addListener("complete", function() {
        okButton.setEnabled(true);
      }, this);
      container.add(okButton, {});
    }
  }
});