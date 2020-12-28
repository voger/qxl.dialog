(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      },
      "qx.ui.mobile.container.MScrollHandling": {
        "require": true
      },
      "qx.ui.mobile.form.MState": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.mobile.form.TextField": {},
      "qx.ui.mobile.form.NumberField": {},
      "qx.bom.AnimationFrame": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * Abstract class for all input fields.
   */
  qx.Class.define("qx.ui.mobile.form.Input", {
    extend: qx.ui.mobile.core.Widget,
    include: [qx.ui.form.MForm, qx.ui.form.MModelProperty, qx.ui.mobile.container.MScrollHandling, qx.ui.mobile.form.MState],
    implement: [qx.ui.form.IForm, qx.ui.form.IModel],
    type: "abstract",
    construct: function construct() {
      qx.ui.mobile.core.Widget.constructor.call(this);

      this._setAttribute("type", this._getType());

      this.addCssClass("gap");
      this.addListener("focus", this._onSelected, this);
    },
    members: {
      // overridden
      _getTagName: function _getTagName() {
        return "input";
      },

      /**
       * Returns the type of the input field. Override this method in the
       * specialized input class.
       */
      _getType: function _getType() {},

      /**
       * Handles the <code>click</code> and <code>focus</code> event on this input widget.
       * @param evt {qx.event.type.Event} <code>click</code> or <code>focus</code> event
       */
      _onSelected: function _onSelected(evt) {
        if (!(evt.getTarget() instanceof qx.ui.mobile.form.TextField) && !(evt.getTarget() instanceof qx.ui.mobile.form.NumberField)) {
          return;
        }

        var scrollContainer = this._getParentScrollContainer();

        if (scrollContainer === null) {
          return;
        }

        setTimeout(function () {
          scrollContainer.scrollToWidget(this.getLayoutParent(), 0); // Refresh caret position after scrolling.

          this._setStyle("position", "relative");

          qx.bom.AnimationFrame.request(function () {
            this._setStyle("position", null);
          }, this);
        }.bind(this), 300);
      }
    },
    destruct: function destruct() {
      this.removeListener("focus", this._onSelected, this);
    }
  });
  qx.ui.mobile.form.Input.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Input.js.map?dt=1609157738235