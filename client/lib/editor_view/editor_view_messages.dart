/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                         Copyright (C) 2014 Chuan Ji                         *
 *                             All Rights Reserved                             *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Controls the display of messages in an editor view.
*/

part of editor_view;

// Controller for the display of messages in an editor view.
class _EditorViewMessages {

  // Constructor.
  _EditorViewMessages(this._context);

  // Displays a message.
  void add(_EditorMessage message) {
    _log.fine(message.toString());
    assert(_EditorMessage.MESSAGE_TYPES.contains(message.type));

    final AnchorElement messageNode = new AnchorElement();
    messageNode.classes.addAll([
        'list-group-item', _MESSAGE_TYPE_TO_CLASS[message.type]]);
    final Element iconNode = new Element.span();
    iconNode.classes..addAll(['fa', 'space'])
                    ..addAll(_MESSAGE_TYPE_TO_ICON_CLASSES[message.type]);
    final Element textNode = new Element.span();
    textNode..appendText(message.text)
            ..classes.add('text');
    messageNode.children.addAll([iconNode, textNode]);
    if (message.lineNumber != null) {
      messageNode..href = '#'
                 ..classes.add('clickable')
                 ..onClick.listen((MouseEvent e) {
        e.preventDefault();
        e.stopPropagation();
        _context.aceEditor.callMethod(
            'gotoLine', [message.lineNumber, 0, true]);
        _context.aceEditor.callMethod('focus');
      });
    }
    _context.messagesNode.children.add(messageNode);

    _resize();
  }

  // Clears any currently displayed messages.
  void clear() {
    _context.messagesNode.children.clear();
    _resize();
  }

  // Resizes the output node to fit currently displayed messages.
  void _resize() {
    final num messagesHeight = _context.messagesNode.clientHeight;
    _context.outputContainerNode.style.paddingBottom = '${messagesHeight}px';
  }

  // Maps message types to Bootstrap list group item classes.
  static final Map<String, String> _MESSAGE_TYPE_TO_CLASS = {
      _EditorMessage.SUCCESS: 'list-group-item-success',
      _EditorMessage.PROGRESS: 'list-group-item-info',
      _EditorMessage.WARNING: 'list-group-item-warning',
      _EditorMessage.ERROR: 'list-group-item-danger',
  };
  // Maps message types to FontAwesome icon names.
  static final Map<String, List<String>> _MESSAGE_TYPE_TO_ICON_CLASSES = {
      _EditorMessage.SUCCESS: ['fa-check'],
      _EditorMessage.PROGRESS: ['fa-refresh', 'fa-spin'],
      _EditorMessage.WARNING: ['fa-exclamation-triangle'],
      _EditorMessage.ERROR: ['fa-exclamation-circle'],
  };

  // Logger.
  final Logger _log = new Logger('EditorViewMessages');

  // Editor context.
  _EditorViewContext _context;
}