/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                           Copyright 2016 Chuan Ji                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';

export default Ember.Component.extend(ResizeAware, {
  // To be injected
  store: null,

  classNames: ['pane-layout'],
  minPaneWidth: 200,

  editorPaneWidth: null,

  i18n: Ember.inject.service(),
  docManager: Ember.inject.service(),

  doc: Ember.computed.alias('docManager.doc'),

  getContainer() {
    return this.$();
  },
  getEditorPane() {
    return this.$('.editor-pane');
  },
  getResizeHandle() {
    return this.$('.resize-handle');
  },
  getMaxPaneWidth() {
    return this.getContainer().width() -
      this.get('minPaneWidth') -
      this.getResizeHandle().width();
  },
  updateEditorPaneSize() {
    var editorPane = this.getEditorPane();
    this.set('editorPaneWidth', editorPane.width());
    this.set('editorPaneHeight', editorPane.height());
  },

  initialized: false,
  didInsertElement() {
    this._super();
    Ember.run.next(this, function() {
      this.getEditorPane().resizable({
        handles: {
          e: this.getResizeHandle()
        },
        minWidth: this.get('minPaneWidth'),
        maxWidth: this.getMaxPaneWidth(),
        resize: this.updateEditorPaneSize.bind(this)
      });
      this.updateEditorPaneSize();
      this.initialized = true;
    });
  },
  debouncedDidResize() {
    if (!this.get('initialized')) {
      return;
    }
    var maxPaneWidth = this.getMaxPaneWidth();
    var editorPane = this.getEditorPane();
    editorPane.resizable('option', 'maxWidth', maxPaneWidth);
    if (editorPane.width() > maxPaneWidth) {
      editorPane.width(maxPaneWidth);
    }
    this.updateEditorPaneSize();
  },
});
