## Components

#### Table

 * `fields` (array) - the column descriptors
 * `data` (array) - the data
 * `selectable` (boolean) - can the user select rows
 * `multiSelectable` (boolean) - can the user select multiple rows
 * `selected` (array) - an array of currently selected item ids
 * `showCheckboxes` (boolean) - display selectable checkboxes on each row
 * `height` (style)
 * `showHeader` (boolean) - whether to show the column titles
 * `onRowSelection(idArray)` - run when the current selection changes

Each field in the `fields` property has:

 * `name` - the name of field to use as the data property
 * `title` - use this as the column title (defaults to use `name`)
 * `style` - use this style object for the contents
 * `headerStyle` - use this style object for the header
 * `render(data, field)` - a custom function to render the cell contents
 * `preventRowSelection` - prevent a click selecting the row

#### Tree

 * `data` (object) - a flat map of id -> object
 * `children` (object) - a flat map of id -> [childids]
 * `rootids` (array) - the top level item ids
 * `open` (object) - a flat map of id -> true
 * `title` (string) - add a title above the tree
 * `styles` (object) - add extra styles
   * `selected` - background color
   * `header` - margins
 * `getIcon(item, theme)` - return the icon for one item
 * `selectItem(item)` - run when an item is clicked
 * `toggleItem(id, open)` - run when an item is toggled

#### FormToolbar

 * `title`
 * `icon`
 * `readOnly`
 * `cancel()`
 * `revert()`
 * `save()`

#### ActionToolbar

 * `title`
 * `icon`
 * `actionButtonTitle` - the title of the `actions` button
 * `actions` - return an array of actions for the actions dropdown
 * `buttons` - return an array of extra button descriptors

#### Form

 * `data`
 * `meta`
 * `schema`
 * `library`
 * `onUpdate(data, meta)`
 * `getContext()`

#### ToolbarWrapper

 * `toolbar`
 * `children`

#### TreeWrapper

 * `tree`
 * `children`

## Containers

#### Collection

A list type component/toolbar combo

 * `selector(state)` - return an object with:
   * `data` - array of item data
   * `selected` - array of item ids
   * `parent` - object (the parent of the data)
 * `tableClass` - use a custom Table component
 * `toolbarClass` - use a custom Toolbar component
 * `tableProps` - props to be passed to the `Table` component
 * `toolbarProps` - props to be passed to the `Toolbar` component
 * `getTableFields(parent, data)`
 * `onRowSelection(dispatch, idArray)`